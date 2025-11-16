import { AllEntityFindTypes } from 'components/ContentTreeItem/ContentTreeItem.types'
import { EntityType, OperationType } from 'components/Form/Form.types'
import { create } from 'zustand'

export type SelectedEntityType = AllEntityFindTypes & { parentId?: number, parentEntityType?: EntityType };
export type EntityFormType = { entityType: EntityType, operation: OperationType }

type StateType = {
    selectedEntity: SelectedEntityType,
    entityForm: EntityFormType,
    path: string,
    idParentEntityToSave?: number,
    closeParentOf?: number,
}

type ActionType = {
    setSelectedEntity: (entity: StateType["selectedEntity"]) => void,
    setEntityForm: (entityForm: StateType["entityForm"]) => void,
    setPath: (path: StateType["path"]) => void,
    setIdParentEntityToSave: (id: StateType["idParentEntityToSave"]) => void;
    setcloseParentOf: (id: StateType["closeParentOf"]) => void;
}

export const appState = create<StateType & ActionType>((set) => ({
    selectedEntity: {} as SelectedEntityType,
    setSelectedEntity: (entity) => set(() => ({ selectedEntity: entity })),
    entityForm: { entityType: "MODULE", operation: "EDITAR" } as EntityFormType,
    setEntityForm: (entityForm) => set(() => ({ entityForm })),
    path: "",
    setPath: (path) => set(() => ({ path })),
    setIdParentEntityToSave: (id) => set(() => ({ idParentEntityToSave: id })),
    setcloseParentOf: (id) => set({ closeParentOf: id })
}))