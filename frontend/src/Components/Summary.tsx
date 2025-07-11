import { useCalculatorContext } from "../Context/CalculatorContext"
import { formatPrice } from "../utils/formatPrice";


const Summary = () => {
    const { totalDeductions} = useCalculatorContext();
    return (
        <>
            <p className='text-gray-500 font-semibold px-5 py-1.5 '>Summary</p>
            <div className='pl-5'>
                <h1 className='font-semibold'>Summary</h1>
                <div className='flex justify-between pr-7 py-1 '><p >Total Deductions</p>
                    <p className='font-semibold text-red-600'>-{formatPrice(totalDeductions)}</p></div>
            </div>
            <hr className='ml-5 w-[92%] text-gray-400' />
        </>
    )
}

export default Summary
