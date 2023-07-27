import { InputHTMLAttributes, useState } from 'react';
import { Theme, themes } from '../../types/Theme';
import { ShowIcon } from './Icons/ShowIcon';
import { HideIcon } from './Icons/HideIcon';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage?: string;
  theme: Theme;
}

export function PasswordInput({
  value,
  onChange,
  placeholder,
  errorMessage,
  theme,
  ...rest
}: Props) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div
        className={`border rounded-sm focus:outline-none text-base font-primary px-2 py-1 w-full flex items-center ${
          errorMessage
            ? 'focus-within:border-red-500 border-red-500'
            : `${themes.find((t) => t.value === theme)
                ?.focusWithinBorderClassName} border-gray-500`
        }`}
      >
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full focus:outline-none`}
          {...rest}
        ></input>
        <span
          className="hover:cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? <HideIcon /> : <ShowIcon />}
        </span>
      </div>
      <div className="h-5">
        <p className="text-sm font-primary text-red-600 px-2">{errorMessage}</p>
      </div>
    </>
  );
}
