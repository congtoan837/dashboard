import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
    control: (provided) => ({
        ...provided,
        background: "var(--cui-body-bg)", // Thiết lập màu nền trong suốt
        border: '1px solid #7289da', // Thiết lập màu viền
        boxShadow: 'none', // Không có bóng
        '&:hover': {
            border: '1px solid #7289da', // Viền khi hover
        },
    }),
    menu: (provided) => ({
        ...provided,
        background: "var(--cui-body-bg)", // Màu nền menu
        color: "var(--cui-body-color)", // Màu chữ trong menu
    }),
    option: (provided, {isFocused}) => ({
        ...provided,
        background: "var(--cui-body-bg)", // Màu nền khi hover
        color: "var(--cui-body-color)", // Màu chữ
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff', // Màu chữ cho giá trị đơn
    }),
};

const MultiSelectBox = ({ selectedItems, onChange, options }) => {
    const handleChange = (selected) => {
        onChange(selected);
    };

    return (
        <Select
            options={options}
            isMulti
            components={animatedComponents}
            value={selectedItems}
            onChange={handleChange}
            closeMenuOnSelect={false}
            classNamePrefix="coreui"
            styles={customStyles} // Áp dụng custom styles
        />
    );
};

export default MultiSelectBox;
