import { useCalculatorContext } from "../Context/CalculatorContext";
import { formatPrice } from "../utils/formatPrice";


const NetSalary = () => {
    const{isNew,isMonthly,annualEquivalent,netAnnualSalary,netMonthlySalary} =useCalculatorContext();
    return (
        <>
            <h1 className='font-semibold text-xl p-5'>Salary Breakdown under <span>{isNew ? "New Tax Regime(2025-2026)" : "Old Tax Regime"} </span></h1>

            <div className='bg-white w-[85%] mx-auto p-3 text-xl font-semibold'>
                <div className='flex justify-between pb-2'><p>{isMonthly ? "Net Annual Equivalent" : "Net Monthly Equivalent"} </p>
                    <p className='text-[#0ba747]'>{isMonthly ? formatPrice(annualEquivalent) : formatPrice(netAnnualSalary / 12)}</p></div>
                <hr className='text-gray-200' />
                <div className='flex justify-between'><p>{isMonthly ? "Net Monthly Salary" : "Net Annual Salary"} </p>
                    <p className='text-[#0ba747]'>{isMonthly ? formatPrice(netMonthlySalary) : formatPrice(netAnnualSalary)}</p></div>
            </div>

        </>
    )
}

export default NetSalary
