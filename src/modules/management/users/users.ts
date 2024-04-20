import { useSendRequest } from "@/common/utils/fetch";
import useEvents from "@/common/utils/useEvents";

const validateRequest = (error: boolean, cbIfTrue: Function) => {
  if (!error)
    cbIfTrue()
  console.log(error)
  const options = !error ? {
    severity: "info", summary: "global.info",
    detail: 'global.completed'
  } : {
    severity: "error", summary: "global.error",
    detail: 'global.failed'
  }
  useEvents().dispatch('error', {
    severity: options.severity,
    summary: options.summary,
    detail: options.detail,
    i18n: true,
    life: 3000,
  });
}
export function getUsers(ci?: string) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student`;


  return useSendRequest(true, url, {
    relations: ['user', 'student_group']
  });
}
export function deleteUser(user: any) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/delete_parameters`;
  const request = useSendRequest()
  request.sendRequest(url, {
    attr: {
      "id_student": user.id_student
    }
  }, "DELETE", () => {
    validateRequest(request.error.value, () => user.deleted = 1)
  })
}
export function addUser(userToAdd: any, users: any) {
  userToAdd.fk_CI = userToAdd.CI
  userToAdd.sex =   parseInt(userToAdd.CI.charAt(9))%2==0?'M':'F'
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/create`;
  const request = useSendRequest()
  console.log(users)
  request.sendRequest(url, userToAdd, "POST", () => {
    validateRequest(request.error.value, () => users.push({
      user: {
        CI: userToAdd.CI,
        name: userToAdd.name,
        username: userToAdd.username,
        last_name: userToAdd.last_name,
        email: userToAdd.email,
        sex: userToAdd.sex,
        user_type: userToAdd.user_type,
      },
      fk_CI: userToAdd.CI,
      fk_id_group: userToAdd.fk_id_group,
      deleted: 0,
    }))
  })
}
export function updateUser(userCI: any, newData: any, cb: any) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/update/${userCI}`;
  const request = useSendRequest()
  request.sendRequest(url, newData, "PATCH", () => {
    validateRequest(request.error.value, cb)
  })
}