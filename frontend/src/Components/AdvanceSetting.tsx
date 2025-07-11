import { useCalculatorContext } from "../Context/CalculatorContext";
import AdvancedSettingsToggle from "./AdvanceSettingToggle";
import CustomizeComponents from "./CustomizeComponents";

const AdvanceSetting = () => {
    const { isVisible, setIsVisible } = useCalculatorContext();

    const handleVisibilityBtn = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <AdvancedSettingsToggle isVisible={isVisible} handleToggle={handleVisibilityBtn} />
            <div className="w-[95%] mt-2 ">
                {isVisible && <CustomizeComponents />}
            </div>
        </div>
    );
};

export default AdvanceSetting;
