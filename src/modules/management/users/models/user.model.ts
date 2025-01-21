import { useSendRequest } from "@/common/utils/fetch";
import useEvents from "@/common/utils/useEvents";
import { BaseModel } from "@/common/utils/BaseModel";
import { schema } from "../schemas/user.schema";
import { sendRequest } from "@/common/utils/sendRequest";

const url = "user";
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

  constructor(data: object = {}) {
    super(data);
    if (data) this.setData(data);
  }
  public setData(data: object) {
    super.setData(data);
  }

  public getURL(): string {
    return url;
  }

  public getColumns() {
    return columns;
  }
  public getSchema() {
    return schema;
  }

  public getFieldAsID(): string {
    return "user_id";
  }
  public getFieldAsActive(): string {
    return "enabled";
  }
  async create(data?: object) {
    const submitData = data ? data : this;
    const body = {
      ...submitData,
      enabled:1,
      assignments: [
        {
          group_id: submitData.group_id,
          user_id: submitData.user_id,
          item_id: submitData.item_id,
        },
      ],
    };
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: body,
    });
  }
  async update(data?: object) {
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: data ? data : this,
    });
  }
}
