'use client';

import { useCallback, useState } from 'react';
import { CardType, CreateCardInput } from '~/types';

const initialState: CreateCardInput = {
  kanji: '',
  furigana: '',
  type: 'sustantivo',
  meaning: '',
  example: '',
  note: '',
  tags: [],
};

export function useCardForm(defaultValues?: Partial<CreateCardInput>) {
  const [form, setForm] = useState<CreateCardInput>({ ...initialState, ...defaultValues });

  const updateField = useCallback(<K extends keyof CreateCardInput>(field: K, value: CreateCardInput[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setForm({ ...initialState, ...defaultValues });
  }, [defaultValues]);

  const setType = useCallback((type: CardType) => updateField('type', type), [updateField]);

  const isValid = form.kanji.trim().length > 0 && form.meaning.trim().length > 0;

  return { form, updateField, reset, setType, isValid };
}
