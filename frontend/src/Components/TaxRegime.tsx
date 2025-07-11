import { useCalculatorContext } from "../Context/CalculatorContext";
const TaxRegime = () => {
    const { isNew, setIsNew } = useCalculatorContext()
    const handleNewBtn = (newVal: boolean) => {
        setIsNew(newVal)
    }
    return (
        <div className='flex gap-4 pt-3'>
            <p className='text-gray-600 text-sm font-semibold'>Tax Regime : </p>
            <button className={`w-[20%] cursor-pointer rounded-lg ${isNew ? "hover:bg-gray-300 bg-gray-100 " : "hover:bg-blue-800 bg-blue-600 text-white"} `} onClick={() => handleNewBtn(false)}> Old</button>
            <button className={`w-[20%] cursor-pointer  rounded-lg  ${!isNew ? "hover:bg-gray-300 bg-gray-100 " : "hover:bg-blue-800 bg-blue-600 text-white"} `} onClick={() => handleNewBtn(true)}>New</button>
        </div>
    )
}

export default TaxRegime
