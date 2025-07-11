import React from 'react';
import { formatValue } from '../utils/formatPrice';
import { useCalculatorContext } from '../Context/CalculatorContext';

const CTCInputBox: React.FC = () => {
    const { ctc, setCtc, isMonthly } = useCalculatorContext();

    const handleCTCInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericString = e.target.value.replace(/\D/g, '');
        const numericValue = Number(numericString);
        setCtc(isNaN(numericValue) ? 0 : numericValue);
    };

    return (
        <>
            <div className='bg-white shadow-md w-[95%] flex items-center px-5 '>
                <span className='text-gray-400'>₹</span>
                <input
                    type='text'
                    className= "p-3 w-[80%] md:w-full outline-0"
                    value={formatValue(Math.round(ctc))}
                    onChange={handleCTCInput}
                    aria-label='Enter your CTC'
                />
                <span className='text-gray-400 pl-10'>
                    {isMonthly ? 'monthly' : 'yearly'}
                </span>
            </div>
            <p className='text-sm text-gray-400 mt-3'>
                Enter your {isMonthly ? 'monthly' : 'yearly'} Cost to Company (CTC) amount in Indian Rupees
            </p>
            
        </>
    );
};

export default CTCInputBox;
