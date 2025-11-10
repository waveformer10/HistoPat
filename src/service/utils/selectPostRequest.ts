import { EntityType } from "components/Form/Form.types";
import { saveModule } from "service/requests/module/saveModule";
import { http } from "service/requests/http";
import { IModuleSave } from "service/@types/module";
import { ISlideSave } from "service/@types/slide";
import { ISubTopicSave } from "service/@types/subtopic";
import { ITopicSave } from "service/@types/topic";

const postRequestEnum: Record<EntityType, ({}: any) => any> = {
  MODULE: http.module.saveModule,
  SLIDE: http.slide.saveSlide,
  SUBTOPIC: http.subTopic.saveSubTopic,
  TOPIC: http.topic.saveTopic,
};

type AllEntitySaveTypes = { type: EntityType } & IModuleSave &
  ITopicSave &
  ISubTopicSave &
  ISlideSave;

export async function selectPostRequest(data: AllEntitySaveTypes) {
  const { type, ...rest } = data;

  const postFunction = postRequestEnum[type];

  return await postFunction(rest);
}
