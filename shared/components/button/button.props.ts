import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { ReactNode } from 'react';

export type Props = {
  type?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'link'
    | 'ghost';
  text?: string;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  className?: string;
  block?: boolean;
  size?: SizeType;
  icon?: ReactNode;
};
