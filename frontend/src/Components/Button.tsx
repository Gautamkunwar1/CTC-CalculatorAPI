import React from 'react';
import { useCalculatorContext } from '../Context/CalculatorContext';

const Button: React.FC = () => {
    const { ctc, setCtc, isMonthly, setIsMonthly } = useCalculatorContext();

    const handleSwitchBtn = (monthly: boolean) => {
        if (isMonthly !== monthly) {
            setCtc(monthly ? (ctc / 12) : (ctc * 12));
            setIsMonthly(monthly);
        }
    };

    return (
        <div className='flex gap-2 mt-2'>
            <button className={`p-2 w-[47%] cursor-pointer ${isMonthly ? 'bg-blue-600 hover:bg-blue-800 text-white rounded-lg' : 'bg-gray-100 hover:bg-gray-300 rounded-lg'}`} onClick={() => handleSwitchBtn(true)}>
                Monthly
            </button>
            <button className={`p-2 w-[47%] cursor-pointer ${!isMonthly ? 'bg-blue-600 hover:bg-blue-800 text-white rounded-lg' : 'bg-gray-100 hover:bg-gray-300 rounded-lg'}`} onClick={() => handleSwitchBtn(false)}>
                Yearly
            </button>
        </div>
    );
};

export default Button;
