import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Theme, themes } from '../../types/Theme';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme: Theme;
}

export function Button({ children, theme, disabled = false, ...rest }: Props) {
  const themeStyles = themes.find((t) => t.value === theme);
  return (
    <button
      className={`rounded-sm w-full px-4 py-1 ${
        disabled
          ? 'bg-slate-400'
          : `${themeStyles?.bgClassName} ${themeStyles?.hoverBgClassName}`
      }`}
      disabled={disabled}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
