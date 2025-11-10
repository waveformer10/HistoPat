import { EntityType } from "components/Form/Form.types";
import { IModuleEdit } from "service/@types/module";
import { ISlideEdit } from "service/@types/slide";
import { ISubTopicEdit } from "service/@types/subtopic";
import { ITopicEdit } from "service/@types/topic";
import { http } from "service/requests/http";

const putRequestEnum: Record<EntityType, ({}: any) => any> = {
  MODULE: http.module.editModule,
  SLIDE: http.slide.editSlide,
  SUBTOPIC: http.subTopic.editSubTopic,
  TOPIC: http.topic.editTopic,
};

type AllEntityEditTypes = { type: EntityType } & IModuleEdit &
  ITopicEdit &
  ISubTopicEdit &
  ISlideEdit;

export async function selectEditRequest(data: AllEntityEditTypes) {
  const { type, ...rest } = data;

  const putFunction = putRequestEnum[type];

  return await putFunction(rest);
}
