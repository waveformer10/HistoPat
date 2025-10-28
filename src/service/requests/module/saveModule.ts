import { IModuleSave } from "service/@types/module";

export async function saveModule(props: IModuleSave) {
  console.log("MODULE");
  Object.values(props).forEach((item) => console.log(item));
}
