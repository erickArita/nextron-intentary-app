import React, { useState } from "react";
import { Input } from 'antd'

interface PriceValue {
    number?: number;
}

interface PriceInputProps {
    value?: PriceValue;
    onChange?: (value: PriceValue) => void;
}

const InputNumber: React.FC<PriceInputProps> = ({ value = {}, onChange },{name}) => {
    const [number, setNumber] = useState(0);

    const triggerChange = (changedValue: { number?: number; }) => {
        if (onChange) {
            onChange({ number, ...value, ...changedValue });
        }
    };

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(newNumber)) {
            return;
        }
        setNumber(newNumber);
        triggerChange({ number: newNumber });

    };

    return (
        <>

            <Input
            name={`${name}`}
                type="text"
                value={value.number || number}
                onChange={onNumberChange}
                style={{ width: 100 }}
            />

        </>
    );
};

export default InputNumber;