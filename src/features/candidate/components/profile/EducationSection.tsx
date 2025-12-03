export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
}

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Education</h3>

      {education.map((edu) => (
        <div key={edu.id} className="mb-4">
          <p className="font-medium">{edu.degree}</p>
          <p className="text-sm text-muted-foreground">{edu.school}</p>
          <p className="text-sm text-muted-foreground">{edu.year}</p>
        </div>
      ))}
    </div>
  );
}
