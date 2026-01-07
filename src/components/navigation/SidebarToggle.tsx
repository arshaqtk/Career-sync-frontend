import { Button } from "@/components/ui/shadcn/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export  function SidebarToggle({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: () => void
}) {
  return (
    <div
      className={`hidden lg:flex fixed top-1/2 z-50
      ${isOpen ? "left-64" : "left-20"}
      transition-all duration-300`}
    >
      <Button
        size="icon"
        variant="secondary"
        onClick={toggle}
        className="rounded-full shadow"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
