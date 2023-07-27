import { useState, MouseEvent } from 'react';
import { ChevronDownIcon } from './Icons/ChevronDownIcon';
import { Theme, themes } from '../../types/Theme';

interface Props {
  value: string | undefined;
  options: string[];
  updateOption: (o: string) => void;
  errorMessage?: string;
  theme: Theme;
  disabled?: boolean;
}

export function Dropdown({
  value,
  options,
  updateOption,
  errorMessage,
  theme,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function optionOnClick(o: string) {
    updateOption(o);
    setOpen(!open);
  }

  function toggleDropdown(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setOpen(!open);
  }

  const themeStyles = themes.find((t) => t.value === theme);
  return (
    <div className="w-full h-full relative">
      <button
        className={`border rounded-sm flex justify-between items-center font-primary text-base px-2 py-1 w-full ${
          value ? 'text-gray-500' : 'text-black'
        } ${
          open
            ? themeStyles?.borderClassName
            : errorMessage
            ? 'border-red-500'
            : 'border-gray-500'
        }`}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span>{value ? value : '-'}</span>
        {!disabled && (
          <span
            className={`transition-transform transform ${
              open ? 'rotate-180' : ''
            }`}
          >
            <ChevronDownIcon />
          </span>
        )}
      </button>
      {errorMessage && (
        <p className="text-red-500 font-primary text-sm">{errorMessage}</p>
      )}
      <ul
        className={`absolute left-0 top-[38px] p-1 w-full border rounded-sm bg-white ${themeStyles?.borderClassName} ${
          open ? 'block' : 'hidden'
        }`}
      >
        {options.map((o) => (
          <li
            key={o}
            className={`px-2 py-1 cursor-pointer rounded-sm font-primary text-base ${themeStyles?.hoverTextClassName}`}
            onClick={() => optionOnClick(o)}
          >
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
