import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { SalaryBreakoutType } from './SalaryPdf';
import type { FC } from 'react';
import { LuDownload } from 'react-icons/lu';


const SalaryExcel: FC<SalaryBreakoutType> = ({ ctc, Earning, Deduction, Summary }) => {
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        const titleStyle = {
            font: { bold: true }
        }

        worksheet.mergeCells("A1", "B1");
        const title = worksheet.getCell("A1");
        title.alignment ={
            horizontal:"center"
        }
        worksheet.columns = [
            {width:40},
            {width:30}
        ]
        title.value = "CTC CALCULATOR - SALARY BREAKDOWN";
        Object.assign(title, titleStyle)

        worksheet.getCell("A3").value = "Total CTC";
        worksheet.getCell("B3").value = ctc;

        let rowIndex = 5;
            worksheet.getCell(`A${rowIndex}`).value = "Earnings";
            worksheet.getCell(`A${rowIndex}`).font = { bold: true };
            rowIndex++;

            Earning.forEach(({ head, value }) => {
                worksheet.getCell(`A${rowIndex}`).value = head;
                worksheet.getCell(`B${rowIndex}`).value = value;
                rowIndex++;
            });

            rowIndex++;

            worksheet.getCell(`A${rowIndex}`).value = "Deductions";
            worksheet.getCell(`A${rowIndex}`).font = { bold: true };
            rowIndex++;

            Deduction.forEach(({ head, value }) => {
                worksheet.getCell(`A${rowIndex}`).value = head;
                worksheet.getCell(`B${rowIndex}`).value = value;
                rowIndex++;
            });
            rowIndex++;

            worksheet.getCell(`A${rowIndex}`).value = "Summary";
            worksheet.getCell(`A${rowIndex}`).font = { bold: true };
            rowIndex++;

            Summary.forEach(({ head, value }) => {
                worksheet.getCell(`A${rowIndex}`).value = head;
                worksheet.getCell(`B${rowIndex}`).value = value;
                rowIndex++;
            });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, 'salaryBreakdown.xlsx');
    };

    return (
        <div>
            <button className='flex justify-center items-center gap-3 bg-green-600 hover:bg-green-800 cursor-pointer text-white p-2 rounded-md w-full sm:w-auto' onClick={exportToExcel}><LuDownload />Download Excel</button>
        </div>
    );
};

export default SalaryExcel;
