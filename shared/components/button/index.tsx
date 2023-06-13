import { Button as AButton } from 'antd';
import React from 'react';
import { Props } from './button.props';

const Button: React.FC<Props> = ({
    type = 'primary',
    text,
    htmlType = 'button',
    disabled = false,
    className,
    block = false,
    onClick,
    size = 'middle',
    icon,
}) => {
    const getType = (): any => {
        if (type === 'default')
            return {
                type: 'default'
            };
        if (type === 'primary')
            return {
                type: 'primary'
            };
        if (type === 'link')
            return {
                type: 'link'
            };
        if (type === 'danger')
            return {
                type: 'primary',
                danger: true
            };
        if (type === 'secondary')
            return {
                className: 'ant-btn-secondary'
            };
        if (type === 'success')
            return {
                className: 'ant-btn-success'
            };
        if (type === 'warning')
            return {
                className: 'ant-btn-warning'
            };
        if (type === 'ghost')
            return {
                ghost: true
            };
    };
    return (
        <AButton
            {...getType()}
            onClick={onClick}
            htmlType={htmlType}
            disabled={disabled}
            className={`${getType()?.className ? getType()?.className : ''
                } ${className}`}
            block={block}
            size={size}
            icon={icon}
        >
            {text}
        </AButton>
    );
};

export default Button;