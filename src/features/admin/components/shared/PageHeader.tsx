import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/shadcn/button"
import type { PageHeaderProps } from "../../types/pageHeaderProps"

export function PageHeader({
  title,
  subtitle,
  actions,
  statusBadge,
  onBack,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div className="flex items-start gap-3">
        {onBack && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onBack}
            className="mt-1"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {statusBadge}
          </div>

          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}
