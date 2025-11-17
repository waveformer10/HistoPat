import { EntityTypeWithoutSlide } from "components/Form/Form.types";
import { http } from "service/requests/http";

type UserRoleType = "USER" | "ROLE";

const getRequestEnum: Record<EntityTypeWithoutSlide, ({ }: any) => Promise<any[]>> = {
    SUBTOPIC: http.slide.findSlidesBySubTopicId,
    TOPIC: http.subTopic.findSubTopicsByTopicId,
    MODULE: http.topic.findTopicsByModuleId
}

const getUserRoleRequestEnum: Record<UserRoleType, ({}: any) => any> = {
    USER: http.user.findUsers,
    ROLE: http.role.findRoles
}

export async function selectFindRequest(entityType: EntityTypeWithoutSlide, parentEntityId: number) {
    const getFunction = getRequestEnum[entityType]
    return await getFunction(parentEntityId)
}