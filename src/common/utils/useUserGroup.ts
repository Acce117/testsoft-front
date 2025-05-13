import { userStore } from "@/modules/security/store/user-store";

export function useUserGroup(){
    return userStore().assignments[0].group_id
}