interface JobDescriptionProps {
  description?: string;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({ description }) => {
  if (!description) return null;

  return (
    <div>
      <h3 className="font-semibold text-lg">Job Description</h3>
      <p className="text-muted-foreground mt-2 leading-6">{description}</p>
    </div>
  );
};
