export interface selectOption{
    id: number,
    name: string
  };

  /*The entire purpose of this file is so that we can avoid the issues occuring in enroll-in-course-popup.html,
  where, because we are either gonna load up CourseDTOs or TopicDTOs, even though they both have id and name,
  Angular believes that because they're two different DTOs/types, there is automatically nothing the same about
  them. So we have to create this so we can map the two and force it to work.*/
