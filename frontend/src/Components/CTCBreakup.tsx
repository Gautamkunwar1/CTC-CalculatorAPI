import { useCalculatorContext } from "../Context/CalculatorContext";
import { formatPrice } from "../utils/formatPrice";

const CTCBreakup = () => {
    const {ctc,isEpfChecked,ESIEmployer,EPF}=useCalculatorContext();
    return (
        <>
            <p className='text-gray-500 font-semibold px-5 py-1.5 '>Cost to Company Breakup</p>
                    <div className='pl-5'>
                        {/* Gross Salary */}
                        <div className='flex justify-between pr-7 py-1 '><p >Gross Salary</p>
                            <p className='font-semibold'>{formatPrice(ctc)}</p></div>

                        {/* Employer EPF Contribution */}
                        {isEpfChecked && <div className='flex justify-between pr-7 py-1'><p >Employer EPF Contribution</p>
                            <p className='font-semibold'>{formatPrice(EPF)}</p></div>}

                        {/* Employer ESI Contribution */}
                        {ESIEmployer.label !== "Not Applicable" && <div className='flex justify-between pr-7 py-1 '><p >Employer ESI Contribution</p>
                            <p className='font-semibold'>{formatPrice(ESIEmployer.label)}</p></div>}
                    </div>
        </> 
    )
}

export default CTCBreakup
