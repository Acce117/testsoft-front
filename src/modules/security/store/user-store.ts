import { siteStore } from "@/common/site/siteStore";
import { defineStore } from "pinia";

export interface UserInterface {
  user_id: "";
  ci: "";
  name: "";
  username: "";
  sex: "";
  assignments: [];
  assignedTests: [];
}

export const userStore = defineStore("user", {
  state: (): UserInterface => {
    const user = siteStore().getUserInLocal();
    let state: UserInterface;
    console.log(user);
    user
      ? (state = user)
      : (state = {
          user_id: "",
          ci: "",
          name: "",
          username: "",
          sex: "",
          assignments: [],
          assignedTests: [],
        });

    return state;
  },
  getters:{
    getRoles:(state)=>state.assignments.map(a=>a.role.name)
  }
});
