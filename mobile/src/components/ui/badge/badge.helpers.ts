import type { BadgeVariant } from './badge.types';

export const BADGE_COLOR_SEQUENCE: BadgeVariant[] = [
  'violet',
  'orange',
  'green',
  'neutral',
];

export const getVariantByIndex = (index: number): BadgeVariant =>
  BADGE_COLOR_SEQUENCE[index % BADGE_COLOR_SEQUENCE.length] ?? 'neutral';
