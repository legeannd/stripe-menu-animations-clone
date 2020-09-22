import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useDimensions } from './dimensions';
import { Context } from './provider';

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

  const {
    registerOption,
    updateOptionProps,
    deleteOptionsById,
    setTargetId,
    targetId,
  } = useContext(Context);

  
  useEffect(() => {
    let actualDimensions: DOMRect | undefined;

    if (!registered && dimensions) {
      const WrappedContent = () => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (contentRef.current) {
            /* setActualDimensions(contentRef.current.getBoundingClientRect()) */
            actualDimensions = contentRef.current.getBoundingClientRect();
          };
          updateOptionProps(id, {optionsDimensions: actualDimensions});
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionsDimensions: actualDimensions,
        optionCenterX: actualDimensions && actualDimensions.x + actualDimensions.width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);

    } else if (registered && dimensions) {
      updateOptionProps(
        id, {
          optionsDimensions: dimensions,
          optionCenterX: dimensions && dimensions.x + dimensions.width / 2,
        }
      );
    }
  }, [backgroundHeight, id, dimensions, registerOption, registered, updateOptionProps]);

  useEffect(() => deleteOptionsById(id), [deleteOptionsById, id]);

  let isMobile = false;

  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);
  const handleTouch = () => (isMobile = true);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    return targetId === id ? handleClose() : handleOpen();
  }

  return (
    <motion.button 
      className="dropdown-option"
      ref={hook}
      onMouseDown={(e) => handleClick(e)}
      onHoverStart={() => !isMobile && handleOpen()}
      onHoverEnd={() => !isMobile && handleClose()}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  )
}