import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (category: string) => void;
}

export default function CategoryInput({
  icon: Icon,
  selected,
  label,
  onClick,
}: CategoryInputProps) {
  return (
    <li
      className={`
  rounded-xl
  border-2
  p-4
  flex
  flex-col
  gap-3
  hover:border-black
  transition
  cursor-pointer
  ${selected ? "border-black" : "border-neutral-200"}
`}
      onClick={() => onClick(label)}
    >
      <Icon size={32} />
      <span className="font-semibold">{label}</span>
    </li>
  );
}
