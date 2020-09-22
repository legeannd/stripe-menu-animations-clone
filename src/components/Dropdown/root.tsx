import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';

import { Context } from './provider';
import { DropdownSection } from './section';

export function DropdownRoot() {
  const { options, cachedId, getOptionById } = useContext(Context);

  const cachedOption = useMemo(() => cachedId ? getOptionById(cachedId) : 0, [
    cachedId, 
    getOptionById
  ]);

  let [width, height, x] = [0, 0, 0];
  
  if (cachedOption) {
    const { optionCenterX, optionsDimensions } = cachedOption;

    if (optionsDimensions && optionCenterX) {
      width = optionsDimensions.width;
      height = optionsDimensions.height;
      x = optionCenterX - width / 2;
    }
  }

  return (
    <div className="dropdown-root">
      <motion.div 
        className="dropdown-container"
        animate={{
          x,
          width,
          height,
        }}
      >
        <motion.div
          animate={{
            x: -x,
          }}
        >
          {options.map(item => (
            <DropdownSection key={item.id} optionItem={item} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};