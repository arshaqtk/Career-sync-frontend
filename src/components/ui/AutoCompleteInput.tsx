import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/shadcn/input"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"

type AutoCompleteInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  fetchSuggestions: (query: string) => Promise<string[]>
  minLength?: number
}

export function AutoCompleteInput({
  value,
  onChange,
  placeholder = "Search...",
  fetchSuggestions,
  minLength = 2,
}: AutoCompleteInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedValue = useDebounce(value, 400)

  // 🔹 Fetch suggestions
  useEffect(() => {
    const loadSuggestions = async () => {
      if (debouncedValue.length < minLength) {
        setSuggestions([])
        return
      }

      const result = await fetchSuggestions(debouncedValue)
      setSuggestions(result)
      setOpen(true)
    }

    loadSuggestions()
  }, [debouncedValue, fetchSuggestions, minLength])

  // 🔹 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  console.log(suggestions)

  return (
    <div ref={containerRef} className="relative w-[220px]">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

      <Input
        value={value}
        placeholder={placeholder}
        className="pl-8"
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
      />

      {/* 🔽 Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
              onClick={() => {
                onChange(item)
                setOpen(false)
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
