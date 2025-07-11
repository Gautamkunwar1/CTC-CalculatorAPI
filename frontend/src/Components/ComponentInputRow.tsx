import type { FC } from "react";

export interface RowType{
    name:string,
    label:string,
    value:number|string,
    onChange:(name:string,value:number|"")=>void,
}

const ComponentInputRow:FC<RowType> = ({name,label,value,onChange}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberValue = Number(value);
        onChange(name, value === "" ? "" : isNaN(numberValue) ? 0 : numberValue);
    };

    return (
        <div className="flex justify-between pt-3 pb-1 pr-5">
            <p className="text-gray-600 text-sm">{label}</p>
            <input type="text" name={name} className="shadow-sm rounded-2xl pl-2 w-[50%]" value={value} onChange={handleInputChange}
            />
        </div>
    );
};

export default ComponentInputRow;
