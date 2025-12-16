// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
// import type { CandidateData } from "@/types/profileUpdate.type";

// type education=Pick<CandidateData,"education">
// export default function EducationCard({ education }:education) {
//   if (!education?.length) return null;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Education</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {education.map((edu) => (
//           <div key={edu._id} className="border-b pb-3">
//             <h3 className="font-semibold">{edu.}</h3>
//             <p className="text-gray-600">{edu.institution}</p>
//             <p className="text-gray-500">
//               {edu.startYear} - {edu.endYear}
//             </p>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }
