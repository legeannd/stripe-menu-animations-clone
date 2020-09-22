import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useDimensions } from './dimensions';
import { Context, OptionsProps } from './provider';

interface DropdownProps {
  name: string;
  content: () => JSX.Element;
  backgroundHeight: number;
}

let lastOptionId = 0;

export function DropdownOption({ name, content: Content, backgroundHeight }: DropdownProps) {
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;

  const {hook, dimensions} = useDimensions();
  const [registered, setRegistered] = useState(false);
  const [actualDimensions, setActualDimensions] = useState<DOMRect>(); 

  const {
    registerOption,
    updateOptionProps,
    deleteOptionsById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && dimensions) {
      const WrappedContent: React.FC = () => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (contentRef.current) {
            setActualDimensions(contentRef.current.getBoundingClientRect())
          };
          updateOptionProps(id, {optionsDimensions: actualDimensions});
        }, []);

        return <div ref={contentRef}>
          <Content />
        </div>
      };

      registerOption({
        id,
        optionsDimensions: actualDimensions,
        optionCenterX: actualDimensions ? actualDimensions.x + (actualDimensions.width /2) : undefined,
        wrappedContent: WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);

    } else if (registered && dimensions) {
      updateOptionProps(
        id, {
          optionsDimensions: dimensions,
          optionCenterX: dimensions ? dimensions.x + (dimensions.width /2) : undefined,
        }
      );
    }
  }, [actualDimensions, backgroundHeight, id, dimensions, registerOption, registered, updateOptionProps]);
  
  return (
    <motion.button 
      className="dropdown-option"
      ref={hook}
    >
      {name}
    </motion.button>
  )
}