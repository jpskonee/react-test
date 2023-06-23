import { Select } from 'antd';
import React from 'react';
import { GenericProp } from '../../utils/constant/genericProp.constant';

interface SelectComponentProps extends GenericProp {
    value: string;
    options: { value: string, label: string }[]
}

const SelectComponent = ({ onChange, options, value, className, placeholder = 'Please Select...', ...res }: SelectComponentProps) => (
    <Select
        allowClear
        showSearch
        placeholder={placeholder}
        value={value || undefined}
        className={`w-full ${className || ''}`}
        onChange={onChange}
        filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={options}
        {...res}
    />
);

export default SelectComponent;