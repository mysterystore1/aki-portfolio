import { cn } from '@/lib/utils';

type FieldNoteVariant = 'default' | 'warning' | 'tip' | 'proof';

const variantStyles: Record<FieldNoteVariant, string> = {
  default: 'border-amber-200 bg-amber-50 text-amber-900',
  warning: 'border-rose-200 bg-rose-50 text-rose-900',
  tip: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  proof: 'border-indigo-200 bg-indigo-50 text-indigo-900'
};

export default function FieldNote({
  label = 'FIELD NOTE',
  title,
  body,
  items,
  variant = 'default',
  className
}: {
  label?: string;
  title?: string;
  body?: string;
  items?: string[];
  variant?: FieldNoteVariant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border px-4 py-3 shadow-sm',
        'before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-2xl before:bg-ink-900/80',
        'motion-safe:rotate-[-1deg] motion-safe:transition motion-safe:hover:rotate-0',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-900/70">
        <span>{label}</span>
        <span aria-hidden="true" className="text-ink-900/60">
          📎
        </span>
      </div>
      {title ? <p className="mt-2 text-sm font-semibold">{title}</p> : null}
      {body ? <p className="mt-2 whitespace-pre-line text-sm">{body}</p> : null}
      {items?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
