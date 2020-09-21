import React, { createContext, useCallback, useEffect, useState } from 'react';

const Context = createContext({});

interface OptionsProps {
  id: number;
  optionsDimensions: number;
  optionCenterX: number;
  wrappedContent: JSX.Element;
  backgroundHeight: number;
}

export const DropdownProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCachedId] = useState(null);

  const registerOption = useCallback(({
    id, 
    optionsDimensions,
    optionCenterX,
    wrappedContent,
    backgroundHeight,
  }) => {
    const optionsReceived: OptionsProps = {
      id,
      optionsDimensions,
      optionCenterX,
      wrappedContent,
      backgroundHeight
    }

    setOptions(items => [
      ...items,
      optionsReceived
    ])
  }, [setOptions]);

  const updateOptionProps = useCallback((optionId, props) => {
    setOptions(items => 
      items.map(item => {
        if (item.id === optionId) {
          item = {
            ...item,
            ...props
          };
        }

        return item;
      })  
    )
  }, [setOptions]);

  const getOptionById = useCallback((id) => options.find(item => item.id === id), [options]);

  const deleteOptionsById = useCallback((id) => {
    setOptions(items => items.filter(item => item.id !== id));
  }, [setOptions]);

  useEffect(() => {
    if (targetId) setCachedId(targetId);
  }, [targetId]);

  return (
    <Context.Provider
      value={{
        registerOption,
        updateOptionProps,
        getOptionById,
        deleteOptionsById,
        options,
        targetId,
        setTargetId,
        cachedId,
        setCachedId
      }}
    >
      {children}
    </Context.Provider>
  );
}