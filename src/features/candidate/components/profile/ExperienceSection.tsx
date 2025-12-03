export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Work Experience</h3>

      {experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <p className="font-medium">{exp.title}</p>
          <p className="text-sm text-muted-foreground">{exp.company}</p>
          <p className="text-sm text-muted-foreground">{exp.duration}</p>
        </div>
      ))}
    </div>
  );
}
