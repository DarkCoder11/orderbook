import React from 'react';

export type LinkProps = {
  to: string;
  blank?: boolean;
  queryKey?: string;
  disabled?: boolean;
  className?: string;
  queryValue?: string;
  onClick?: () => void;
  activeClassName?: string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};
