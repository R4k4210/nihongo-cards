'use client';

import { Button, SFormGroup, SHint, SInput, SLabel, SSelect, TypeBadge } from '~/components/common';
import { RubyText } from '~/components/ruby';
import { CARD_TYPE_CONFIG } from '~/constants';
import { useCardForm } from '~/hooks/useCardForm';
import { CARD_TYPES, CardType, CreateCardInput } from '~/types';
import {
  SFuriganaHelper,
  SFuriganaHelperTitle,
  SFormActions,
  SFormGrid,
  SPreviewBox,
  SPreviewCard,
  SPreviewLabel,
  SPreviewRow,
  SPreviewSection,
  SPreviewTitle,
  SSection,
  SSubtitle,
  STitle,
} from './CardForm.styles';

interface CardFormProps {
  onSubmit: (input: CreateCardInput) => void;
  defaultValues?: Partial<CreateCardInput>;
  submitLabel?: string;
  title?: string;
  subtitle?: string;
}

export function CardForm({
  onSubmit,
  defaultValues,
  submitLabel = 'Agregar Card',
  title = 'Nueva Flashcard',
  subtitle = 'Completá los campos para crear una nueva tarjeta de vocabulario',
}: CardFormProps) {
  const { form, updateField, reset, isValid } = useCardForm(defaultValues);

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(form);
    reset();
  };

  const showFuriganaHelper = form.kanji.trim() && form.furigana.trim();

  return (
    <SSection>
      <STitle>{title}</STitle>
      <SSubtitle>{subtitle}</SSubtitle>

      <SFormGrid>
        <SFormGroup>
          <SLabel htmlFor='input-kanji'>漢字 Kanji / Palabra</SLabel>
          <SInput
            id='input-kanji'
            $large
            value={form.kanji}
            onChange={(e) => updateField('kanji', e.target.value)}
            placeholder='紹介'
            maxLength={20}
          />
          <SHint>Kanji o escritura principal</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-furigana'>ふりがな Furigana</SLabel>
          <SInput
            id='input-furigana'
            value={form.furigana}
            onChange={(e) => updateField('furigana', e.target.value)}
            placeholder='しょう,かい'
            maxLength={40}
            style={{ fontSize: '1.1rem', textAlign: 'center' }}
          />
          <SHint>
            Usá <strong>,</strong> para separar por kanji. Ej: しょう,かい
          </SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-type'>Tipo</SLabel>
          <SSelect id='input-type' value={form.type} onChange={(e) => updateField('type', e.target.value as CardType)}>
            {CARD_TYPES.map((type) => (
              <option key={type} value={type}>
                {CARD_TYPE_CONFIG[type].label}
              </option>
            ))}
          </SSelect>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-meaning'>Significado</SLabel>
          <SInput
            id='input-meaning'
            value={form.meaning}
            onChange={(e) => updateField('meaning', e.target.value)}
            placeholder='Presentación, introducción'
            maxLength={100}
          />
          <SHint>Traducción o significado</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-example'>Ejemplo (opcional)</SLabel>
          <SInput
            id='input-example'
            value={form.example || ''}
            onChange={(e) => updateField('example', e.target.value)}
            placeholder='自己紹介をする'
            maxLength={100}
          />
          <SHint>Oración de ejemplo</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-note'>Nota (opcional)</SLabel>
          <SInput
            id='input-note'
            value={form.note || ''}
            onChange={(e) => updateField('note', e.target.value)}
            placeholder='JLPT N4'
            maxLength={100}
          />
          <SHint>Info adicional</SHint>
        </SFormGroup>
      </SFormGrid>

      {showFuriganaHelper && (
        <SFuriganaHelper>
          <SFuriganaHelperTitle>Vista previa del furigana</SFuriganaHelperTitle>
          <div style={{ textAlign: 'center' }}>
            <RubyText kanji={form.kanji} furigana={form.furigana} fontSize='2.5rem' />
          </div>
        </SFuriganaHelper>
      )}

      <SFormActions>
        <Button onClick={handleSubmit} disabled={!isValid}>
          {submitLabel}
        </Button>
        <Button variant='secondary' onClick={reset}>
          Limpiar
        </Button>
      </SFormActions>

      <SPreviewSection>
        <SPreviewTitle>Vista Previa (Front → solo kanji | Back → todo)</SPreviewTitle>
        <SPreviewRow>
          <SPreviewCard $variant='front'>
            <SPreviewLabel>Front (pregunta)</SPreviewLabel>
            <SPreviewBox $variant='front'>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <TypeBadge type={form.type} />
              </div>
              <span
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: '3.5rem',
                  fontWeight: 700,
                }}
              >
                {form.kanji || '漢字'}
              </span>
            </SPreviewBox>
          </SPreviewCard>

          <SPreviewCard $variant='back'>
            <SPreviewLabel>Back (respuesta)</SPreviewLabel>
            <SPreviewBox $variant='back'>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <TypeBadge type={form.type} />
              </div>
              <RubyText kanji={form.kanji || '漢字'} furigana={form.furigana} fontSize='2.5rem' />
              <div style={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'center' }}>
                {form.meaning || 'Significado'}
              </div>
              {form.example && (
                <div style={{ fontSize: '0.8rem', color: '#6c6c7e', textAlign: 'center' }}>{form.example}</div>
              )}
              {form.note && (
                <div style={{ fontSize: '0.8rem', color: '#6c6c7e', textAlign: 'center' }}>{form.note}</div>
              )}
            </SPreviewBox>
          </SPreviewCard>
        </SPreviewRow>
      </SPreviewSection>
    </SSection>
  );
}
