import { z } from 'zod';
import { CARD_TYPES } from '~/types';

export const createCardSchema = z.object({
  kanji: z.string().min(1, 'Kanji es requerido').max(20),
  furigana: z.string().max(40).default(''),
  type: z.enum(CARD_TYPES),
  meaning: z.string().min(1, 'Significado es requerido').max(100),
  example: z.string().max(100).optional(),
  note: z.string().max(100).optional(),
  tags: z.array(z.string()).default([]),
});

export type CreateCardSchema = z.infer<typeof createCardSchema>;
