import { cn } from '@/lib/utils'

/** Texte historique : le premier paragraphe ouvre le récit, les suivants le prolongent. */
export function HistoryText({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph}
          data-history-fade
          className={cn(index === 0 ? 'font-medium' : 'text-muted-foreground')}
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}
