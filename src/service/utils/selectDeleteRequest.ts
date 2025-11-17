import { EntityType } from "components/Form/Form.types";
import { http } from "service/requests/http";

type UserRoleType = "USER" | "ROLE";

const deleteRequestEnum: Record<EntityType, ({}: any) => any> = {
  MODULE: http.module.deleteModule,
  SLIDE: http.slide.deleteSlide,
  SUBTOPIC: http.subTopic.deleteSubTopic,
  TOPIC: http.topic.deleteTopic
};

const deleteUserRoleRequestEnum: Record<UserRoleType, ({}: any) => any> = {
  USER: http.user.deleteUser,
  ROLE: http.role.deleteRole
};

export async function selectDeleteRequest(type: EntityType, id: number) {
  const deleteFunction = deleteRequestEnum[type];

  return await deleteFunction(id);
}
