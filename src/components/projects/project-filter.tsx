import { cn } from '@/lib/utils'

type Category = 'All' | 'Solutions' | 'Open Source' | 'For Fun'

interface ProjectFilterProps {
  selected: Category
  onSelect: (cat: Category) => void
  counts: Record<Category, number>
  total: number
}

export function ProjectFilter({ selected, onSelect, counts, total }: ProjectFilterProps) {
  const categories: Category[] = ['All', 'Solutions', 'Open Source', 'For Fun']

  return (
    <div className="mb-8">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 border-[4px] border-border font-black text-sm uppercase tracking-wide neo-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all',
              selected === cat
                ? 'bg-foreground text-background'
                : 'bg-card text-foreground hover:bg-secondary'
            )}
          >
            {cat}
            <span
              className={cn(
                'font-mono text-[11px] font-bold border-[2px] px-2 py-0.5',
                selected === cat
                  ? 'bg-orange text-white border-background'
                  : 'bg-secondary text-secondary-foreground border-border'
              )}
            >
              {counts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* Results strip */}
      <div className="border-t-[3px] border-b-[3px] border-border py-3.5 flex justify-between font-mono text-xs font-semibold tracking-wide">
        <span>
          Showing <strong>{selected === 'All' ? total : counts[selected]}</strong> of {total} · filter = "{selected}"
        </span>
        <span className="text-muted-foreground">↓ scroll for more</span>
      </div>
    </div>
  )
}
