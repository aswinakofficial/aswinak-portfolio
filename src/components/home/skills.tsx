import { skills } from '@/lib/siteContent'

export function Skills() {
  return (
    <section className="border-t-[4px] border-border py-28">
      <div className="mx-auto max-w-[1280px] px-12">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-4">
          § 01 — Stack
        </p>
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display font-black text-[56px] leading-none tracking-[-0.04em]">
            What I work with.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.groups.map((group) => (
            <article
              key={group.label}
              className="border-[4px] border-border bg-card neo-shadow flex flex-col"
            >
              <div className={`flex items-center justify-between px-4 py-2.5 border-b-[4px] border-border font-black text-xs uppercase tracking-[0.08em] ${group.accent}`}>
                <span>{group.label}</span>
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 bg-current opacity-60 inline-block" />
                  ))}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-4 flex-1">
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{group.lead}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-[2.5px] border-border px-2.5 py-1 text-xs font-bold bg-background"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
