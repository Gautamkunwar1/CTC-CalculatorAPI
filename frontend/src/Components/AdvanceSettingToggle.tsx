import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AdvancedSettingsToggle = ({ isVisible, handleToggle }: { isVisible: boolean; handleToggle: () => void }) => (
    <div className="flex justify-between w-[95%] mt-5">
        <h3 className="font-semibold text-gray-800">Advanced Settings</h3>
        <p className="text-blue-800 cursor-pointer flex items-center" onClick={handleToggle}>
            {isVisible ? <>Hide <IoIosArrowUp /></> : <>Show <IoIosArrowDown /></>}
        </p>
    </div>
);

export default AdvancedSettingsToggle;
