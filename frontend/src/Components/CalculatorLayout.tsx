import Header from "./Header";
import CTCInputBox from "./CTCInputBox";
import Button from "./Button";
import AdvanceSetting from "./AdvanceSetting";
import SalaryBreakDown from "./SalaryBreakDown";
import DownloadButton from "./DownloadButton";

const CalculatorLayout = () => {

    return (
        <div className="bg-blue-100 py-5 px-4 md:px-0 min-h-screen">
            <Header />
            <div className='w-full md:w-[85%] mx-auto bg-white '>
            <div className='flex flex-col md:flex-row mt-3 gap-4'>
                <div className='shadow-gray-300 mt-5 p-5 pl-4 md:pl-8 w-full md:w-[60%]'>
                <h2 className='text-xl '>Cost to Company (CTC)</h2>
                <CTCInputBox/>
                <Button />
                <AdvanceSetting/>
                </div>

            <SalaryBreakDown/>
            </div>
            <DownloadButton/>
        </div>
        </div>
    );
};

export default CalculatorLayout;
