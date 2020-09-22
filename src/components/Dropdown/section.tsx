import React from 'react';

import { OptionsProps } from './provider';

interface SectionProps {
  optionItem: OptionsProps
}

export const DropdownSection: React.FC<SectionProps> = ({ optionItem }) => {
  return (
    <div>
      {optionItem.WrappedContent ? optionItem.WrappedContent() : ''}
    </div>
  );
};