import React, { ReactNode } from 'react';

export type Props = {
  type?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'error'
    | 'success'
    | 'warning'
    | 'ghost';
position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left' ;
children?: ReactNode;
size?: 'lg' | 'md' | 'sm' | 'xs';
};
