interface ProfileStatsRowProps {
  children: React.ReactNode;
}

export function ProfileStatsRow({ children }: ProfileStatsRowProps) {
  return <div className="grid grid-cols-4 gap-4">{children}</div>;
}
