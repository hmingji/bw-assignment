import { useContext, useState } from 'react';
import { Theme, themes } from '../../types/Theme';
import { CheckIcon } from './Icons/CheckIcon';
import { ThemeIcon } from './Icons/ThemeIcon';
import { ThemeContext } from '../../App';

interface Props {
  value: Theme;
  updateValue: (t: Theme) => void;
  mode: 'web' | 'mobile';
}

export function ThemeSelection({ value, updateValue, mode }: Props) {
  const [open, setOpen] = useState(false);
  const theme = useContext(ThemeContext);
  return (
    <div className={`relative ${mode === 'web' ? 'w-24 h-24' : 'w-4 h-4'}`}>
      <span
        className={`absolute right-0 cursor-pointer ${
          mode === 'web'
            ? 'bottom-0 p-2 rounded-full border border-gray-500 shadow-md hover:bg-slate-100'
            : 'top-0'
        } ${themes.find((t) => t.value === theme?.value)?.textClassName}`}
        onClick={() => setOpen(!open)}
      >
        <ThemeIcon />
      </span>
      <ul
        className={`absolute right-0 border border-gray-500 shadow-md rounded-sm flex gap-2 p-2 bg-white ${
          open ? 'block' : 'hidden'
        } ${mode === 'web' ? 'top-0' : 'top-10'}`}
      >
        {themes.map((t) => (
          <li
            key={t.value}
            className="cursor-pointer"
          >
            <div
              className={`rounded-full w-8 h-8 ${t.bgClassName} flex justify-center items-center`}
              onClick={() => updateValue(t.value)}
            >
              {value === t.value && <CheckIcon />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
