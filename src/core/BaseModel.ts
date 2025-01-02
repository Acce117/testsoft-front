import { sendRequest } from "./sendRequest";

export class BaseModel {
  constructor(data:object) {
    if (data) {
      this.setData(data,this)
    }
  }
  public getURL() {
    return "";
  }
  public getColumns() {
    return null;
  }
  public setData(data: object, self:object) {
    for (const key in data) self[key] = data[key];
  }
  public clearData() {
    for (const key in this) {
      if (this[key] instanceof Array) this[key] = [];
      else this[key] = undefined;
    }
  }

  public getID() {
    return this[this.getFieldAsID()];
  }

  public getFieldAsID() {
    return "";
  }

  public async getAll(params: object = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: params,
    });
  }
  async getOne(params: object = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: params,
    });
  }
  async create() {
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: this,
    });
  }
  async update() {
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: this,
    });
  }
  async delete(id?: number) {
    return await sendRequest({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${
        id ? id : this.getID()
      }`,
    });
  }
}
