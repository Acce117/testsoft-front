import { sendRequest } from "./sendRequest";

export class BaseModel {
  constructor() {}
  public getURL() {
    return "";
  }
  public getColumns() {
    return null;
  }
  public setData(data:unknown) {
  }
  public clearData() {

  }

  public getID() {
    return this[this.getFieldAsID()];
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
   async create() {
    return await sendRequest({method:'POST',
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`, body:this
    });
  }
   async update() {
    return await sendRequest({method:'PATCH',
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`, body:this
    });
  }
   async delete() {
    return await sendRequest({method:'DELETE',
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`
    });
  }
}
