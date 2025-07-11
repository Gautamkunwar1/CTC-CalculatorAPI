import { useCalculatorContext } from "../Context/CalculatorContext";
import { formatPrice } from "../utils/formatPrice";

const Deduction = () => {
    const { isEpfChecked, EPF, ESIEmployee, ESIEmployer, PFTax, isTaxChecked, isMonthly, incomeTaxDetail, IncomeTax, setIsIncomeTaxDetail } = useCalculatorContext();
    const incomeTax = IncomeTax;
    const handleIncomeTaxDetail = () => {
        setIsIncomeTaxDetail(!incomeTaxDetail);
    }
    const taxClass = `text-gray-600 ${isTaxChecked ? PFTax.color : ''}`;
    const taxValue = isTaxChecked && typeof PFTax.label === "number"? formatPrice(-PFTax.label): "Not Applicable";
    return (
        <>
            <p className='text-gray-500 font-semibold px-5 py-1.5 '>Deductions</p>
            <div className='pl-5'>
                {/* EPF */}
                <div className='flex justify-between pr-7 pb-1'><p >EPF(Employee)</p>
                    <p className={` ${isEpfChecked ? "text-red-600" : "text-gray-600"}  `}>{isEpfChecked ? formatPrice(-EPF) : "Not Opted"}</p></div>

                {isEpfChecked &&
                    <div className='flex justify-between pr-7 pb-1 text-sm font-normal'><p >EPF(Employer)</p>
                        <p>{formatPrice(EPF)}</p></div>
                }

                {/* ESI */}
                <div className='flex justify-between pr-7 pb-1'><p >ESI(Employee)</p>
                    <p className={` ${ESIEmployee.color}`}>-{formatPrice(ESIEmployee.label)}</p></div>

                {ESIEmployee.label !== "Not Applicable" &&
                    <div className='flex justify-between pr-7 pb-1 text-sm font-normal'><p >ESI(Employer)</p>
                        <p className="text-gray-600 ">{formatPrice(ESIEmployer.label)}</p></div>
                }

                {/* Professional Tax */}
                <div className='flex justify-between pr-7 pb-1'><p >Professional Tax</p>
                
                    <p className={taxClass}>{taxValue}</p>

                </div>

                {/* Income Tax */}
                <div className='flex justify-between pr-7 pb-1'><p >Income Tax <span className='text-sm text-blue-500 ml-2 cursor-pointer' onClick={handleIncomeTaxDetail}>{incomeTaxDetail ? "Hide Details" : "Show Details"}</span></p>
                    <p className='font-semibold text-red-600'>-{!isMonthly ? formatPrice(incomeTax.totalIncomeTax) : formatPrice((incomeTax.totalIncomeTax) / 12)}</p></div>
                <div className={`${incomeTaxDetail ? "block" : "hidden"}`}>
                    <div className='flex justify-between pr-7 ml-7 pb-1 text-gray-600 text-sm'><p >Base Tax</p>
                        <p className='text-red-600'>-{!isMonthly ? formatPrice(incomeTax.baseTax) : formatPrice(incomeTax.baseTax / 12)}</p></div>
                    {incomeTax.marginalRelief !== 0 && incomeTax.marginalRelief ? <div className='flex justify-between pr-7 ml-7 pb-1 text-gray-600 text-sm'><p >Marginal Relief</p>
                        <p className='text-green-700'>+{!isMonthly ? formatPrice(incomeTax.marginalRelief) : formatPrice(incomeTax.marginalRelief / 12)}</p></div> : ""}
                    <div className='flex justify-between pr-7 ml-7 pb-1 text-gray-600 text-sm'><p >Health & Education Cess</p>
                        <p className='text-red-600'>-{!isMonthly ? formatPrice(incomeTax.cess) : formatPrice(incomeTax.cess / 12)}</p></div>
                </div>
                <hr className='w-[95%] text-gray-400' />
            </div>
        </>
    )
}

export default Deduction
