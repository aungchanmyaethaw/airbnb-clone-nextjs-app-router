import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export default function Counter({
  title,
  subtitle,
  value,
  onChange,
}: CounterProps) {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onSubtract = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };

  return (
    <article className="flex items-center justify-between py-2">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <h4 className="text-neutral-600">{subtitle}</h4>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSubtract}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus />
        </button>
        <span>{value}</span>
        <button
          onClick={onAdd}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </button>
      </div>
    </article>
  );
}
