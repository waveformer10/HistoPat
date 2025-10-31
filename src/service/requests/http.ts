import { saveModule } from "./module/saveModule";
import { saveSlide } from "./slide/saveSlide";
import { saveSubTopic } from "./subtopic/saveSubTopic";
import { saveTopic } from "./topic/saveTopic";

export const http = {
  module: {
    saveModule,
  },
  topic: {
    saveTopic,
  },
  subTopic: {
    saveSubTopic,
  },
  slide: {
    saveSlide,
  },
};
