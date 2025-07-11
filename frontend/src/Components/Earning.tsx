import { useCalculatorContext } from "../Context/CalculatorContext";
import { formatPrice } from "../utils/formatPrice";
const Earning = () => {
    const {basicSalary,HRA,DA,LTA,PerformanceBonus,SpecialAllowances,standardDeduction,grossSalary,TaxableIncome} = useCalculatorContext();
    
    return (
        <>
        <p className='text-gray-500 font-semibold px-5 pt-4'>Earnings</p>
        <div className='pl-5 pt-2'>
            {/* Basic Salary */}
            <div className='flex justify-between pr-7 pb-1'><p >Basic Salary</p>
                <p className='font-semibold'>{formatPrice(basicSalary)}</p></div>

            {/* HRA */}
            <div className='flex justify-between pr-7 pb-1'><p >HRA</p>
                <p className='font-semibold'>{formatPrice(HRA)}</p></div>

            {/* DA */}
            <div className='flex justify-between pr-7 pb-1'><p >DA</p>
                <p className='font-semibold'>{formatPrice(DA)}</p></div>

            {/* LTA */}
            <div className='flex justify-between pr-7 pb-1'><p >LTA</p>
                <p className='font-semibold'>{formatPrice(LTA)}</p></div>

            {/* Special Allowances */}
            <div className='flex justify-between pr-7 pb-1'><p >Special Allowance</p>
                <p className='font-semibold'>{formatPrice(SpecialAllowances)}</p></div>

            {/* Performance Bonus */}
            <div className='flex justify-between pr-7 pb-1'><p >Performance Bonus</p>
                <p className='font-semibold'>{formatPrice(PerformanceBonus)}</p></div>

            <hr className='w-[95%] text-gray-400' />

            {/* Gross Salary */}
            <div className='flex justify-between pr-7 py-1 font-semibold'><p >Gross Salary</p>
                <p>{formatPrice(grossSalary)}</p></div>

            {/* Standard Deduction */}
            <div className='flex justify-between pr-7 py-1 '><p >Standard Deduction</p>
                <p className='text-red-600 font-semibold'>-{formatPrice(standardDeduction)}</p></div>

            {/* Taxable Income */}
            <div className='flex justify-between pr-7 py-1 text-sm'><p >Taxable Income (before other deductions)</p>
                <p className='font-semibold'>{formatPrice(TaxableIncome)}</p></div>
            <hr className='w-[95%] text-gray-400' />
            
        </div>
        </>
    )
}

export default Earning
