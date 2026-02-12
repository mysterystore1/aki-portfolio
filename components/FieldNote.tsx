import { cn } from '@/lib/utils';

type FieldNoteVariant = 'default' | 'warning' | 'tip' | 'proof';

const variantStyles: Record<FieldNoteVariant, string> = {
  default: 'border-amber-200 bg-amber-50 text-amber-900',
  warning: 'border-sky-200 bg-sky-50 text-sky-900',
  tip: 'border-amber-200 bg-amber-50 text-amber-900',
  proof: 'border-sky-200 bg-sky-50 text-sky-900'
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
        'before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-2xl',
        'before:bg-gradient-to-b before:from-ink-900 before:to-accent-600',
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
