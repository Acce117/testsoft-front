import { BaseModel } from "@/common/utils/BaseModel";
import { schema, updateSchema } from "../schemas/user.schema";
import { sendRequest } from "@/common/utils/sendRequest";

const columns = [
  {
    field: "CI",
    header: "user.ci",
  },
  {
    field: "name",
    header: "user.name",
  },
  {
    field: "last_name",
    header: "user.last_name",
  },
  {
    field: "username",
    header: "user.username",
  },
  {
    field: "email",
    header: "user.email",
  },
  {
    field: "sex",
    header: "user.sex",
  },
  // {
  //   field: "country.type_test_name",
  //   fieldGetter: (value: User) => value.country.name,
  //   header: "País",
  // },
  {
    field: "enabled",
    header: "global.enabled",
    isBoolean: true,
  },
];

export class User extends BaseModel {
  user_id;
  CI;
  name;
  username;
  password;
  last_name;
  email;
  sex;
  user_type;
  country_id;
  country;
  enabled;
  assignments: [];
  static readonly url: string = "user";
  static readonly field_as_id: string = "user_id";
  static readonly field_as_active: string = "enabled";

  public getColumns() {
    return columns;
  }
  public getSchema() {
    return schema;
  }
  public getUpdateSchema() {
    return updateSchema;
  }

  
  public getFieldAsActive(): string {
    return "enabled";
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
    console.log(data);
    const submitData = data ? data : this;
    const clone = { ...submitData };
    delete clone.item_id;
    delete clone.group_id;
    delete clone.assignment_id;

    await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: clone,
    });
    await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/auth_assignment/${submitData.assignment_id}`,
      body: {
        group_id: submitData.group_id,
        item_id: submitData.item_id,
        user_id: submitData.user_id,
      },
    });
  }
}
