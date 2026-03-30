import { motion } from "framer-motion"
import { Button } from "@/components/ui/shadcn/button"
import { ChevronRight } from "lucide-react"

export function SidebarToggle({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: () => void
}) {
  return (
    <motion.div
      initial={false}
      animate={{ left: isOpen ? 256 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden lg:flex fixed top-1/2 -translate-y-1/2 -ml-3 z-50 translate-x-1/2"
    >
      <Button
        size="icon"
        variant="secondary"
        onClick={toggle}
        className="rounded-full h-6 w-6 shadow-md border border-border/50 bg-background text-foreground hover:bg-muted"
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className={`h-3 w-3 ${isOpen ? 'rotate-180' : ''} transition-transform`} />
        </motion.div>
      </Button>
    </motion.div>
  )
}
