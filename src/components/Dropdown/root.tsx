import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import { Context } from './provider';
import { DropdownSection } from './section';

export const DropdownRoot: React.FC = () => {
  const { options } = useContext(Context);

  return (
    <div className="dropdown-root">
      <div>
        <div className="dropdown-contain">
          {options.map(item => (
            <DropdownSection key={item.id} optionItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
};