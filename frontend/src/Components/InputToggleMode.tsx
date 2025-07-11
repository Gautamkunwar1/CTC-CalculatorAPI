import { useCalculatorContext } from "../Context/CalculatorContext";

const InputModeToggle = () => {
    const { isAmountVisible, setIsAmountVisible } = useCalculatorContext();

    return (
        <div className='flex gap-4 pt-3'>
            <p>Input Mode :</p>
            <button className={`w-[25%] rounded-lg p-0.5 ${!isAmountVisible ? "bg-blue-600 text-white hover:bg-blue-800" : "bg-gray-100 hover:bg-gray-300"}`}
            onClick={() => setIsAmountVisible(false)}>Percentage</button>
            <button className={`w-[25%] rounded-lg ${isAmountVisible ? "bg-blue-600 text-white hover:bg-blue-800" : "bg-gray-100 hover:bg-gray-300"}`}
            onClick={() => setIsAmountVisible(true)}>Amount</button>
        </div>
    );
};

export default InputModeToggle;
