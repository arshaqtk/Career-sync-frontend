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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 pb-6 border-b border-border/50 gap-6">
      <div className="flex items-start gap-4">
        {onBack && (
          <Button
            size="icon"
            variant="outline"
            onClick={onBack}
            className="h-10 w-10 shrink-0 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>

            {statusBadge}
          </div>

          {subtitle && (
            <p className="text-muted-foreground font-medium max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
