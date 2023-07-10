export enum ButtonTypeEnum {
  Submit = 'submit',
  Button = 'button',
}

export type ButtonProps = Partial<{
  submit: boolean;
  className: string;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>;
