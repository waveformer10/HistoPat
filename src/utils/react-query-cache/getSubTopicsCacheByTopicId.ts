import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "service/@types/queryKeys";
import { ISubTopicFind } from "service/@types/subtopic";

function getSubTopicsCacheByTopicId(id: number) {
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData<ISubTopicFind[]>([queryKeys.SUBTOPICS_BY_TOPIC, id]);

  return cachedData;
}