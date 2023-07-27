import { InputHTMLAttributes } from 'react';
import { Theme, themes } from '../../types/Theme';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage?: string;
  note?: string;
  theme: Theme;
}

export function Input({
  value,
  onChange,
  placeholder,
  errorMessage,
  note,
  theme,
  ...rest
}: Props) {
  return (
    <div>
      <input
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-sm focus:outline-none text-base font-primary px-2 py-1 w-full ${
          errorMessage
            ? 'focus-within:border-red-500 border-red-500'
            : `${themes.find((t) => t.value === theme)
                ?.focusWithinBorderClassName} border-gray-500`
        }`}
        {...rest}
      ></input>
      <div className="h-5">
        <p className="text-sm font-primary text-red-500 px-2">{errorMessage}</p>
        <p className="text-sm font-primary text-gray-400 px-2">{note}</p>
      </div>
    </div>
  );
}
