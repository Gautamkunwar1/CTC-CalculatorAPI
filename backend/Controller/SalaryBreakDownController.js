import { salaryBreakDown } from "../utils/salaryBreakdown.js";
export const calculateCTC = async(req,res)=>{
    // console.log(req.body);
    const {ctc,isMonthly,salaryComponent,isEPFApplicable,isPTaxApplicable} = req.body;
    try {
        const salaryBreakdown = salaryBreakDown(ctc,isMonthly,salaryComponent,isEPFApplicable,isPTaxApplicable) ;
     
        return res.status(200).json({msg:"data send successfully",data:salaryBreakdown});
    } catch (error) {
        console.error("Error in calculateCTC controller",error.message);
        return res.status(500).json({msg:"Server Error"});
    }
}