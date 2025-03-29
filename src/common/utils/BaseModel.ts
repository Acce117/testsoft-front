import { object, Schema } from "yup";
import "reflect-metadata";
import { sendRequest } from "./sendRequest";
import type ColumnProps from "@/components/table/ColumnProps";

export class BaseModel {
  static readonly url: string = "base";
  static readonly columns: Array<ColumnProps> | null = null;
  static readonly schema: Schema = object();

  constructor(data?: object) {
    if (data) this.setData(data);
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

  public getFieldAsID() {
    const properties = Object.getOwnPropertyNames(this);
    for (const property of properties) {
      if (Reflect.getMetadata("fieldAsID", this, property)) {
        return property;
      }
    }
    throw new Error("Not Found");
  }

  public getFieldAsActive() {
    const properties = Object.getOwnPropertyNames(this);
    for (const property of properties) {
      if (Reflect.getMetadata("fieldAsActive", this, property)) {
        return property;
      }
    }
    return ''
  }
  public getSavableData() {
    const submitData = { ...this };
    Object.keys(submitData).forEach((key) => {
      if (Reflect.getMetadata("notSavableField", this, key)) {
        delete submitData[key];
      }
    });
    return submitData;
  }

  public getColumns() {
    return (this.constructor as typeof BaseModel).columns;
  }
  public getSchema() {
    return (this.constructor as typeof BaseModel).schema;
  }

  public getActive() {
    return this[this.getFieldAsActive()];
  }

  public getUpdateSchema() {
    return this.getSchema();
  }

  public async getAll(params: object = {}) {
    console.log(params)
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}`,
      body: params,
    });
  }
  public static async getAll(params: object = {}) {
    return await sendRequest({
      url: `${import.meta.env.VITE_API_PATH}/${this.url}`,
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
      body: data ? data : this.getSavableData(),
    });
  }
  async update(data?: object) {
    return await sendRequest({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_PATH}/${this.getURL()}/${this.getID()}`,
      body: data ? data : this.getSavableData(),
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
