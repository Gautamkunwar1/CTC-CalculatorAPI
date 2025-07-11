import { useCalculatorContext } from "../Context/CalculatorContext"
const CheckBox = () => {
    const { isEpfChecked, setIsEPFChecked, isTaxChecked,setIsTaxChecked } = useCalculatorContext();

    const handleEpfCheckbox = () => {
        setIsEPFChecked(!isEpfChecked);
    }

    const handleTaxCheckbox = () => {
        setIsTaxChecked(!isTaxChecked);
    }

    return (
        <div>
            <div className='flex gap-x-2 mt-4'>
                <input type="checkbox" name="epf" id="epf" checked={isEpfChecked} onChange={handleEpfCheckbox} />
                <span className='text-gray-600 text-sm' >EPF Applicable</span>
            </div>

            <div className='flex gap-x-2 mt-2'>
                <input type="checkbox" name="tax" id="tax" checked={isTaxChecked} onChange={handleTaxCheckbox} />
                <span className='text-gray-600 text-sm'>Professional Tax Applicable</span>
            </div>
        </div>
    )
}

export default CheckBox
