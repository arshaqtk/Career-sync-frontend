interface ApplicationHeaderProps{
     jobTitle:string;
        company:string;
        status:string;
        appliedAt:string;
}

export function ApplicationHeader({ appliedAt, jobTitle,company,status}: ApplicationHeaderProps) {
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold">
        {jobTitle} @ {company}
      </h1>

      <div className="flex items-center gap-3 mt-2">
        {/* <StatusBadge status={status} /> */}
        <span className="text-sm text-muted-foreground">
          Applied on {new Date(appliedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
