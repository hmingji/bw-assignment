export type Theme = 'blue' | 'orange';

export const themes: {
  value: Theme;
  bgClassName: string;
  hoverBgClassName: string;
  borderClassName: string;
  focusBorderClassName: string;
  focusWithinBorderClassName: string;
  textClassName: string;
  hoverTextClassName: string;
}[] = [
  {
    value: 'blue',
    bgClassName: 'bg-blue-500',
    hoverBgClassName: 'hover:bg-blue-600',
    borderClassName: 'border-blue-500',
    focusBorderClassName: 'focus:border-blue-500',
    focusWithinBorderClassName: 'focus-within:border-blue-500',
    textClassName: 'text-blue-500',
    hoverTextClassName: 'hover:text-blue-500',
  },
  {
    value: 'orange',
    bgClassName: 'bg-orange-500',
    hoverBgClassName: 'hover:bg-orange-600',
    borderClassName: 'border-orange-500',
    focusBorderClassName: 'focus:border-orange-500',
    focusWithinBorderClassName: 'focus-within:border-orange-500',
    textClassName: 'text-orange-500',
    hoverTextClassName: 'hover:text-orange-500',
  },
];
