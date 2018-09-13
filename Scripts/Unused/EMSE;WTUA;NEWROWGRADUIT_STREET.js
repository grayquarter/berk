
newRow = new Array();
newRow['AuditDate'] = new asiTableValObj('AuditDate',String(wfDateMMDDYYYY),'Y');
newRow['GrossReceipt'] = new asiTableValObj('GrossReceipt',AInfo['GrossReceipt'],'Y');
newRow['Postmark'] = new asiTableValObj('Postmark',AInfo['Postmark'],'Y');
newRow['RenewYear'] = new asiTableValObj('RenewYear',AInfo['RenewYear'],'Y');
if (wfTask == 'Data Entry Correction' && wfStatus == 'Corrected') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//replaced branch(EMSE:PICalculation_Street)
pICalculation_Street();
 }
if (wfTask == 'Gross Receipts Adjustment' && wfStatus == 'Adjusted') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//start replaced branch: EMSE:PICalculation_StreetAdjustment
 {
newBusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
newBusLicMinFeeAmtFullYear = newBusLicMinFeeAmt*2;
if (AInfo['RenewMonthNum']=='half year') {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 }
if (AInfo['RenewMonthNum']=='full year') {
 finalNewBusLicFee = newBusLicMinFeeAmtFullYear;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmtFullYear);
 }
PostMarkDate = new Date(AInfo['Postmark']);
RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
RenewalDueDate = new Date(RenewalDueDateMMDDYY);
DaysLate = (PostMarkDate - RenewalDueDate)/(24*60*60*1000);
MonthDiff = PostMarkDate.getMonth()-RenewalDueDate.getMonth()+(12*(PostMarkDate.getFullYear() - RenewalDueDate.getFullYear()));
if (DaysLate > 0) {
 finalNewBusLicFeeIn = finalNewBusLicFee * 0.01 * MonthDiff;
 comment(finalNewBusLicFeeIn);
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
 comment(finalNewBusLicPenIn1);
 }
OldBusLicFee = feeAmount('LIC_BUS_REN','INVOICED');
OldAdjLicFee = feeAmount('LIC_ADJ_REN','INVOICED');
finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
comment(finalOldBusLicFee);
OldBusLicPen1 = feeAmount('LIC_BUS_PEN','INVOICED');
OldAdjLicPen1= feeAmount('LIC_ADJ_PEN','INVOICED');
finalOldBusLicPen1 = (OldAdjLicPen1 +  OldBusLicPen1);
comment(finalOldBusLicPen1);
OldBusLicPen2 = feeAmount('LIC_BUS_PEN2','INVOICED');
OldAdjLicPen2 = feeAmount('LIC_ADJ_PEN2','INVOICED');
finalOldBusLicPen2 = (OldAdjLicPen2 +  OldBusLicPen2);
comment(finalOldBusLicPen2);
OldBusLicFeeIn = feeAmount('LIC_BUS_PLAT','INVOICED');
OldAdjLicFeeIn = feeAmount('LIC_ADJ_PLAT','INVOICED');
finalOldBusLicFeeIn = (OldAdjLicFeeIn + OldBusLicFeeIn);
comment(finalOldBusLicFeeIn);
OldBusLicPenIn1 = feeAmount('LIC_BUS_LAT','INVOICED');
OldBusLicPenIn2 = feeAmount('LIC_BUS_LAT2','INVOICED');
OldAdjLicPenIn1 = feeAmount('LIC_ADJ_LAT','INVOICED');
finalOldBusLicPenIn1 = (OldAdjLicPenIn1 + OldBusLicPenIn1);
comment(finalOldBusLicPenIn1);
OldAdjLicPenIn2 = feeAmount('LIC_ADJ_LAT2','INVOICED');
finalOldBusLicPenIn2 = (OldAdjLicPenIn2 + OldBusLicPenIn2);
comment(finalOldBusLicPenIn2);
if (finalOldBusLicFee == finalNewBusLicFee) {
 comment('Taxes paid =' + finalOldBusLicFee + 'and Adjusted balance ='  + finalNewBusLicFee + '.');
 }
if (finalOldBusLicFee > finalNewBusLicFee) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_ADJ_RENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 } else {
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_REN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
if (DaysLate > 0 && DaysLate < 31 && finalOldBusLicFee < finalNewBusLicFee) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 }
if (DaysLate >= 30 && finalOldBusLicFee < finalNewBusLicFee) {
 addFee('LIC_ADJ_PEN2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen2 - finalOldBusLicPen2), 'Y');
 addFee('LIC_ADJ_LAT2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn2 - finalOldBusLicPenIn2), 'Y');
 }
if (comment(finalNewBusLicFee - finalOldBusLicFee); comment(finalNewBusLicPen1 - finalOldBusLicPen1); comment(finalNewBusLicFeeIn - finalOldBusLicFeeIn); comment(finalNewBusLicPenIn1 - finalOldBusLicPenIn1); comment(finalNewBusLicPen2 - finalOldBusLicPen2); comment(finalNewBusLicFeeIn2 - finalOldBusLicFeeIn2);) {
 }

}
//end replaced branch: EMSE:PICalculation_StreetAdjustment;
 }

