import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { CPV_OPTIONS, SOURCE_OPTIONS } from "@/types/notices";
import type { NoticeFilters } from "@/types/notices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface FilterBarProps {
  filters: NoticeFilters;
  onChange: (filters: Partial<NoticeFilters>) => void;
  onSearch: () => void;
}

const FilterBar = ({ filters, onChange, onSearch }: FilterBarProps) => {
  const [searchInput, setSearchInput] = useState(filters.q);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    filters.date_from ? new Date(filters.date_from) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    filters.date_to ? new Date(filters.date_to) : undefined
  );

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => onChange({ q: searchInput }), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleDateFromChange = (date: Date | undefined) => {
    setDateFrom(date);
    onChange({ date_from: date ? format(date, "yyyy-MM-dd") : "" });
  };

  const handleDateToChange = (date: Date | undefined) => {
    setDateTo(date);
    onChange({ date_to: date ? format(date, "yyyy-MM-dd") : "" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  // Track selected sources
  const selectedSources = filters.source ? filters.source.split(",") : [];

  const toggleSource = (value: string) => {
    const updated = selectedSources.includes(value)
      ? selectedSources.filter((s) => s !== value)
      : [...selectedSources, value];
    onChange({ source: updated.join(",") });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={200}
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* CPV */}
        <Select value={filters.cpv} onValueChange={(v) => onChange({ cpv: v === "all" ? "" : v })}>
          <SelectTrigger className="w-full lg:w-56 bg-background">
            <SelectValue placeholder="Tous les CPV" />
          </SelectTrigger>
          <SelectContent>
            {CPV_OPTIONS.map((opt) => (
              <SelectItem key={opt.value || "all"} value={opt.value || "all"}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date From */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm",
                !dateFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon size={14} />
              {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Date début"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={handleDateFromChange}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Date To */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm",
                !dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon size={14} />
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "Date fin"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={handleDateToChange}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Source toggles */}
        <div className="flex items-center gap-2">
          {SOURCE_OPTIONS.map((src) => (
            <button
              key={src.value}
              onClick={() => toggleSource(src.value)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors",
                selectedSources.includes(src.value)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-input bg-background text-muted-foreground hover:bg-secondary"
              )}
            >
              {src.label}
            </button>
          ))}
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          className="rounded-lg bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
