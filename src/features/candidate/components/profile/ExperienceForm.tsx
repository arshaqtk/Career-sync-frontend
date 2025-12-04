// import React from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/shadcn/input";
// import { Textarea } from "@/components/ui/shadcn/textarea";
// import { Button } from "@/components/ui/shadcn/button";
// import { Label } from "@/components/ui/shadcn/label";
// import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/shadcn/card";
// import { Separator } from "@/components/ui/shadcn/separator";
// import { Avatar } from "@/components/ui/shadcn/avatar";
// import { Plus, Trash } from "lucide-react";

// import { experienceSchema } from "@/features/candidate/validators/Experience.schema";
// import type { ExperienceFormValues } from "@/features/candidate/types/Profile.types";
// export default function ExperienceForm({
//   mode = "add",
//   defaultValues,
//   onSubmit,
//   onCancel,
// }: {
//   mode?: "add" | "edit";
//   defaultValues?: Partial<ExperienceFormValues>;
//   onSubmit: (values: ExperienceFormValues) => Promise<void> | void;
//   onCancel?: () => void;
// }) {
//   const form = useForm<ExperienceFormValues>({
//     resolver: zodResolver(experienceSchema),
//     defaultValues: {
//       id: defaultValues?.id,
//       company: defaultValues?.company ?? "",
//       role: defaultValues?.role ?? "",
//       startDate: defaultValues?.startDate ?? "",
//       endDate: defaultValues?.endDate ?? "",
//       location: defaultValues?.location ?? "",
//       logoUrl: defaultValues?.logoUrl ?? "",
//       description: defaultValues?.description ?? "",
//       responsibilities:defaultValues?.responsibilities,
//       skills: defaultValues?.skills?.map((s) =>s) ?? [],
//       resumeUrl: defaultValues?.resumeUrl ?? "",
//     },
//   });

//   const { register, handleSubmit, watch, formState, control } = form;

//   const { fields: respFields, append: addResp, remove: removeResp } = useFieldArray({
//     control,
//     name: "responsibilities",
//   });

//   const { fields: skillFields, append: addSkill, remove: removeSkill } = useFieldArray({
//     control,
//     name: "skills",
//   });


//     // convert nested fields
//     const payload: ExperienceFormValues = {
//       ...values,
//       responsibilities: values.responsibilities.map((r) => r.value),
//       skills: values.skills.map((s) => s.value),
//     };

//     onSubmit(payload);
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{mode === "add" ? "Add Experience" : "Edit Experience"}</CardTitle>
//       </CardHeader>

//       <form onSubmit={handleSubmit(submit)}>
//         <CardContent className="space-y-4">
//           {/* Company */}
//           <div>
//             <Label>Company</Label>
//             <Input placeholder="Acme Corp" {...register("company")} />
//             {formState.errors.company && (
//               <p className="text-red-500 text-sm">{formState.errors.company.message}</p>
//             )}
//           </div>

//           {/* Role */}
//           <div>
//             <Label>Role</Label>
//             <Input placeholder="Frontend Engineer" {...register("role")} />
//           </div>

//           {/* Dates */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <Label>Start Date</Label>
//               <Input type="month" {...register("startDate")} />
//             </div>

//             <div>
//               <Label>End Date</Label>
//               <Input type="month" {...register("endDate")} />
//             </div>
//           </div>

//           {/* Location */}
//           <div>
//             <Label>Location</Label>
//             <Input placeholder="Remote / City" {...register("location")} />
//           </div>

//           {/* Logo Upload */}
//           <div>
//             <Label>Company Logo</Label>
//             <Input type="file" accept="image/*" {...register("logoFile")} />
//             {logoPreview && (
//               <Avatar className="mt-2">
//                 <img src={logoPreview} alt="Logo" />
//               </Avatar>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <Label>Description</Label>
//             <Textarea placeholder="Describe your responsibilities" {...register("description")} />
//           </div>

//           <Separator />

//           {/* Responsibilities */}
//           <div>
//             <Label>Responsibilities</Label>

//             <div className="space-y-2 mt-2">
//               {respFields.map((field, i) => (
//                 <div key={field.id} className="flex items-center gap-2">
//                   <Input {...register(`responsibilities.${i}.value` as const)} />
//                   <Button variant="ghost" size="icon" onClick={() => removeResp(i)}>
//                     <Trash size={14} />
//                   </Button>
//                 </div>
//               ))}

//               <Button type="button" variant="secondary" onClick={() => addResp({ value: "" })}>
//                 <Plus size={14} /> Add Responsibility
//               </Button>
//             </div>
//           </div>

//           <Separator />

//           {/* Skills */}
//           <div>
//             <Label>Skills</Label>

//             <div className="space-y-2 mt-2">
//               {skillFields.map((field, i) => (
//                 <div key={field.id} className="flex items-center gap-2">
//                   <Input {...register(`skills.${i}.value` as const)} />
//                   <Button variant="ghost" size="icon" onClick={() => removeSkill(i)}>
//                     <Trash size={14} />
//                   </Button>
//                 </div>
//               ))}

//               <Button type="button" variant="secondary" onClick={() => addSkill({ value: "" })}>
//                 <Plus size={14} /> Add Skill
//               </Button>
//             </div>
//           </div>

//           <Separator />

//           {/* Resume Upload */}
//           <div>
//             <Label>Resume</Label>
//             <Input type="file" accept=".pdf,.doc,.docx" {...register("resumeFile")} />
//             {resumePreview && (
//               <a
//                 href={resumePreview}
//                 target="_blank"
//                 className="text-blue-600 underline text-sm mt-2 block"
//               >
//                 View Uploaded Resume
//               </a>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="flex justify-end gap-2">
//           {onCancel && (
//             <Button type="button" variant="ghost" onClick={onCancel}>
//               Cancel
//             </Button>
//           )}
//           <Button type="submit">{mode === "add" ? "Add Experience" : "Update Experience"}</Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }