import { deleteModule } from "./module/deleteModule";
import { editModule } from "./module/editModule";
import { saveModule } from "./module/saveModule";
import { deleteSlide } from "./slide/deleteSlide";
import { editSlide } from "./slide/editSlide";
import { saveSlide } from "./slide/saveSlide";
import { deleteSubTopic } from "./subtopic/deleteSubTopic";
import { editSubTopic } from "./subtopic/editSubTopic";
import { saveSubTopic } from "./subtopic/saveSubTopic";
import { deleteTopic } from "./topic/deleteTopic";
import { editTopic } from "./topic/editTopic";
import { saveTopic } from "./topic/saveTopic";

export const http = {
  module: {
    saveModule,
    editModule,
    deleteModule,
  },
  topic: {
    saveTopic,
    editTopic,
    deleteTopic,
  },
  subTopic: {
    saveSubTopic,
    editSubTopic,
    deleteSubTopic,
  },
  slide: {
    saveSlide,
    editSlide,
    deleteSlide,
  },
};
