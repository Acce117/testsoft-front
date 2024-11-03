import { useSendRequest } from "@/common/utils/fetch";
import useEvents from "@/common/utils/useEvents";
import { BaseModel } from "@/core/BaseModel";
import { schema } from "../schemas/user.schema";

const url = "user";
const columns = [
  {
    field: "name",
    header: "Nombre",
  },
  {
    field: "last_name",
    header: "Apellido",
  },
  {
    field: "username",
    header: "Nombre de Usuario",
  },
  {
    field: "email",
    header: "Email",
  },
  {
    field: "sex",
    header: "Sexo",
  },
  {
    field: "user_type",
    header: "Tipo de Usuario",
  },
];


export class User extends BaseModel {
  user_id;
  name;
  username;
  last_name;
  email;
  sex;
  user_type;

  constructor(data: any = null) {
    super();

    if (data) {
      this.user_id = data.user_id;
      this.name = data.name;
      this.username = data.username;
      this.last_name = data.last_name;
      this.email = data.email;
      this.sex = data.sex;
      this.user_type = data.user_type;
    }
  }

  public setData(data: any) {
    this.user_id = data.user_id;
    this.name = data.name;
    this.username = data.username;
    this.last_name = data.last_name;
    this.email = data.email;
    this.sex = data.sex;
    this.user_type = data.user_type;
  }

  public clearData() {
    this.user_id = undefined;
    this.name = undefined;
    this.username = undefined;
    this.last_name = undefined;
    this.email = undefined;
    this.sex = undefined;
    this.user_type = undefined;
  }

  public getURL(): string {
    return url;
  }
  public getID(): string {
    return this.user_id;
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

  
}

const validateRequest = (error: boolean, cbIfTrue: Function) => {
  if (!error) cbIfTrue();
  console.log(error);
  const options = !error
    ? {
        severity: "info",
        summary: "Info",
        detail: "global.completed",
      }
    : {
        severity: "error",
        summary: "Error",
        detail: "global.failed",
      };
  useEvents().dispatch("error", {
    severity: options.severity,
    summary: options.summary,
    detail: options.detail,
    i18n: true,
    life: 3000,
  });
};
export function getUsers(ci?: string) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student`;

  return useSendRequest(true, url, {
    relations: ["user", "student_group"],
  });
}
export function deleteUser(user: any) {
  const url = `${
    import.meta.env.VITE_API_PATH
  }/gestion/student/delete_parameters`;
  const request = useSendRequest();
  request.sendRequest(
    url,
    {
      attr: {
        id_student: user.id_student,
      },
    },
    "DELETE",
    () => {
      validateRequest(request.error.value, () => (user.deleted = 1));
    }
  );
}
export function addUser(userToAdd: any, users: any, cb: Function) {
  userToAdd.fk_CI = userToAdd.CI;
  userToAdd.sex = parseInt(userToAdd.CI.charAt(9)) % 2 == 0 ? "M" : "F";
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/create`;
  const request = useSendRequest();
  request.sendRequest(url, userToAdd, "POST", () => {
    validateRequest(request.error.value, () => {
      users.push({
        user: {
          CI: userToAdd.CI,
          name: userToAdd.name,
          username: userToAdd.username,
          last_name: userToAdd.last_name,
          email: userToAdd.email,
          sex: userToAdd.sex,
          user_type: userToAdd.user_type,
        },
        student_group: {
          id_student_group: userToAdd.fk_id_group,
          name_group: userToAdd.name_group,
        },
        fk_CI: userToAdd.CI,
        fk_id_group: userToAdd.fk_id_group,
        deleted: 0,
      });
      cb();
    });
  });
}
export function updateUser(userToModify: any, cb: any, cbForOldData: any) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/update/${
    userToModify.id_student
  }`;
  const request = useSendRequest();
  request.sendRequest(url, { student: userToModify.student }, "PATCH", () => {
    validateRequest(request.error.value, cb);
    if (request.error.value) cbForOldData();
  });
}
