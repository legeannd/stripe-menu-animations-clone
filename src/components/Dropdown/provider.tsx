import React, { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

interface OptionsContextData {
  registerOption({ id, optionsDimensions, optionCenterX, WrappedContent, backgroundHeight }: OptionsProps): void,
  updateOptionProps(id: number, props: OptionsProps): void,
  getOptionById(id: number): OptionsProps | undefined,
  deleteOptionsById(id: number): void,
  options: Array<OptionsProps>,
  targetId: number | null,
  setTargetId: Dispatch<SetStateAction<number | null>>,
  cachedId: number | null,
  setCachedId: Dispatch<SetStateAction<number | null>>,
}

export interface OptionsProps {
  id?: number;
  optionsDimensions?: DOMRect | undefined;
  optionCenterX?: number;
  WrappedContent?: () => JSX.Element;
  backgroundHeight?: number;
}

export const Context = createContext<OptionsContextData>({} as OptionsContextData);


export const DropdownProvider: React.FC = ({ children }) => {
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [cachedId, setCachedId] = useState<number | null>(null);

  const registerOption = useCallback(({
    id, 
    optionsDimensions,
    optionCenterX,
    WrappedContent,
    backgroundHeight,
  }) => {
    const optionsReceived: OptionsProps = {
      id,
      optionsDimensions,
      optionCenterX,
      WrappedContent,
      backgroundHeight
    }

    setOptions(items => [
      ...items,
      optionsReceived
    ])
  }, [setOptions]);

  const updateOptionProps = useCallback((optionId: number, props: OptionsProps) => {
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

  const getOptionById = useCallback((id: number) => options.find(item => item.id === id), [options]);

  const deleteOptionsById = useCallback((id: number) => {
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