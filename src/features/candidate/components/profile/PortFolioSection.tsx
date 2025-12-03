import { Card, CardContent } from "@/components/ui/card";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
}

interface PortfolioSectionProps {
  projects: ProjectItem[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Portfolio</h3>

      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
