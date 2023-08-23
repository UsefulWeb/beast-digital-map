import classnames from 'classnames';
import S from './Button.module.scss';
import React, {PropsWithChildren} from "react";

export interface ButtonProps extends PropsWithChildren {
    to?: string,
    as?: React.FC<any>,
    className?: string,
    type?: string,
    onClick?: React.MouseEventHandler;
}

export interface ButtonComponentProps {
    className: string
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        as = 'button',
        type,
        ...rest
    } = props;
    const Component = as;
    const typeClass = S['type_' + type];
    return <Component {...rest} className={classnames(className, S.container, typeClass)} />;
}