interface AboutSectionProps {
  about: string;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">About Me</h3>
      <p className="text-muted-foreground leading-relaxed">{about}</p>
    </div>
  );
}
