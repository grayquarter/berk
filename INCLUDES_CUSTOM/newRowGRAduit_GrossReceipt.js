function newRowGRAduit_GrossReceipt() {

newRow = new Array();
newRow['AuditDate'] = new asiTableValObj('AuditDate',String(wfDateMMDDYYYY),'Y');
newRow['GrossReceipt'] = new asiTableValObj('GrossReceipt',AInfo['GrossReceipt'],'Y');
newRow['Postmark'] = new asiTableValObj('Postmark',AInfo['Postmark'],'Y');
newRow['RenewYear'] = new asiTableValObj('RenewYear',AInfo['RenewYear'],'Y');
if (wfTask == 'Gross Receipts Adjustment Step 1' && wfStatus == 'Completed') {
 
//replaced branch(EMSE:PICalculation_GrossReceipt)
pICalculation_GrossReceipt();
 }
if (wfTask == 'Gross Receipts Adjustment Step 2' && wfStatus == 'Completed') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//start replaced branch: EMSE:PICalculation_GrossReceiptAdjustment
 {
eval(getScriptText('getMostRecentFeeAmount'));
newBusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
GRBusLicPercent = lookup('LOOKUPFEE:BusinessLicFeePercent',appTypeArray[2]);
var CloseDate = AInfo['ClosureDate'];
newBusLicPercentFeeAmt = AInfo['GrossReceipt'] * GRBusLicPercent;
if (newBusLicMinFeeAmt <  newBusLicPercentFeeAmt) {
 finalNewBusLicFee = newBusLicPercentFeeAmt;
 } else {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
comment(finalNewBusLicFee);
comment(newBusLicMinFeeAmt);
comment(newBusLicPercentFeeAmt);
PostMarkDate = new Date(AInfo['Postmark']);
RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
RenewalDueDate = new Date(RenewalDueDateMMDDYY);
DaysLate = (PostMarkDate - RenewalDueDate)/(24*60*60*1000);
comment(DaysLate);
MonthDiff = PostMarkDate.getMonth()-RenewalDueDate.getMonth()+(12*(PostMarkDate.getFullYear() - RenewalDueDate.getFullYear()));
finalNewBusLicFeeIn = finalNewBusLicFee * 0.01 * MonthDiff;
comment(finalNewBusLicFeeIn);
if (DaysLate <= 0) {
 finalNewBusLicFeeIn = 0;
 finalNewBusLicPenIn1 = 0;
 finalNewBusLicPenIn2 = 0;
 }
if (DaysLate <= 0) {
 finalNewBusLicPen1 = 0;
 finalNewBusLicPen2 = 0;
 }
if (DaysLate > 0 && DaysLate < 31) {
 finalNewBusLicPen1 = finalNewBusLicFee * 0.1;
 comment(finalNewBusLicPen1);
 }
if (DaysLate >= 30) {
 finalNewBusLicPen2 = finalNewBusLicFee * 0.4;
 comment(finalNewBusLicPen2);
 finalNewBusLicPen1 = finalNewBusLicFee * 0.1;
 comment(finalNewBusLicPen1);
 }
if (DaysLate > 0 && DaysLate < 31) {
 finalNewBusLicPenIn1 = finalNewBusLicFee * 0.1 *0.01 * MonthDiff;
 comment(finalNewBusLicPenIn1);
 }
if (DaysLate >= 30) {
 finalNewBusLicPenIn2 = finalNewBusLicFee * 0.4*0.01 * MonthDiff;
 comment(finalNewBusLicPenIn2);
 finalNewBusLicPenIn1 = finalNewBusLicFee * 0.1 *0.01 * MonthDiff;
 comment(finalNewBusLicPenIn2);
 }
OldBusLicFee = feeAmount('LIC_BUS_REN','INVOICED') +feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED');
comment(OldBusLicFee);
OldAdjLicFee = feeAmount('LIC_ADJ_RENC','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED');
finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
comment(finalOldBusLicFee);
OldBusLicPen1 = feeAmount('LIC_BUS_PEN','INVOICED') + feeAmount('LIC_PENALTY','INVOICED');
comment(OldBusLicPen1);
OldBusLicPen2 = feeAmount('LIC_BUS_PEN2','INVOICED');
comment(OldBusLicPen2);
OldAdjLicPen1= feeAmount('LIC_ADJ_PENC','INVOICED') + feeAmount('LIC_ADJ_PEN','INVOICED');
finalOldBusLicPen1 = (OldAdjLicPen1 +  OldBusLicPen1);
comment(finalOldBusLicPen1);
OldAdjLicPen2 = feeAmount('LIC_ADJPEN2C','INVOICED')+feeAmount('LIC_ADJ_PEN2','INVOICED');
finalOldBusLicPen2 = (OldAdjLicPen2 +  OldBusLicPen2);
comment(finalOldBusLicPen2);
OldBusLicFeeIn = feeAmount('LIC_BUS_PLAT','INVOICED') + feeAmount('LIC_INTEREST','INVOICED');
comment(OldBusLicFeeIn);
OldAdjLicFeeIn = feeAmount('LIC_ADJPLATC','INVOICED') + feeAmount('LIC_ADJ_PLAT','INVOICED');
finalOldBusLicFeeIn = (OldAdjLicFeeIn + OldBusLicFeeIn);
comment(finalOldBusLicFeeIn);
OldBusLicPenIn1 = feeAmount('LIC_BUS_LAT','INVOICED');
comment(OldBusLicPenIn1);
OldAdjLicPenIn1 = feeAmount('LIC_ADJ_LATC','INVOICED') + feeAmount('LIC_ADJ_LAT','INVOICED');
OldBusLicPenIn2 = feeAmount('LIC_BUS_LAT2','INVOICED');
comment(OldBusLicPenIn2);
OldAdjLicPenIn2 = feeAmount('LIC_ADJLAT2C','INVOICED') +feeAmount('LIC_ADJ_LAT2','INVOICED');
finalOldBusLicPenIn1 = (OldAdjLicPenIn1 + OldBusLicPenIn1);
comment(finalOldBusLicPenIn1);
finalOldBusLicPenIn2 = (OldAdjLicPenIn2 + OldBusLicPenIn2);
comment(finalOldBusLicPenIn2);
if (finalOldBusLicFee - finalNewBusLicFee < 0.01) {
 comment('Taxes paid =' + finalOldBusLicFee + 'and Adjusted balance ='  + finalNewBusLicFee + '.');
 }
if ((finalOldBusLicFee - finalNewBusLicFee) >0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_ADJ_RENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
TotalP1 = feeAmount('LIC_BUS_PEN','INVOICED');
var P1_Current_Amount = getMostRecentFeeAmount('LIC_BUS_PEN', capId);
var P1Credit = feeAmount('LIC_ADJ_PENC','INVOICED');
if (feeExists('LIC_BUS_PEN','INVOICED') && (TotalP1 + P1Credit - P1_Current_Amount) > 0) {
 addFee('LIC_ADJ_PENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (TotalP1 + P1Credit - P1_Current_Amount), 'Y');
 }
TotalP2 = feeAmount('LIC_BUS_PEN2','INVOICED');
var P2_Current_Amount = getMostRecentFeeAmount('LIC_BUS_PEN2', capId);
var P2Credit = feeAmount('LIC_ADJPEN2C','INVOICED');
if (feeExists('LIC_BUS_PEN2','INVOICED') && (TotalP2 + P2Credit - P2_Current_Amount) > 0) {
 addFee('LIC_ADJPEN2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (TotalP2 + P2Credit - P2_Current_Amount), 'Y');
 }
TotalP1I = feeAmount('LIC_BUS_LAT','INVOICED');
var P1I_Current_Amount = getMostRecentFeeAmount('LIC_BUS_LAT', capId);
var P1ICredit = feeAmount('LIC_ADJ_LATC','INVOICED');
if (feeExists('LIC_BUS_LAT','INVOICED') && (TotalP1I + P1ICredit - P1I_Current_Amount) > 0) {
 addFee('LIC_ADJ_LATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (TotalP1I + P1ICredit - P1I_Current_Amount), 'Y');
 }
TotalP2I = feeAmount('LIC_BUS_LAT2','INVOICED');
var P2I_Current_Amount = getMostRecentFeeAmount('LIC_BUS_LAT2', capId);
var P2ICredit = feeAmount('LIC_ADJLAT2C','INVOICED');
if (feeExists('LIC_BUS_LAT2','INVOICED') && (TotalP2I + P2ICredit - P2I_Current_Amount) > 0) {
 addFee('LIC_ADJLAT2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (TotalP2I + P2ICredit - P2I_Current_Amount), 'Y');
 }
TotalBI = feeAmount('LIC_BUS_PLAT','INVOICED');
var BI_Current_Amount = getMostRecentFeeAmount('LIC_BUS_PLAT', capId);
var BICredit = feeAmount('LIC_ADJPLATC','INVOICED');
if (feeExists('LIC_BUS_PLAT','INVOICED') && (TotalBI + BICredit - BI_Current_Amount) > 0) {
 addFee('LIC_ADJPLATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (TotalBI + BICredit - BI_Current_Amount), 'Y');
 }
OldU1 = feeAmount('LIC_REN_U1','INVOICED');
comment('old U1: ' + OldU1);
var U1BLT_Amount = AInfo['U1BusinessLicenseTax'];
var U1Credit = feeAmount('LIC_ADJ_U1C','INVOICED');
if (feeExists('LIC_REN_U1','INVOICED') && (OldU1 - U1BLT_Amount) >0.01 && (OldU1 + U1Credit - U1BLT_Amount) >0) {
 comment(finalOldBusLicFeeIn - finalNewBusLicFeeIn);
 addFee('LIC_ADJ_U1C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (OldU1 + U1Credit - U1BLT_Amount), 'Y');
 }
if (finalOldBusLicFee < finalNewBusLicFee) {
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_REN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
if (CloseDate == null && finalOldBusLicFee < finalNewBusLicFee && DaysLate > 0 && DaysLate < 31) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 }
if (CloseDate == null && finalOldBusLicFee < finalNewBusLicFee && DaysLate >= 30) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 addFee('LIC_ADJ_PEN2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen2 - finalOldBusLicPen2), 'Y');
 addFee('LIC_ADJ_LAT2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn2 - finalOldBusLicPenIn2), 'Y');
 }

}
//end replaced branch: EMSE:PICalculation_GrossReceiptAdjustment;
 }
if (wfTask == 'Data Entry Correction' && wfStatus == 'Corrected') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//replaced branch(EMSE:PICalculation_GrossReceipt)
pICalculation_GrossReceipt();
 }

}
