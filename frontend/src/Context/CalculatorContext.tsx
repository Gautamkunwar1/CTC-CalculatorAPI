import React, { createContext, useContext, useEffect, useState } from 'react';

interface SalaryBreakOutType {
    basicSalary: number,
    HRA: number,
    DA: number,
    LTA: number,
    SpecialAllowances: number,
    PerformanceBonus: number
}


interface CalculatorContextType {
    ctc: number;
    setCtc: React.Dispatch<React.SetStateAction<number>>;
    apiResult: any;
    setApiResult: React.Dispatch<React.SetStateAction<any>>;
    salaryBreakOut: SalaryBreakOutType;
    setSalaryBreakOut: React.Dispatch<React.SetStateAction<SalaryBreakOutType>>;
    isMonthly: boolean;
    setIsMonthly: React.Dispatch<React.SetStateAction<boolean>>;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isAmountVisible: boolean;
    setIsAmountVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isEpfChecked: boolean;
    setIsEPFChecked: React.Dispatch<React.SetStateAction<boolean>>;
    isTaxChecked: boolean;
    setIsTaxChecked: React.Dispatch<React.SetStateAction<boolean>>;
    isNew: boolean;
    setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
    incomeTaxDetail: boolean;
    setIsIncomeTaxDetail: React.Dispatch<React.SetStateAction<boolean>>;
    basicSalary: number,
    HRA: number, DA: number,
    LTA: number,
    PerformanceBonus: number,
    SpecialAllowances: number,standardDeduction:number,grossSalary:number,
    TotalAmount: number, EPF: number, TaxableIncome: number,
    netMonthlySalary:number,netAnnualSalary:number,annualEquivalent:number,IncomeTax:any,
    ESIEmployee:any,ESIEmployer:any,PFTax:any,totalDeductions:number,
}

const defaultBreakout = {
    basicSalary: 40,
    HRA: 20,
    DA: 10,
    LTA: 5,
    SpecialAllowances: 15,
    PerformanceBonus: 10,
};

interface DataType {
    ctc:number,
    salaryComponent:SalaryBreakOutType,
    isMonthly:boolean,
    isEPFApplicable:boolean,
    isPTaxApplicable:boolean
}
const CalculatorContext = createContext<CalculatorContextType | null>(null);

export const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [ctc, setCtc] = useState<number>(0);
    const [apiResult, setApiResult] = useState<any | null>(null);
    const [salaryBreakOut, setSalaryBreakOut] = useState<SalaryBreakOutType>(defaultBreakout);
    const [isMonthly, setIsMonthly] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isAmountVisible, setIsAmountVisible] = useState<boolean>(false);
    const [isEpfChecked, setIsEPFChecked] = useState<boolean>(true);
    const [isTaxChecked, setIsTaxChecked] = useState<boolean>(true);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [incomeTaxDetail, setIsIncomeTaxDetail] = useState<boolean>(false);

    const getSalary = (value: number) => {
        return ctc * value / 100;
    }

    useEffect(()=>{
        const data = {
        ctc: ctc,
        salaryComponent:salaryBreakOut ,
        isMonthly,
        isEPFApplicable: isEpfChecked,
        isPTaxApplicable: isTaxChecked,
    }

    const fetchData = async (data:DataType) => {
        try {
            const res = await fetch("/api/calculateCTC", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("API fetch failed");

            const response = await res.json();
            const result = response.data;
            setApiResult(result);
            return result;
        } catch (error: unknown) {
            console.error("Fetch error:", error);
        }
    };
        fetchData(data);
    },[ctc,isMonthly,isEpfChecked,isTaxChecked,salaryBreakOut])
    
    
    const basicSalary = apiResult?.basicSalary ?? getSalary(salaryBreakOut.basicSalary);
    const HRA = apiResult?.HRA ?? getSalary(salaryBreakOut.HRA);
    const DA = apiResult?.DA ?? getSalary(salaryBreakOut.DA);
    const LTA = apiResult?.LTA ?? getSalary(salaryBreakOut.LTA);
    const SpecialAllowances = apiResult?.SpecialAllowances ?? getSalary(salaryBreakOut.SpecialAllowances);
    const PerformanceBonus = apiResult?.PerformanceBonus ?? getSalary(salaryBreakOut.PerformanceBonus);
    const EPF = apiResult?.EPF;
    const TotalAmount = Math.round(basicSalary + HRA + DA + LTA + SpecialAllowances + PerformanceBonus);
    const standardDeduction = isMonthly?6250:75000;
    const TaxableIncome = apiResult?.taxableIncome ;
    const netMonthlySalary = apiResult?.netMonthlySalary ;
    const netAnnualSalary = apiResult?.netAnnualSalary ;
    const annualEquivalent = apiResult?.annualEquivalent;
    const IncomeTax = apiResult?.IncomeTax;
    const ESIEmployee = apiResult?.ESIEmployee;
    const ESIEmployer = apiResult?.ESIEmployer;
    const PFTax = apiResult?.PFTax;
    const grossSalary = apiResult?.grossSalary;
    const totalDeductions = apiResult?.totalDeductions;

    return (
        <CalculatorContext.Provider
            value={{
                ctc,
                setCtc,
                apiResult,
                setApiResult,
                salaryBreakOut,
                setSalaryBreakOut,
                isMonthly,
                setIsMonthly,
                isVisible,
                setIsVisible,
                isAmountVisible,
                setIsAmountVisible,
                isEpfChecked,
                setIsEPFChecked,
                isTaxChecked,
                setIsTaxChecked,
                isNew,
                setIsNew,
                incomeTaxDetail,
                setIsIncomeTaxDetail,IncomeTax,PFTax,totalDeductions,grossSalary,
                basicSalary, HRA, DA, LTA, SpecialAllowances, PerformanceBonus, TotalAmount, standardDeduction,EPF, TaxableIncome,netMonthlySalary,netAnnualSalary,annualEquivalent,ESIEmployee,ESIEmployer
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

export const useCalculatorContext = () => {
    const context = useContext(CalculatorContext);
    if (!context) {
        throw new Error("useCalculatorContext must be used within CalculatorProvider");
    }
    return context;
};
