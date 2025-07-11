import { useCalculatorContext } from "../Context/CalculatorContext";
import ComponentInputRow from "./ComponentInputRow";
import InputModeToggle from "./InputToggleMode";
import TaxRegime from "./TaxRegime";
import CheckBox from "./CheckBox";
import SelectState from "./SelectState";

const CustomizeComponents = () => {
    const {TotalAmount,ctc,isMonthly,salaryBreakOut,setSalaryBreakOut,basicSalary,HRA,DA,LTA,SpecialAllowances,PerformanceBonus,isAmountVisible} = useCalculatorContext();

    const totalPercent =(+salaryBreakOut.basicSalary +(+salaryBreakOut.HRA) +(+salaryBreakOut.DA) +(+salaryBreakOut.LTA) +(+salaryBreakOut.SpecialAllowances) +(+salaryBreakOut.PerformanceBonus));

    const handleSalaryChange = (name: string, value: number | "") => {
        if (value === "") {
            setSalaryBreakOut((prev) => ({ ...prev, [name]: "" }));
            return;
        }
        const percentValue = isAmountVisible && ctc ? (Number(value) / ctc) * 100 : Number(value);
        setSalaryBreakOut((prev) => ({...prev,[name]: percentValue,}));
    };

    return (
        <div className="h-[250px] overflow-auto">
            <h3 className="font-semibold text-gray-800 py-4">Customize Components</h3>

            {!isAmountVisible && totalPercent !== 100 && (
                <div className="bg-[rgb(247,232,232)] text-sm text-[#dd2626] border-1 border-[#dd262636] rounded-sm p-2">
                    Total percentage should be 100%. Current total: {totalPercent}%
                </div>
            )}

            {isAmountVisible && TotalAmount > ctc && (
                <div className="bg-[rgb(247,232,232)] text-sm text-[#dd2626] border-1 border-[#dd262636] rounded-sm p-2">
                    Total amount cannot exceed {isMonthly ? "monthly" : "yearly"} CTC of {ctc}
                </div>
            )}

            <div className="flex justify-between pt-3 pr-15">
                <p>Component</p>
                <p>Percentage</p>
                <p>Amount</p>
            </div>

            <InputModeToggle />

            <ComponentInputRow name="basicSalary" label="Basic Salary ?" value={isAmountVisible ? Math.round(basicSalary) : salaryBreakOut.basicSalary} onChange={handleSalaryChange}/>

            <ComponentInputRow name="HRA" label="HRA ?" value={isAmountVisible ? Math.round(HRA) : salaryBreakOut.HRA}
                onChange={handleSalaryChange} />

            <ComponentInputRow name="DA" label="DA ?" value={isAmountVisible ? Math.round(DA) : salaryBreakOut.DA}
                onChange={handleSalaryChange}/>

            <ComponentInputRow name="LTA" label="LTA ?" value={isAmountVisible ? Math.round(LTA) : salaryBreakOut.LTA}
                onChange={handleSalaryChange}/>

            <ComponentInputRow name="SpecialAllowances" label="Special Allowance ?" value={isAmountVisible ? Math.round(SpecialAllowances) : salaryBreakOut.SpecialAllowances} onChange={handleSalaryChange}/>
            
            <ComponentInputRow name="PerformanceBonus" label="Performance Bonus ?" value={isAmountVisible ? Math.round(PerformanceBonus) : salaryBreakOut.PerformanceBonus} onChange={handleSalaryChange}/>

            {!isAmountVisible && totalPercent !== 100 && (
                <p className="text-red-500 py-1 text-sm">
                    Total percentage should be 100%. Current total: {totalPercent}%
                </p>
            )}
            {isAmountVisible && TotalAmount > ctc && (
                <p className="text-red-500 py-1 text-sm">
                    Total amount cannot exceed {isMonthly ? "monthly" : "yearly"} CTC of {ctc}
                </p>
            )}

            <TaxRegime />
            <CheckBox />
            <SelectState />
        </div>
    );
};

export default CustomizeComponents;
