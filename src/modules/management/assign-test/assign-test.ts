import { useSendRequest } from "@/common/utils/fetch";

export function getGroups(parent:any){
    const url = `${import.meta.env.VITE_API_PATH}/gestion/group`;
    return useSendRequest(true, url, {
        attr:{"father_group":parent},
        relations:['arraystudent_group']
      });
}