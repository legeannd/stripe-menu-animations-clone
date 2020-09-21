import React from 'react';

interface DropdownProps {
  name: string;
  content: () => JSX.Element;
}

export function DropdownOption({ name, content: Content }: DropdownProps) {
  return (
    <button>{name}</button>
  )
}