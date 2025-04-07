import { userStore } from "@/modules/security/store/user-store";
import type { User } from "./user.model";

export const columns = [
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
    field: "groups.name_group",
    fieldGetter: (value: User) => value.groups[0].name_group,
    header: "user.group",
  },
  {
    field: "enabled",
    header: "global.enabled",
    isBoolean: true,
  },
  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,
    visibleViewFunction: (element: User) =>
      element.user_id != userStore().user_id && element.user_id != 40,
    visibleUpdateFunction: (element: User) =>
      element.user_id != userStore().user_id && element.user_id != 40,
    visibleDeleteFunction: (element: User) =>
      element.user_id != userStore().user_id && element.user_id != 40,
  },
];
