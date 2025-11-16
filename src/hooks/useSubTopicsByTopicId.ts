import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "service/@types/queryKeys";
import { ISubTopicFind } from "service/@types/subtopic";
import { http } from "service/requests/http";

export function useSubTopicsByTopicId(id?: number){
    return useQuery<ISubTopicFind[]>({
        queryKey: [queryKeys.SUBTOPICS_BY_TOPIC, id],
        queryFn: () => http.subTopic.findSubTopicsByTopicId(id!),
        enabled: !!id,
    })
} 