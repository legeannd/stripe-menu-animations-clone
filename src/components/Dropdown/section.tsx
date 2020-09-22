import React, { useContext } from 'react';

import { motion } from 'framer-motion';

import { Context, OptionsProps } from './provider';

interface SectionProps {
  optionItem: OptionsProps
}

export const DropdownSection: React.FC<SectionProps> = ({ optionItem }) => {
  const { updateOptionProps, cachedId } = useContext(Context);

  const { id, optionsDimensions, backgroundHeight, optionCenterX } = optionItem;

  const contentWidth = optionsDimensions?.width || 0;
  const x = optionCenterX && optionCenterX - contentWidth / 2;

  const isActive = cachedId === id;

  return (
    <motion.div 
      className="dropdown-section"
      initial={{
        x
      }}
      animate={{
        x,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'unset' : 'none',
      }}
      transition={{
        ease: 'easeOut',
        opacity: { duration: 0.2 }
      }}
    >
      {optionItem.WrappedContent ? optionItem.WrappedContent() : ''}
    </motion.div>
  );
};