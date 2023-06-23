import React from 'react'
import { Button } from 'antd'
import { GenericProp } from '../../utils/constant/genericProp.constant';

interface CustomButtonProps extends GenericProp {
    text: string;
}

const CustomButton = ({ text, className, onClick = () => { }, ...rest }: CustomButtonProps) => {
    return (
        <Button
            onClick={onClick}
            className={`bg-[#1677FF] h-10 md:px-10 px-6 text-white font-bold hover:!text-gray-50 ${className || ''}`}
            {...rest}
        >{text}</Button>
    )
}

export default CustomButton