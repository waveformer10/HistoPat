import { EntityTypeWithoutSlide } from "components/Form/Form.types";
import { http } from "service/requests/http";

const getRequestEnum: Record<EntityTypeWithoutSlide, ({ }: any) => Promise<any[]>> = {
    SUBTOPIC: http.slide.findSlidesBySubTopicId,
    TOPIC: http.subTopic.findSubTopicsByTopicId,
    MODULE: http.topic.findTopicsByModuleId
}

export async function selectFindRequest(entityType: EntityTypeWithoutSlide, parentEntityId: number) {
    const getFunction = getRequestEnum[entityType]
    return await getFunction(parentEntityId)
}