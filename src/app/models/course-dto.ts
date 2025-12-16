import { TopicDTO } from "./topic-dto";
import { TeacherDTO } from "./teacher-dto";

export interface CourseDTO{
  id: number;
  name: string;
  starttime:string;
  endtime:string;
  teacher: TeacherDTO;
  topic: TopicDTO;
}
