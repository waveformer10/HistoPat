import { saveImage } from "./image/saveImage";
import { deleteModule } from "./module/deleteModule";
import { editModule } from "./module/editModule";
import { findModuleById } from "./module/findModuleById";
import { findModules } from "./module/findModules";
import { saveModule } from "./module/saveModule";
import { deleteSlide } from "./slide/deleteSlide";
import { editSlide } from "./slide/editSlide";
import { findSlideById } from "./slide/findSlideById";
import { findSlidesBySubTopicId } from "./slide/findSlidesBySubTopicId";
import { saveSlide } from "./slide/saveSlide";
import { deleteSubTopic } from "./subtopic/deleteSubTopic";
import { editSubTopic } from "./subtopic/editSubTopic";
import { findSubTopicById } from "./subtopic/findSubTopicById";
import { findSubTopicsByTopicId } from "./subtopic/findSubTopicsByTopicId";
import { saveSubTopic } from "./subtopic/saveSubTopic";
import { deleteTopic } from "./topic/deleteTopic";
import { editTopic } from "./topic/editTopic";
import { findTopicById } from "./topic/findTopicById";
import { findTopicsByModuleId } from "./topic/findTopicsByModuleId";
import { saveTopic } from "./topic/saveTopic";
import { deleteUser } from "./user/deleteUser";
import { editUser } from "./user/editUser";
import { saveUser } from "./user/saveUser";
import { findUsers } from "./user/findUsers";
import { findUserById } from "./user/findUserById";
import { deleteRole } from "./role/deleteRole";
import { editRole } from "./role/editRole";
import { saveRole } from "./role/saveRole";
import { findRoles } from "./role/findRoles";
import { findRoleById } from "./role/findRoleById";

export const http = {
  module: {
    saveModule,
    editModule,
    deleteModule,
    findModules,
    findModuleById
  },
  topic: {
    saveTopic,
    editTopic,
    deleteTopic,
    findTopicById,
    findTopicsByModuleId
  },
  subTopic: {
    saveSubTopic,
    editSubTopic,
    deleteSubTopic,
    findSubTopicById,
    findSubTopicsByTopicId
  },
  slide: {
    saveSlide,
    editSlide,
    deleteSlide,
    findSlideById,
    findSlidesBySubTopicId
  },
  image: {
    saveImage
  },
  user: {
    saveUser,
    editUser,
    deleteUser,
    findUsers,
    findUserById
  },
  role: {
    saveRole,
    editRole,
    deleteRole,
    findRoles,
    findRoleById
  }
};
