import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SidebarToggle({
  isOpen,
  toggle
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="
        absolute top-6 -right-3 z-50 
        bg-white border shadow-md rounded-full 
        p-1 hover:bg-gray-100 transition
      "
    >
      {isOpen ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  );
}
