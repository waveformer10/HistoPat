import { http } from "service/requests/http";

type UserRoleType = "USER" | "ROLE";

const getIdUserRoleRequestEnum: Record<UserRoleType, ({}: any) => any> = {
    USER: http.user.findUserById,
    ROLE: http.role.findRoleById
}

export async function selectFindByIdRequest(entityType: UserRoleType, parentEntityId: number) {
    const getFunction = getIdUserRoleRequestEnum[entityType]
    return await getFunction(parentEntityId)
}