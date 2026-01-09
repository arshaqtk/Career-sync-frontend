interface Props {
  blockedAt: string
  blockedReason: string
}

export function RecruiterBlockedInfoCard({ blockedAt, blockedReason }: Props) {
  return (
    <div className="border border-destructive/40 bg-destructive/5 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-destructive">
        Recruiter Blocked
      </h3>

      <div className="mt-2 space-y-1 text-sm">
        <p>
          <span className="font-medium">Blocked on:</span>{" "}
          {new Date(blockedAt).toLocaleString()}
        </p>

        <p>
          <span className="font-medium">Reason:</span>{" "}
          {blockedReason}
        </p>
      </div>
    </div>
  )
}
