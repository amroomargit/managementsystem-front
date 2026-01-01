import { CourseDTO } from "./course-dto"
import { StudentDTO } from "./student-dto"

export interface CertificateDTO{
  id:number,
  grade:number,
  certificateType:string
  student:StudentDTO
  course:CourseDTO
}
