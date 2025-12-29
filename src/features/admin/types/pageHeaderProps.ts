export interface PageHeaderProps {
  title: string

  /** Optional descriptive text below title */
  subtitle?: string

  /** Right-side actions (buttons, dropdowns, etc.) */
  actions?: React.ReactNode

  /** Optional status badge (active / blocked / etc.) */
  statusBadge?: React.ReactNode

  /** Optional back navigation */
  onBack?: () => void
}
