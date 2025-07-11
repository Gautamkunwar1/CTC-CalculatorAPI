import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export interface SalaryType {
    head: string|number;
    value: number;
}

export interface SalaryBreakoutType{
    ctc:number,
    Earning:SalaryType[],
    Deduction:SalaryType[],
    Summary:SalaryType[],
    isMonthly: boolean
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        flexDirection: 'column',
    },
    section: {
        marginBottom: 15,
    },
    heading: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    table: {
        width: '100%',
    },
    tableHeader:{
        flexDirection:"row",
        backgroundColor:"#333",
        color:"#fff",
        paddingHorizontal:5,
        fontWeight:"bold"
    },
    row: {
        flexDirection: "row",
        paddingVertical: 4,
        alignItems: 'center',
    },
    cellLabel: {
        width: '70%',
        paddingHorizontal: 4,
    },
    cellValue: {
        width: '30%',
        paddingHorizontal: 4,
        paddingVertical:3,
        textAlign: 'right',
    },
    label: {
        flex:1,
        fontWeight: 'bold',
        marginVertical:5,
        paddingVertical:5,
        paddingHorizontal:6
    },
    sectionLabel:{
        fontWeight: 'bold',
        paddingVertical:5,
        backgroundColor:"#f0f0f0",
        paddingHorizontal:6
    },
    altRow:{
        backgroundColor:"#f9f9f9",
    },
    sectionHeading:{
        backgroundColor:"#f0f0f0",
    }
});

const SalaryPdfDocument = ({ctc,Earning,Deduction,Summary,isMonthly}:SalaryBreakoutType) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.heading}>CTC CALCULATOR - SALARY BREAKDOWN</Text>
                </View>

                <View style={styles.section}>
                    <Text>Total CTC: Rs. {Math.round(ctc)} {!isMonthly?'per year':'per month'}</Text>
                </View>

                <View style={styles.tableHeader}>
                    <Text style={styles.label}>Component</Text>
                    <Text style={[styles.label,{textAlign:'right'}]}>Amount</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>EARNINGS</Text>
                    {Earning.map((item, index) => (
                        <View style={[styles.row,index%2===1?styles.altRow:{}]} key={index}>
                            <Text style={styles.cellLabel}>{item.head}</Text>
                            <Text style={styles.cellValue}>Rs. {item.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>DEDUCTIONS</Text>
                    {Deduction.map((item, index) => (
                        <View style={[styles.row,index%2===1?styles.altRow:{}]} key={index}>
                            <Text style={styles.cellLabel}>{item.head}</Text>
                            <Text style={styles.cellValue}>Rs. {item.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>SUMMARY</Text>
                    {Summary.map(( item, index) => (
                        <View style={[styles.row,index%2===1?styles.altRow:{}]} key={index}>
                            <Text style={styles.cellLabel}>{item.head}</Text>
                            <Text style={styles.cellValue}>Rs. {item.value}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default SalaryPdfDocument;
