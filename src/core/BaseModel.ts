import { object } from "yup";
import { sendRequest } from "./sendRequest";

export class BaseModel {
  constructor(data: object) {
    if (data) {
      this.setData(data);
    }
  }
  public getURL() {
    return "";
  }
  public getColumns() {
    return [{field:'', header:''}];
  }
  public setData(data: object) {
    for (const key in data) this[key] = data[key];
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
  public getActive() {
    return this[this.getFieldAsActive()];
  }

  public getSchema() {
    return object();
  }
  public getUpdateSchema() {
    return this.getSchema();
  }

  public getFieldAsID() {
    return "";
  }

  public getFieldAsActive() {
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
  async create(data?: object) {
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: data ? data : this,
    });
  }
  async update(data?: object) {
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: data ? data : this,
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
