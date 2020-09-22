import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { Context } from './provider';
import { DropdownSection } from './section';

const refDuration = .22;

interface ArrowProps {
  isFirstInteraction: boolean;
}

const DropdownArrow:React.FC<ArrowProps> = ({ isFirstInteraction }) => {
  const { cachedId, getOptionById } = useContext(Context);

  const cachedOption = useMemo(() => cachedId ? getOptionById(cachedId) : 0, [
    cachedId, 
    getOptionById
  ]);

  const x = cachedOption ? cachedOption.optionCenterX : 0;

  return (
    <motion.div 
      className="dropdown-arrow"
      initial={{
        opacity: 0,
      }}
      animate={{
        x,
        pointerEvents: 'none',
        opacity: x && (x > 0 ? 1 : 0),
      }}
      transition={{
        ease: 'easeOut',
        x: { duration: isFirstInteraction ? 0 : refDuration },
      }}
    />
  )
};

export function DropdownRoot() {
  const { options, cachedId, getOptionById, targetId } = useContext(Context);
  const [hovering, setHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false)

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

  const isActive = targetId !== null || hovering;

  const isFirstInteraction = isActive && !hasInteracted;

  if(isFirstInteraction) {
    setTimeout(() => {
      if (!hasInteracted) setHasInteracted(true);
    }, 15);
  }

  return (
    <div className="dropdown-root">
      <motion.div 
        className="dropdown-container"
        animate={{
          x,
          width,
          height,
          pointerEvents: isActive ? 'unset' : 'none',
        }}
        transition={{
          ease: 'easeOut',
          x: isFirstInteraction ? { duration: 0 } : refDuration,
          width: { duration: isFirstInteraction ? 0 : refDuration * 0.93},
          height: { duration: isFirstInteraction ? 0 : refDuration * 0.93},
          pointerEvents: { delay: 0.05},
        }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      >
        <motion.div
          animate={{
            x: -x,
          }}
          transition={{
            x: isFirstInteraction ? { duration: 0 } : undefined,
          }}
        >
          {options.map(item => (
            <DropdownSection key={item.id} optionItem={item} />
          ))}
        </motion.div>      
      </motion.div>
      
      <DropdownArrow  isFirstInteraction={isFirstInteraction} />
    </div>
  );
};