'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SInlineInput, SPill, SPillRemove, STagInputWrapper } from './TagInput.styles';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ tags, onChange, placeholder }: TagInputProps) {
  const t = useTranslations('cards');
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (value: string) => {
    const tag = value.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <STagInputWrapper onClick={() => inputRef.current?.focus()}>
      {tags.map((tag, i) => (
        <SPill key={tag}>
          {tag}
          <SPillRemove type='button' onClick={() => removeTag(i)} aria-label={t('deleteTag', { tag })}>
            ×
          </SPillRemove>
        </SPill>
      ))}
      <SInlineInput
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length === 0 ? placeholder || '' : ''}
      />
    </STagInputWrapper>
  );
}
