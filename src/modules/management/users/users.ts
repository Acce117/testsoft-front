import { useSendRequest } from "@/common/utils/fetch";
import useEvents from "@/common/utils/useEvents";


export function getUsers(ci?:  string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/student`;
    

    return useSendRequest(true, url, {
      relations:['user', 'student_group']
    });
}
export function deleteUser(userToDelete:any, users:any) {
    const url = `${import.meta.env.VITE_API_PATH}/seguridad/user/delete/${userToDelete.CI}`;
    const request = useSendRequest()
    request.sendRequest(url,undefined, "DELETE",()=>{
        if (!request.error) {
            users.value = users.value.filter(
              (user:any) => user.CI !== userToDelete.CI
            );
            useEvents().dispatch('error',{
              severity: "info",
              summary: "User Deleted",
              detail: 'El usuario ha sido eliminado correctamente',
              life: 3000,
            });
          }else {
            useEvents().dispatch('error',{
              severity: "error",
              summary: "Error",
              detail: 'No se pudo eliminar el usuario',
              life: 3000,
            });
          }
      })
}