import { useSendRequest } from "@/common/utils/fetch";
import useEvents from "@/common/utils/useEvents";


export function getUsers(ci?:  string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/student`;
    

    return useSendRequest(true, url, {
      relations:['user', 'student_group']
    });
}
export function deleteUser(id:any, users:any) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/student/delete_parameters`;
    console.log(id)

    const request = useSendRequest()
    request.sendRequest(url,{attr:{
      "id_student":id
    }}, "DELETE",()=>{
        if (!request.error) {
            users.value = users.value.filter(
              (user:any) => user.id_student !== id
            );
            useEvents().dispatch('error',{
              severity: "info",
              summary: "global.info",
              detail: 'users.deleted-ok',
              i18n:true,
              life: 3000,
            });
          }else {
            useEvents().dispatch('error',{
              severity: "error",
              summary: "Error",
              detail: 'users.not-deleted-ok',
              i18n:true,
              life: 3000,
            });
          }
      })
}
export function addUser(userToAdd:any, users:any) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/create`;
  const request = useSendRequest()
  request.sendRequest(url,userToAdd, "POST",()=>{
      if (!request.error) {
          users.value.add(userToAdd)
          useEvents().dispatch('error',{
            severity: "info",
            summary: "global.info",
            detail: 'users.added-ok',
            i18n:true,
            life: 3000,
          });
        }else {
          useEvents().dispatch('error',{
            severity: "error",
            summary: "Error",
            detail: 'users.not-added-ok',
            i18n:true,
            life: 3000,
          });
        }
    })
}
export function updateUser(userCI:any, newData:any, cb:any ) {
  const url = `${import.meta.env.VITE_API_PATH}/gestion/student/update/${userCI}`;
  const request = useSendRequest()
  request.sendRequest(url,newData, "PUT",()=>{
      if (!request.error) {
          cb()
          useEvents().dispatch('error',{
            severity: "info",
            summary: "User Updated",
            detail: 'users.updated-ok',
            i18n:true,
            life: 3000,
          });
        }else {
          useEvents().dispatch('error',{
            severity: "error",
            summary: "Error",
            detail: 'users.not-updated-ok',
            i18n:true,
            life: 3000,
          });
        }
    })
}