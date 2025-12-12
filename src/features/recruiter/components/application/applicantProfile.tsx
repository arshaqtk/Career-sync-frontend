import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";

export function ApplicantProfile({ applicant }: any) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{applicant.name}</CardTitle>
        <p className="text-muted-foreground">
          {applicant.currentRole} • {applicant.experience} yrs
        </p>
      </CardHeader>

      <CardContent>
        <h4 className="font-medium mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2 mb-5">
          {applicant.skills?.map((skill: string) => (
            <Badge variant="secondary" key={skill}>{skill}</Badge>
          ))}
        </div>

        <h4 className="font-medium mb-2">Experience</h4>
        <ul className="list-disc pl-5 space-y-1">
          {applicant.experienceDetails?.map((exp: any) => (
            <li key={exp.company}>
              <span className="font-semibold">{exp.role}</span> at {exp.company}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
