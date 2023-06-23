import React from 'react';
import { Steps } from 'antd';
import { GenericProp } from '../../utils/constant/genericProp.constant';

export interface StepperItemsProp {
    title?: string;
    description?: string;
    content: JSX.Element;
}

interface StepperComponentProps extends GenericProp {
    current: number;
    items: StepperItemsProp[],
    direction?: "vertical" | "horizontal"
    type?: "navigation" | "default" | "inline"
}

const StepperComponent = ({ current, items, className, type = "navigation", direction = "vertical", ...rest }: StepperComponentProps): JSX.Element => (
    <Steps
        type={type}
        current={current}
        items={items}
        responsive={false}
        className={`w-full p-4 ${className || ''}`}
        {...rest}
    />
);

export default StepperComponent;