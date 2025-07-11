
export const calcESI = (value, type, isMonthly) => {
    if (isMonthly) {
        if (value <= 42000) {
            if (type === "employee") {
                return { label: value * 0.0175, color: "text-red-600" }
            } else if (type === "employer") {
                return { label: value * 0.0325, color: "text-red-600" }
            }
        } else {
            return { label: "Not Applicable", color: "text-gray-600" }
        }
    } else {
        if (value <= 504000) {
            if (type === "employee") {
                return { label: value  * 0.0175, color: "text-red-600" }
            } else if (type === "employer") {
                return { label: value  * 0.0325, color: "text-red-600" }
            }
        } else {
            return { label: "Not Applicable", color: "text-gray-600" }
        }
    }
    return { label: "Not Applicable", color: "text-gray-600" }
}

export const calculateIncomeTax = (income) => {
    const taxSlabs = [
        { min: 0, max: 400000, rate: 0 },
        { min: 400001, max: 800000, rate: 5 },
        { min: 800001, max: 1200000, rate: 10 },
        { min: 1200001, max: 1600000, rate: 15 },
        { min: 1600001, max: 2000000, rate: 20 },
        { min: 2000001, max: 2400000, rate: 25 },
        { min: 2400001, max: Infinity, rate: 30 },
    ]
    let totalTax = 0;
    let marginalRelief =0;
    const minLimit = 1200000;
    const maxLimit = 1275000;

    if(income>minLimit){
        for (const slab of taxSlabs) {
        if (income > slab.min - 1) {
            const taxInSlab = Math.min(income, slab.max) - (slab.min - 1);
            const totalTaxable = taxInSlab * slab.rate / 100;

            if(taxInSlab >0){
                totalTax += totalTaxable;
            }
        }
    }
    }
    

    if(income >minLimit && income<maxLimit){
        marginalRelief = income-minLimit;
        if(totalTax>marginalRelief){
            marginalRelief = totalTax-marginalRelief;
        }
        
    }
    let cessTax = (totalTax-marginalRelief)*0.04;
    let incomeTax = totalTax-marginalRelief+cessTax
    return {baseTax:totalTax,marginalRelief:marginalRelief,cess:cessTax,totalIncomeTax:incomeTax};
}

export const calcProfessionalTax = (value , isMonthly)=> {
    if (isMonthly) {
        if (value <= 21000) {
            return { label: "Not Applicable", color: "text-gray-600" }
        } else if (value > 21000 && value <= 30000) {
            return { label:100, color: "text-red-600" }
        } else {
            return { label: 200, color: "text-red-600" }
        }
    } else {
        if (value <= 252012) {
            return { label: "Not Applicable", color: "text-gray-600" }
        } else if (value > 252012 && value <= 360012) {
            return { label: 1200, color: "text-red-600" }
        } else {
            return { label: 2400, color: "text-red-600" }
        }
    }
}

export const getDeductionValue = (value) => {
    return typeof value === "string" ? 0 : value;
}

export const totalDeduction = (EPF,ESIEmployee,PFTax,IncomeTax) => {
    return (getDeductionValue(EPF)+getDeductionValue(ESIEmployee)+getDeductionValue(PFTax))+IncomeTax;
}

export const salaryBreakDown = (ctc,isMonthly,salaryComponent,isEPFApplicable,isPTaxApplicable)=>{
    const defaultComponent ={
    basicSalary:40,
    HRA:20,
    DA:10,
    LTA:5,
    SpecialAllowances:15,
    PerformanceBonus:10
}

    salaryComponent = { ...defaultComponent, ...salaryComponent };
    const basicSalary = (ctc*salaryComponent.basicSalary)/100;
    const HRA = (ctc*salaryComponent.HRA)/100;
    const DA = (ctc*salaryComponent.DA)/100;
    const LTA = (ctc*salaryComponent.LTA)/100;
    const SpecialAllowances = (ctc*salaryComponent.SpecialAllowances)/100;
    const PerformanceBonus = (ctc*salaryComponent.PerformanceBonus)/100;
    const grossSalary = basicSalary+HRA+DA+LTA+SpecialAllowances+PerformanceBonus;
    const standardDeduction = !isMonthly? 75000:6250;
    const taxableIncome = grossSalary-standardDeduction;
    const EPF = isEPFApplicable ? (basicSalary*0.12):"Not Applicable";
    const ESIEmployee = calcESI(grossSalary,"employee",isMonthly);
    const ESIEmployer = calcESI(grossSalary,"employer",isMonthly);
    const PFTax = isPTaxApplicable && calcProfessionalTax(grossSalary,isMonthly)
    const IncomeTax = isMonthly?calculateIncomeTax(taxableIncome*12):calculateIncomeTax(taxableIncome);
    const totalIncomeTax = !isMonthly?IncomeTax.totalIncomeTax:IncomeTax.totalIncomeTax/12;
    const pfTaxValue = isPTaxApplicable? (typeof PFTax?.label === "number" ? PFTax.label * 12 : Number(PFTax?.label) * 12 || 0): 0;
    const totalDeductions = totalDeduction(EPF,ESIEmployee.label,isPTaxApplicable?PFTax.label:0,totalIncomeTax);

    const netMonthlySalary = grossSalary - totalDeductions;
    const netAnnualSalary = grossSalary- totalDeduction(EPF,ESIEmployee.label,pfTaxValue,totalIncomeTax)



    const annualEquivalent = netMonthlySalary * 12;

    return{
        basicSalary,HRA,DA,LTA,PerformanceBonus,SpecialAllowances,standardDeduction,taxableIncome,EPF,ESIEmployee,ESIEmployer,PFTax,IncomeTax,totalDeductions,netMonthlySalary,netAnnualSalary,annualEquivalent,grossSalary
    }
}