import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/shadcn/input"
import { useDebounce } from "@/hooks/useDebounce"

type AutoCompleteInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  fetchSuggestions: (query: string) => Promise<string[]>
  minLength?: number
  className?: string
  containerClassName?: string
}

export function AutoCompleteInput({
  value,
  onChange,
  placeholder = "Search...",
  fetchSuggestions,
  minLength = 2,
  className,
  containerClassName,
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


  return (
    <div ref={containerRef} className={containerClassName}>
      <Input
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
      />

      {/* 🔽 Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow py-1">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium border-b border-slate-50 last:border-0"
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
