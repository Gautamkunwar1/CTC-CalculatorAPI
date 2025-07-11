import { useCalculatorContext } from "../Context/CalculatorContext"
import CTCBreakup from "./CTCBreakup";
import Deduction from "./Deduction";
import Earning from "./Earning";
import NetSalary from "./NetSalary";
import Summary from "./Summary";


const SalaryBreakDown = () => {
    const { ctc } = useCalculatorContext();

    
    return (
        <div className={`mt-5 w-full md:w-[37%] rounded-md  ${ctc > 0 ? 'bg-gray-100' : 'bg-white'}`}>
            {ctc > 0 &&
                <>
                    <NetSalary/>
                    <Earning />
                    <Deduction/>
                    <Summary/>
                    <CTCBreakup/>
                </>}
        </div>
    )
}

export default SalaryBreakDown
