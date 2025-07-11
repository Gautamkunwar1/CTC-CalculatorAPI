import { LuDownload } from "react-icons/lu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalaryPdfDocument from "./SalaryPdf";
import { useCalculatorContext } from "../Context/CalculatorContext";
import type { SalaryBreakoutType } from "./SalaryPdf";
import SalaryExcel from "./SalaryExcel";


const DownloadButton = () => {

    const { ctc, basicSalary, HRA, DA, LTA, PerformanceBonus, SpecialAllowances, EPF, IncomeTax, ESIEmployee, PFTax, totalDeductions, isMonthly, netAnnualSalary, netMonthlySalary } = useCalculatorContext();

    const data: SalaryBreakoutType = {
        ctc: Math.round(ctc),
        Earning: [
            { head: "Basic Salary", value: Math.round(basicSalary) },
            { head: "HRA", value: Math.round(HRA) },
            { head: "DA", value: Math.round(DA) },
            { head: "LTA", value: Math.round(LTA) },
            { head: "Special Allowances", value: Math.round(SpecialAllowances) },
            { head: "Performance Bonus", value: Math.round(PerformanceBonus) },
            { head: "Gross Salary", value: Math.round(ctc) }
        ],
        Deduction: [
            { head: "EPF", value: typeof EPF === "number" ? Math.round(EPF) : (isNaN(EPF)) ? 0 : Math.round(EPF) },
            { head: "Professional Tax", value: typeof PFTax === "number" ? PFTax : (isNaN(PFTax?.label) ? 0 : PFTax.label) },
            { head: "ESI", value: typeof ESIEmployee === "number" ? Math.round(ESIEmployee) : (isNaN(ESIEmployee?.label) ? 0 : Math.round(ESIEmployee.label)) },
            { head: "Income Tax", value: IncomeTax?.totalIncomeTax ?? 0 },
        ],

        Summary: [
            { head: "Total Deduction", value: Math.round(totalDeductions) },
            { head: !isMonthly ? "Net Annual Salary" : "Net Monthly Salary", value: !isMonthly ? Math.round(netAnnualSalary) : Math.round(netMonthlySalary) },
        ],
        isMonthly: isMonthly,
    }


    return (
        <div className="bg-white flex flex-col sm:flex-row gap-4 sm:justify-end justify-center p-4 w-full">
            <PDFDownloadLink
                document={<SalaryPdfDocument {...data} />}
                fileName="CTC_SalaryBreakdown.pdf"
            >
                <button className="flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-900 cursor-pointer text-white p-2 rounded-md w-full sm:w-auto">
                    <LuDownload />
                    Download PDF
                </button>
            </PDFDownloadLink>

            <div className="w-full sm:w-auto">
                <SalaryExcel {...data} />
            </div>
        </div>

    )
}

export default DownloadButton;

