import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { formatDate } from '@/lib/history'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { ClubChapter, ClubPageContent } from '@/types'

const TITLE_ID = 'club-histoire'

/**
 * Un chapitre : l'année en très grand, puis l'événement et le texte officiel qui le raconte.
 * Reveal à l'entrée dans l'écran : les filets se tracent, l'année monte, le texte arrive.
 */
function StoryChapter({ chapter, number }: { chapter: ClubChapter; number: string }) {
  const ref = useRowReveal<HTMLLIElement>()
  const { event, text } = chapter

  return (
    <li ref={ref} className="relative grid-site gap-y-4 py-10 md:gap-y-6 lg:py-16">
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
      />
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute top-0 left-0 h-1 w-12 origin-left bg-primary"
      />

      <p className="display col-span-4 text-[length:min(26vw,15rem)] leading-[0.85] md:col-span-4 lg:col-span-5">
        <MaskedLine>
          <time dateTime={event.date ?? event.year}>{event.year}</time>
        </MaskedLine>
      </p>

      <div className="col-span-4 flex flex-col gap-4 md:col-span-4 md:pt-3 lg:col-span-6 lg:col-start-7 lg:gap-5">
        <p data-row-fade className="micro flex gap-3 text-muted-foreground">
          <span aria-hidden="true">{number}</span>
          {event.date && <span>{formatDate(event.date)}</span>}
        </p>
        <h3 data-row-fade className="display text-heading">
          {event.title}
        </h3>
        {text && (
          <p data-row-fade className="max-w-[52ch] text-muted-foreground">
            {text}
          </p>
        )}
      </div>
    </li>
  )
}

/** L'histoire en trois dates officielles, sur fond crème (registre papier, archive). */
export function ClubStory({ content }: { content: ClubPageContent['story'] }) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section theme="cream" spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="mb-10 flex flex-col gap-6 lg:mb-16 lg:gap-8">
        <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="l">
          {content.title.lines.map((line) => (
            <MaskedLine key={line}>{line}</MaskedLine>
          ))}
          <MaskedLine>
            <Accent>{content.title.accent}</Accent>
          </MaskedLine>
        </SectionTitle>
      </div>

      <ol aria-label="Dates clés du club" className="border-b border-foreground">
        {content.chapters.map((chapter, index) => (
          <StoryChapter
            key={chapter.event.id}
            chapter={chapter}
            number={String(index + 1).padStart(2, '0')}
          />
        ))}
      </ol>
    </Section>
  )
}
