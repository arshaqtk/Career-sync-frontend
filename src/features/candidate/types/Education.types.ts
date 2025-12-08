export type EducationLevel =
  | "High School"
  | "Higher Secondary"
  | "Diploma"
  | "Undergraduate"
  | "Postgraduate"
  | "Doctorate"
  | "Other";


export  interface Education {
 _id?:string;
  school:string;
  standard:EducationLevel;
  startDate:Date;
  endDate?:Date;
  isCurrent?:boolean;
  location?:string;
  description?:string;
  gradeOrPercentage?:string;
}