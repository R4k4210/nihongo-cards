'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Button,
  Modal,
  SFormGroup,
  SInput,
  SLabel,
  SModalActions,
  SSelect,
  STextarea,
  TagInput,
} from '~/components/common';
import { CARD_TYPES, Card, CardType } from '~/types';
import { normalizeImageUrl } from '~/utils/images';

interface EditCardModalProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Card>) => void;
}

export function EditCardModal({ card, isOpen, onClose, onSave }: EditCardModalProps) {
  const t = useTranslations();
  const [kanji, setKanji] = useState('');
  const [furigana, setFurigana] = useState('');
  const [type, setType] = useState<CardType>('sustantivo');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [note, setNote] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (card) {
      setKanji(card.kanji);
      setFurigana(card.furigana);
      setType(card.type);
      setMeaning(card.meaning);
      setExample(card.example || '');
      setNote(card.note || '');
      setImageUrl(card.imageUrl || '');
      setTags(card.tags || []);
    }
  }, [card]);

  const handleSave = () => {
    if (!card || !kanji.trim() || !meaning.trim()) return;
    onSave(card.id, {
      kanji: kanji.trim(),
      furigana: furigana.trim(),
      type,
      meaning: meaning.trim(),
      example: example.trim() || undefined,
      note: note.trim() || undefined,
      imageUrl: normalizeImageUrl(imageUrl) || undefined,
      tags,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('editModal.title')}>
      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-kanji'>{t('cardForm.kanjiLabel')}</SLabel>
        <SInput id='edit-kanji' $large value={kanji} onChange={(e) => setKanji(e.target.value)} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-furigana'>{t('editModal.furiganaLabel')}</SLabel>
        <SInput id='edit-furigana' value={furigana} onChange={(e) => setFurigana(e.target.value)} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-type'>{t('cardForm.typeLabel')}</SLabel>
        <SSelect id='edit-type' value={type} onChange={(e) => setType(e.target.value as CardType)}>
          {CARD_TYPES.map((cardType) => (
            <option key={cardType} value={cardType}>
              {t(`cardTypes.${cardType}.label`)}
            </option>
          ))}
        </SSelect>
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-meaning'>{t('cardForm.meaningLabel')}</SLabel>
        <STextarea id='edit-meaning' value={meaning} onChange={(e) => setMeaning(e.target.value)} rows={2} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-example'>{t('cardForm.exampleLabel')}</SLabel>
        <STextarea id='edit-example' value={example} onChange={(e) => setExample(e.target.value)} rows={2} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-note'>{t('cardForm.noteLabel')}</SLabel>
        <STextarea id='edit-note' value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel>{t('cardForm.tagsLabel')}</SLabel>
        <TagInput tags={tags} onChange={setTags} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-image'>{t('cardForm.imageLabel')}</SLabel>
        <SInput
          id='edit-image'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder='https://i.imgur.com/...'
        />
      </SFormGroup>

      <SModalActions>
        <Button variant='secondary' onClick={onClose}>
          {t('editModal.cancel')}
        </Button>
        <Button onClick={handleSave} disabled={!kanji.trim() || !meaning.trim()}>
          {t('editModal.save')}
        </Button>
      </SModalActions>
    </Modal>
  );
}
