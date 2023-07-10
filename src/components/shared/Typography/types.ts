type Align = 'right' | 'left' | 'center' | 'justify';

type Variant = 'text' | 'heading' | 'button' | 'label' | 'link';

type TypoType = 'small' | 'large' | 'extra' | 'medium' | 'semibold' | 'regular';

export type TypographyProps = Partial<{
  align: Align;
  type: TypoType;
  variant: Variant;
  className: string;
  capitalize: boolean;
  onClick: () => void;
  children: string | React.ReactNode;
  tagName: keyof JSX.IntrinsicElements;
}>;
