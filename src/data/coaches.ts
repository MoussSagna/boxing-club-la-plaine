import { PLACEHOLDER_IMAGE } from '@/data/site'
import type { Coach } from '@/types'

/*
 * Encadrants — informations OFFICIELLES communiquées par le club, reprises telles quelles.
 * Donnée préparée pour la future page /coachs : elle n'est affichée nulle part pour l'instant.
 * TODO : portraits réels (placeholder en attendant) et, si le club le souhaite, biographies.
 */
export const coaches: Coach[] = [
  {
    id: 'laurent-vantheemst',
    name: 'Laurent Vantheemst',
    qualifications: ['Cadre technique', 'Arbitre national', 'Préparateur mental diplômé'],
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'christophe-tiozzo',
    name: 'Christophe Tiozzo',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    achievements: [
      'Médaillé de bronze aux Jeux Olympiques de Los Angeles 1984',
      'Champion du monde WBA 1990',
    ],
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'paul-marius',
    name: 'Paul Marius',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'matthias-hourde',
    name: 'Matthias Hourdé',
    qualifications: [
      'Brevet Professionnel de la Jeunesse, de l’Éducation Populaire et du Sport (BPJEPS)',
      'Cutman-soigneur',
    ],
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'manuel-tavares',
    name: 'Manuel Tavares',
    qualifications: [
      'Brevet Professionnel de la Jeunesse, de l’Éducation Populaire et du Sport (BPJEPS)',
      'Cutman-soigneur',
    ],
    achievements: ['Vice-Champion d’Europe de MMA'],
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'jerome-loubet',
    name: 'Jérôme Loubet',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'jean-paul-guinvanna',
    name: 'Jean-Paul Guinvanna',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    image: PLACEHOLDER_IMAGE,
  },
]
