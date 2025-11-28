import { AllEntityFindTypes } from 'components/ContentTreeItem/ContentTreeItem.types'
import { EntityType, OperationType } from 'components/Form/Form.types'
import { IUserFind } from 'service/@types/user';
import { create } from 'zustand'

export type SelectedEntityType = AllEntityFindTypes & { parentId?: number, parentEntityType?: EntityType };
export type EntityFormType = { entityType: EntityType, operation: OperationType }

type StateType = {
    selectedEntity: SelectedEntityType,
    entityForm: EntityFormType,
    path: string,
    idParentEntityToSave?: number,
    closeParentOf?: number,
    reloadModules: boolean,
    loggedUser: IUserFind,
}

type ActionType = {
    setSelectedEntity: (entity: StateType["selectedEntity"]) => void,
    setEntityForm: (entityForm: StateType["entityForm"]) => void,
    setPath: (path: StateType["path"]) => void,
    setIdParentEntityToSave: (id: StateType["idParentEntityToSave"]) => void;
    setcloseParentOf: (id: StateType["closeParentOf"]) => void;
    setReloadModules: (reaload: StateType["reloadModules"]) => void;
    setLoggedUser: (user: StateType["loggedUser"]) => void;
}

export const appState = create<StateType & ActionType>((set) => ({
    selectedEntity: {} as SelectedEntityType,
    setSelectedEntity: (entity) => set(() => ({ selectedEntity: entity })),
    entityForm: { entityType: "MODULE", operation: "EDITAR" } as EntityFormType,
    setEntityForm: (entityForm) => set(() => ({ entityForm })),
    path: "",
    setPath: (path) => set(() => ({ path })),
    setIdParentEntityToSave: (id) => set(() => ({ idParentEntityToSave: id })),
    setcloseParentOf: (id) => set({ closeParentOf: id }),
    reloadModules: false,
    setReloadModules: (reaload) => set(() => ({ reloadModules: reaload })),
    loggedUser: {} as IUserFind,
    setLoggedUser: (user) => set(() => ({ loggedUser: user }))

}))