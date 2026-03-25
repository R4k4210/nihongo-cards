'use client';

import { useEffect, useState } from 'react';
import { Button, Modal, SFormGroup, SInput, SLabel, SModalActions, SSelect } from '~/components/common';
import { CARD_TYPE_CONFIG } from '~/constants';
import { CARD_TYPES, Card, CardType } from '~/types';

interface EditCardModalProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Card>) => void;
}

export function EditCardModal({ card, isOpen, onClose, onSave }: EditCardModalProps) {
  const [kanji, setKanji] = useState('');
  const [furigana, setFurigana] = useState('');
  const [type, setType] = useState<CardType>('sustantivo');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (card) {
      setKanji(card.kanji);
      setFurigana(card.furigana);
      setType(card.type);
      setMeaning(card.meaning);
      setExample(card.example || '');
      setNote(card.note || '');
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
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Editar Card'>
      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-kanji'>漢字 Kanji</SLabel>
        <SInput id='edit-kanji' $large value={kanji} onChange={(e) => setKanji(e.target.value)} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-furigana'>ふりがな Furigana (usar , para separar)</SLabel>
        <SInput id='edit-furigana' value={furigana} onChange={(e) => setFurigana(e.target.value)} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-type'>Tipo</SLabel>
        <SSelect id='edit-type' value={type} onChange={(e) => setType(e.target.value as CardType)}>
          {CARD_TYPES.map((t) => (
            <option key={t} value={t}>
              {CARD_TYPE_CONFIG[t].label}
            </option>
          ))}
        </SSelect>
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-meaning'>Significado</SLabel>
        <SInput id='edit-meaning' value={meaning} onChange={(e) => setMeaning(e.target.value)} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-example'>Ejemplo</SLabel>
        <SInput id='edit-example' value={example} onChange={(e) => setExample(e.target.value)} />
      </SFormGroup>

      <SFormGroup style={{ marginBottom: '1rem' }}>
        <SLabel htmlFor='edit-note'>Nota</SLabel>
        <SInput id='edit-note' value={note} onChange={(e) => setNote(e.target.value)} />
      </SFormGroup>

      <SModalActions>
        <Button variant='secondary' onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={!kanji.trim() || !meaning.trim()}>
          Guardar
        </Button>
      </SModalActions>
    </Modal>
  );
}
