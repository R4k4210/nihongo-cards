'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Button,
  SFormGroup,
  SHint,
  SInput,
  SLabel,
  SSelect,
  STextarea,
  TagInput,
  TypeBadge,
} from '~/components/common';
import { RubyText } from '~/components/ruby';
import { useCardForm } from '~/hooks/useCardForm';
import { CARD_TYPES, CardType, CreateCardInput } from '~/types';
import { normalizeImageUrl } from '~/utils/images';
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

export function CardForm({ onSubmit, defaultValues, submitLabel, title, subtitle }: CardFormProps) {
  const t = useTranslations();
  const { form, updateField, reset, isValid } = useCardForm(defaultValues);

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(form);
    reset();
  };

  const showFuriganaHelper = form.kanji.trim() && form.furigana.trim();
  const normalizedImageUrl = useMemo(() => normalizeImageUrl(form.imageUrl || ''), [form.imageUrl]);

  return (
    <SSection>
      <STitle>{title || t('cardForm.title')}</STitle>
      <SSubtitle>{subtitle || t('cardForm.subtitle')}</SSubtitle>

      <SFormGrid>
        <SFormGroup>
          <SLabel htmlFor='input-kanji'>{t('cardForm.kanjiLabel')}</SLabel>
          <SInput
            id='input-kanji'
            $large
            value={form.kanji}
            onChange={(e) => updateField('kanji', e.target.value)}
            placeholder='紹介'
            maxLength={20}
          />
          <SHint>{t('cardForm.kanjiHint')}</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-furigana'>{t('cardForm.furiganaLabel')}</SLabel>
          <SInput
            id='input-furigana'
            value={form.furigana}
            onChange={(e) => updateField('furigana', e.target.value)}
            placeholder='しょう,かい'
            maxLength={40}
            style={{ fontSize: '1.1rem', textAlign: 'center' }}
          />
          <SHint dangerouslySetInnerHTML={{ __html: t('cardForm.furiganaHint') }} />
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-type'>{t('cardForm.typeLabel')}</SLabel>
          <SSelect id='input-type' value={form.type} onChange={(e) => updateField('type', e.target.value as CardType)}>
            {CARD_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`cardTypes.${type}.label`)}
              </option>
            ))}
          </SSelect>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-meaning'>{t('cardForm.meaningLabel')}</SLabel>
          <SInput
            id='input-meaning'
            value={form.meaning}
            onChange={(e) => updateField('meaning', e.target.value)}
            placeholder='Presentación, introducción'
            maxLength={200}
          />
          <SHint>{t('cardForm.meaningHint')}</SHint>
        </SFormGroup>
      </SFormGrid>

      <SFormGrid>
        <SFormGroup>
          <SLabel htmlFor='input-image'>{t('cardForm.imageLabel')}</SLabel>
          <SInput
            id='input-image'
            value={form.imageUrl || ''}
            onChange={(e) => updateField('imageUrl', e.target.value)}
            placeholder={t('cardForm.imagePlaceholder')}
            maxLength={500}
          />
          <SHint>{t('cardForm.imageHint')}</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-example'>{t('cardForm.exampleLabel')}</SLabel>
          <STextarea
            id='input-example'
            value={form.example || ''}
            onChange={(e) => updateField('example', e.target.value)}
            placeholder='自己紹介をする'
            maxLength={200}
            rows={2}
          />
          <SHint>{t('cardForm.exampleHint')}</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel htmlFor='input-note'>{t('cardForm.noteLabel')}</SLabel>
          <STextarea
            id='input-note'
            value={form.note || ''}
            onChange={(e) => updateField('note', e.target.value)}
            placeholder='JLPT N4'
            maxLength={200}
            rows={2}
          />
          <SHint>{t('cardForm.noteHint')}</SHint>
        </SFormGroup>

        <SFormGroup>
          <SLabel>{t('cardForm.tagsLabel')}</SLabel>
          <TagInput
            tags={form.tags || []}
            onChange={(tags) => updateField('tags', tags)}
            placeholder={t('cardForm.tagPlaceholder')}
          />
          <SHint>{t('cardForm.tagsHint')}</SHint>
        </SFormGroup>
      </SFormGrid>

      {showFuriganaHelper && (
        <SFuriganaHelper>
          <SFuriganaHelperTitle>{t('cardForm.furiganaPreview')}</SFuriganaHelperTitle>
          <div style={{ textAlign: 'center' }}>
            <RubyText kanji={form.kanji} furigana={form.furigana} fontSize='2.5rem' />
          </div>
        </SFuriganaHelper>
      )}

      <SFormActions>
        <Button onClick={handleSubmit} disabled={!isValid}>
          {submitLabel || t('cardForm.addCard')}
        </Button>
        <Button variant='secondary' onClick={reset}>
          {t('cardForm.clear')}
        </Button>
      </SFormActions>

      <SPreviewSection>
        <SPreviewTitle>{t('cardForm.previewTitle')}</SPreviewTitle>
        <SPreviewRow>
          <SPreviewCard $variant='front'>
            <SPreviewLabel>{t('cardForm.frontLabel')}</SPreviewLabel>
            <SPreviewBox $variant='front'>
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
            <SPreviewLabel>{t('cardForm.backLabel')}</SPreviewLabel>
            <SPreviewBox $variant='back'>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <TypeBadge type={form.type} />
              </div>
              <RubyText kanji={form.kanji || '漢字'} furigana={form.furigana} fontSize='2.5rem' />
              <div style={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'center' }}>
                {form.meaning || t('cardForm.meaningPlaceholder')}
              </div>
              {form.example && (
                <div style={{ fontSize: '0.8rem', color: '#6c6c7e', textAlign: 'center' }}>{form.example}</div>
              )}
              {form.note && (
                <div style={{ fontSize: '0.8rem', color: '#6c6c7e', textAlign: 'center' }}>{form.note}</div>
              )}
              {normalizedImageUrl && (
                <Image
                  src={normalizedImageUrl}
                  alt='Preview'
                  width={120}
                  height={60}
                  style={{ objectFit: 'contain', borderRadius: '8px' }}
                  unoptimized
                />
              )}
            </SPreviewBox>
          </SPreviewCard>
        </SPreviewRow>
      </SPreviewSection>
    </SSection>
  );
}
