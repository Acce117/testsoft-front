import { object } from "yup";
import { sendRequest } from "./sendRequest";

export class BaseModel {
  static readonly url: string = "base";
  static readonly field_as_id: string = "base";

  constructor(data?: object) {
    if (data) this.setData(data);
  }

  public getColumns() {
    return [{ field: "", header: "" }];
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

  public getURL() {
    return (this.constructor as typeof BaseModel).url;
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
    return (this.constructor as typeof BaseModel).field_as_id;
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

  static async getOne(id: number | string, params: object = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.url}/${id}`,
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
