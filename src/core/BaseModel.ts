import { sendRequest } from "./sendRequest";

export class BaseModel {
  constructor() {}
  public getURL() {
    return "";
  }

  public getID() {
    return "";
  }
  


  public getFieldAsID() {
    return "";
  }

  public async getAll(params:object={}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,body:params
    });
  }
  async getOne(params:object={}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,body:params
    });
  }
   async create(body:object) {
    console.log(body)
    return await sendRequest({method:'POST',
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`, body:body
    });
  }
   async update(body:object) {
    return await sendRequest({method:'PATCH',
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`, body:body
    });
  }
   async delete() {
    return await sendRequest({method:'DELETE',
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`
    });
  }
}
