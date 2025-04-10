import { BaseModel } from "@/common/utils/BaseModel";
import { schema, updateSchema } from "../schemas/user.schema";
import { sendRequest } from "@/common/utils/sendRequest";
import { ID, LogicErase } from "@/common/utils/Decorators";
import type { Country } from "../../country/models/country.model";
import { columns } from "./user.columns";


export class User extends BaseModel {
  @ID
  user_id: number | undefined;
  CI: string | undefined;
  name: string | undefined;
  username: string | undefined;
  password: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  sex: string | undefined;
  user_type;
  country_id: number | undefined;
  country: Country | undefined;
  @LogicErase
  enabled: boolean | number | undefined;
  assignments: [];
  static readonly url: string = "user";
  static readonly columns = columns;
  static readonly schema = schema;

  public getUpdateSchema() {
    return updateSchema;
  }

  async getUsersByGroup(params: object = {}, id_group: string) {
    console.log(id_group);
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/groups/users/${id_group}`,
      body: {
        relations: [
          {
            name: "country",
          },
          {
            name: "assignments",
          },
        ],
        ...params,
      },
    });
  }

  async create(data?: object) {
    const submitData = data ? data : this;

    const body = {
      ...submitData,
      enabled: 1,
      assignments: [
        {
          group_id: submitData.group_id,
          user_id: submitData.user_id,
          item_id: submitData.item_id,
        },
      ],
    };
    // if (submitData.item_id == 5) {
    //   body.my_groups = [
    //     {
    //       user_id: submitData.user_id,
    //       group_id: submitData.group_id,
    //     },
    //   ];
    // }
    delete body.item_id;
    delete body.group_id;
    delete body.enabled;
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: body,
    });
    // if(submitData.item_id==5){
    //   await sendRequest({
    //     method: "POST",
    //     url: `${import.meta.env.VITE_API_PATH}/group_owner}`,
    //     body: {
    //       user_id:submitData.user_id,
    //       group_id: submitData.group_id
    //     },
    //   });
    // }
  }

  async update(data?: object) {
    const submitData = data ? data : this;
    const clone = { ...submitData };
    delete clone.item_id;
    delete clone.groups;
    delete clone.deleted_at;
    delete clone.created_scenario;



    delete clone.group_id;
    delete clone.assignment_id;
    console.log(submitData)

    await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: clone,
    });
    await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/auth_assignment/${
        submitData.assignment_id
      }`,
      body: {
        group_id: submitData.group_id,
        item_id: submitData.item_id,
        user_id: submitData.user_id,
      },
    });
  }
}
