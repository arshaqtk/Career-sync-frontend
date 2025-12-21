export type EducationroundNumber =
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
  standard:EducationroundNumber;
  startDate:Date;
  endDate?:Date;
  isCurrent?:boolean;
  location?:string;
  description?:string;
  gradeOrPercentage?:string;
}