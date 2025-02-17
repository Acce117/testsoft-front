import "reflect-metadata";
export function ID(target: any, propertyKey: string) {
  Reflect.defineMetadata("fieldAsID", true, target, propertyKey);
}
export function LogicErase(target: any, propertyKey: string) {
    Reflect.defineMetadata("fieldAsActive", true, target, propertyKey);
  }
export function NotSavable(target: any, propertyKey: string) {
    Reflect.defineMetadata("notSavableField", true, target, propertyKey);
}