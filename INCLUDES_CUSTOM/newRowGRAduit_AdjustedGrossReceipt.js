function newRowGRAduit_AdjustedGrossReceipt() {

newRow = new Array();
newRow['AuditDate'] = new asiTableValObj('AuditDate',String(wfDateMMDDYYYY),'Y');
newRow['GrossReceipt'] = new asiTableValObj('GrossReceipt',AInfo['AdjustedGrossReceipt'],'Y');
newRow['Postmark'] = new asiTableValObj('Postmark',AInfo['Postmark'],'Y');
newRow['RenewYear'] = new asiTableValObj('RenewYear',AInfo['RenewYear'],'Y');
if (wfTask == 'Gross Receipts Adjustment Step 1' && wfStatus == 'Completed') {
 
//replaced branch(EMSE:PICalculation_AdjustedGrossReceipt)
pICalculation_AdjustedGrossReceipt();
 }
if (wfTask == 'Gross Receipts Adjustment Step 2' && wfStatus == 'Completed') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//start replaced branch: EMSE:PICalculation_AdjustedGrossReceiptAdjustment
 {
comment('***** Get LookUp Values *****');
newBusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
GRBusLicPercent = lookup('LOOKUPFEE:BusinessLicFeePercent',appTypeArray[2]);
var CannabisAdultUsePercentAmt = lookup('LOOKUPFEE:BusinessLicFeePercent','Cannabis Adult Use');
var CannabisMedicalUsePercentAmt = lookup('LOOKUPFEE:BusinessLicFeePercent','Cannabis Medical Use');
comment('***** Initialize Variables *****');
newBusLicPercentFeeAmt = AInfo['AdjustedGrossReceipt'] * GRBusLicPercent;
var CloseDate = AInfo['ClosureDate'];
var newCannabisAdultUseFeeAmt = AInfo['AdjustedGrossReceipt'] * CannabisAdultUsePercentAmt;
var newCannabisMedicalUseFeeAmt = AInfo['AdjustedGrossReceipt'] * CannabisMedicalUsePercentAmt;
comment(newCannabisAdultUseFeeAmt );
comment(newCannabisMedicalUseFeeAmt );
if (!appMatch('Licenses/Business/Cannabis/Renewal') && newBusLicMinFeeAmt <  newBusLicPercentFeeAmt) {
 finalNewBusLicFee = newBusLicPercentFeeAmt;
 } else {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Adult Use') && newBusLicMinFeeAmt <  newCannabisAdultUseFeeAmt) {
 finalNewBusLicFee = newCannabisAdultUseFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Adult Use')&& newBusLicMinFeeAmt >  newCannabisAdultUseFeeAmt) {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Medical Use') && newBusLicMinFeeAmt <  newCannabisMedicalUseFeeAmt) {
 finalNewBusLicFee = newCannabisMedicalUseFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Medical Use')&& newBusLicMinFeeAmt >  newCannabisMedicalUseFeeAmt) {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
comment(finalNewBusLicFee);
comment(newBusLicMinFeeAmt);
comment(newBusLicPercentFeeAmt);
comment(newCannabisAdultUseFeeAmt);
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
if (!appMatch('Licenses/Business/Cannabis/Renewal')) {
 OldBusLicFee = feeAmount('LIC_BUS_REN','INVOICED') +feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED');
 comment(OldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use') {
 OldBusLicFee = feeAmount('LIC_REN_CANA','INVOICED') + feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED') + feeAmount('LIC_BUS_REN','INVOICED');
 comment(OldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use') {
 OldBusLicFee = feeAmount('LIC_REN_CANM','INVOICED') + feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED') + feeAmount('LIC_BUS_REN','INVOICED');
 comment(OldBusLicFee);
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal')) {
 OldAdjLicFee = feeAmount('LIC_ADJ_RENC','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED');
 finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
 comment(finalOldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use') {
 OldAdjLicFee = feeAmount('LIC_AJ_CANAC','INVOICED') + feeAmount('LIC_ADJ_CANA','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED') + feeAmount('LIC_ADJ_RENC','INVOICED');
 finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
 comment(finalOldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use') {
 OldAdjLicFee = feeAmount('LIC_AJ_CANMC','INVOICED') + feeAmount('LIC_ADJ_CANM','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED') + feeAmount('LIC_ADJ_RENC','INVOICED');
 finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
 comment(finalOldBusLicFee);
 }
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
if (CloseDate == null) {
 OldBusLicFeeIn = feeAmount('LIC_BUS_PLAT','INVOICED') + feeAmount('LIC_INTEREST','INVOICED');
 comment(OldBusLicFeeIn);
 }
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
if (!appMatch('Licenses/Business/Cannabis/Renewal') && (finalOldBusLicFee - finalNewBusLicFee) > 0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_ADJ_RENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && (finalOldBusLicFee - finalNewBusLicFee) > 0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_AJ_CANAC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && (finalOldBusLicFee - finalNewBusLicFee) > 0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_AJ_CANMC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
if (feeExists('LIC_BUS_PEN','INVOICED') && CloseDate == null && (finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen1 - finalNewBusLicPen1) >0.01) {
 comment(finalOldBusLicPen1 - finalNewBusLicPen1);
 addFee('LIC_ADJ_PENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen1 - finalNewBusLicPen1), 'Y');
 }
if (feeExists('LIC_ADJ_PEN','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen1 - finalNewBusLicPen1) >0.01) {
 comment(finalOldBusLicPen1 - finalNewBusLicPen1);
 addFee('LIC_ADJ_PENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen1 - finalNewBusLicPen1), 'Y');
 }
if (feeExists('LIC_BUS_PEN2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen2 - finalNewBusLicPen2) >0.01) {
 comment(finalOldBusLicPen2 - finalNewBusLicPen2);
 addFee('LIC_ADJPEN2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen2 - finalNewBusLicPen2), 'Y');
 }
if (feeExists('LIC_ADJ_PEN2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen2 - finalNewBusLicPen2) >0.01) {
 comment(finalOldBusLicPen2 - finalNewBusLicPen2);
 addFee('LIC_ADJPEN2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen2 - finalNewBusLicPen2), 'Y');
 }
if (feeExists('LIC_BUS_LAT','INVOICED')  && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPenIn1 - finalNewBusLicPenIn1) >0.01) {
 comment(finalOldBusLicPenIn1 - finalNewBusLicPenIn1);
 addFee('LIC_ADJ_LATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn1 - finalNewBusLicPenIn1), 'Y');
 }
if (feeExists('LIC_ADJ_LAT','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicPenIn1 - finalNewBusLicPenIn1) >0.01) {
 comment(finalOldBusLicPenIn1 - finalNewBusLicPenIn1);
 addFee('LIC_ADJ_LATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn1 - finalNewBusLicPenIn1), 'Y');
 }
if (feeExists('LIC_BUS_LAT2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicPenIn2 - finalNewBusLicPenIn2) >0.01) {
 comment(finalOldBusLicPenIn2 - finalNewBusLicPenIn2);
 addFee('LIC_ADJLAT2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn2 - finalNewBusLicPenIn2), 'Y');
 }
if (feeExists('LIC_ADJ_LAT2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicPenIn2 - finalNewBusLicPenIn2) >0.01) {
 comment(finalOldBusLicPenIn2 - finalNewBusLicPenIn2);
 addFee('LIC_ADJLAT2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn2 - finalNewBusLicPenIn2), 'Y');
 }
if (feeExists('LIC_BUS_PLAT','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicFeeIn - finalNewBusLicFeeIn) >0.01) {
 comment(finalOldBusLicFeeIn - finalNewBusLicFeeIn);
 addFee('LIC_ADJPLATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFeeIn - finalNewBusLicFeeIn), 'Y');
 }
if (feeExists('LIC_ADJ_PLAT','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicFeeIn - finalNewBusLicFeeIn) >0.01) {
 comment(finalOldBusLicFeeIn - finalNewBusLicFeeIn);
 addFee('LIC_ADJPLATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFeeIn - finalNewBusLicFeeIn), 'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && finalOldBusLicFee < finalNewBusLicFee) {
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_REN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
logDebug('Values are ' + finalOldBusLicFee + ' ' + finalNewBusLicFee);
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && finalOldBusLicFee < finalNewBusLicFee) {
 logDebug('Ivan was here ');
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_CANA', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && finalOldBusLicFee < finalNewBusLicFee) {
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_CANM', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
if (finalOldBusLicFee < finalNewBusLicFee && CloseDate == null && DaysLate > 0 && DaysLate < 31) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 }
if (finalOldBusLicFee < finalNewBusLicFee && CloseDate == null && DaysLate >= 30) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 addFee('LIC_ADJ_PEN2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen2 - finalOldBusLicPen2), 'Y');
 addFee('LIC_ADJ_LAT2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn2 - finalOldBusLicPenIn2), 'Y');
 }

}
//end replaced branch: EMSE:PICalculation_AdjustedGrossReceiptAdjustment;
 }
if (wfTask == 'Data Entry Correction' && wfStatus == 'Corrected') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//replaced branch(EMSE:PICalculation_AdjustedGrossReceipt)
pICalculation_AdjustedGrossReceipt();
 }
if (wfTask == 'Cannabis Gross Receipts Submittal' && wfStatus == 'Completed') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//start replaced branch: EMSE:PICalculation_AdjustedGrossReceiptAdjustment
 {
comment('***** Get LookUp Values *****');
newBusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
GRBusLicPercent = lookup('LOOKUPFEE:BusinessLicFeePercent',appTypeArray[2]);
var CannabisAdultUsePercentAmt = lookup('LOOKUPFEE:BusinessLicFeePercent','Cannabis Adult Use');
var CannabisMedicalUsePercentAmt = lookup('LOOKUPFEE:BusinessLicFeePercent','Cannabis Medical Use');
comment('***** Initialize Variables *****');
newBusLicPercentFeeAmt = AInfo['AdjustedGrossReceipt'] * GRBusLicPercent;
var CloseDate = AInfo['ClosureDate'];
var newCannabisAdultUseFeeAmt = AInfo['AdjustedGrossReceipt'] * CannabisAdultUsePercentAmt;
var newCannabisMedicalUseFeeAmt = AInfo['AdjustedGrossReceipt'] * CannabisMedicalUsePercentAmt;
comment(newCannabisAdultUseFeeAmt );
comment(newCannabisMedicalUseFeeAmt );
if (!appMatch('Licenses/Business/Cannabis/Renewal') && newBusLicMinFeeAmt <  newBusLicPercentFeeAmt) {
 finalNewBusLicFee = newBusLicPercentFeeAmt;
 } else {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Adult Use') && newBusLicMinFeeAmt <  newCannabisAdultUseFeeAmt) {
 finalNewBusLicFee = newCannabisAdultUseFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Adult Use')&& newBusLicMinFeeAmt >  newCannabisAdultUseFeeAmt) {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Medical Use') && newBusLicMinFeeAmt <  newCannabisMedicalUseFeeAmt) {
 finalNewBusLicFee = newCannabisMedicalUseFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && (getAppSpecific('CannabisBusinessType') == 'Medical Use')&& newBusLicMinFeeAmt >  newCannabisMedicalUseFeeAmt) {
 finalNewBusLicFee = newBusLicMinFeeAmt;
 comment(finalNewBusLicFee);
 comment(newBusLicMinFeeAmt);
 comment(newBusLicPercentFeeAmt);
 }
comment(finalNewBusLicFee);
comment(newBusLicMinFeeAmt);
comment(newBusLicPercentFeeAmt);
comment(newCannabisAdultUseFeeAmt);
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
if (!appMatch('Licenses/Business/Cannabis/Renewal')) {
 OldBusLicFee = feeAmount('LIC_BUS_REN','INVOICED') +feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED');
 comment(OldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use') {
 OldBusLicFee = feeAmount('LIC_REN_CANA','INVOICED') + feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED') + feeAmount('LIC_BUS_REN','INVOICED');
 comment(OldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use') {
 OldBusLicFee = feeAmount('LIC_REN_CANM','INVOICED') + feeAmount('LIC_LICENSE','INVOICED') + feeAmount('LIC_TRANSFER','INVOICED') + feeAmount('LIC_BUS_REN','INVOICED');
 comment(OldBusLicFee);
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal')) {
 OldAdjLicFee = feeAmount('LIC_ADJ_RENC','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED');
 finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
 comment(finalOldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use') {
 OldAdjLicFee = feeAmount('LIC_AJ_CANAC','INVOICED') + feeAmount('LIC_ADJ_CANA','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED') + feeAmount('LIC_ADJ_RENC','INVOICED');
 finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
 comment(finalOldBusLicFee);
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use') {
 OldAdjLicFee = feeAmount('LIC_AJ_CANMC','INVOICED') + feeAmount('LIC_ADJ_CANM','INVOICED') + feeAmount('LIC_ADJ_REN','INVOICED') + feeAmount('LIC_ADJ_RENC','INVOICED');
 finalOldBusLicFee = (OldAdjLicFee  +  OldBusLicFee);
 comment(finalOldBusLicFee);
 }
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
if (CloseDate == null) {
 OldBusLicFeeIn = feeAmount('LIC_BUS_PLAT','INVOICED') + feeAmount('LIC_INTEREST','INVOICED');
 comment(OldBusLicFeeIn);
 }
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
if (!appMatch('Licenses/Business/Cannabis/Renewal') && (finalOldBusLicFee - finalNewBusLicFee) > 0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_ADJ_RENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && (finalOldBusLicFee - finalNewBusLicFee) > 0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_AJ_CANAC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && (finalOldBusLicFee - finalNewBusLicFee) > 0.01) {
 comment(finalOldBusLicFee - finalNewBusLicFee);
 addFee('LIC_AJ_CANMC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFee - finalNewBusLicFee), 'Y');
 }
if (feeExists('LIC_BUS_PEN','INVOICED') && CloseDate == null && (finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen1 - finalNewBusLicPen1) >0.01) {
 comment(finalOldBusLicPen1 - finalNewBusLicPen1);
 addFee('LIC_ADJ_PENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen1 - finalNewBusLicPen1), 'Y');
 }
if (feeExists('LIC_ADJ_PEN','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen1 - finalNewBusLicPen1) >0.01) {
 comment(finalOldBusLicPen1 - finalNewBusLicPen1);
 addFee('LIC_ADJ_PENC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen1 - finalNewBusLicPen1), 'Y');
 }
if (feeExists('LIC_BUS_PEN2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen2 - finalNewBusLicPen2) >0.01) {
 comment(finalOldBusLicPen2 - finalNewBusLicPen2);
 addFee('LIC_ADJPEN2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen2 - finalNewBusLicPen2), 'Y');
 }
if (feeExists('LIC_ADJ_PEN2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPen2 - finalNewBusLicPen2) >0.01) {
 comment(finalOldBusLicPen2 - finalNewBusLicPen2);
 addFee('LIC_ADJPEN2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPen2 - finalNewBusLicPen2), 'Y');
 }
if (feeExists('LIC_BUS_LAT','INVOICED')  && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01&& (finalOldBusLicPenIn1 - finalNewBusLicPenIn1) >0.01) {
 comment(finalOldBusLicPenIn1 - finalNewBusLicPenIn1);
 addFee('LIC_ADJ_LATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn1 - finalNewBusLicPenIn1), 'Y');
 }
if (feeExists('LIC_ADJ_LAT','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicPenIn1 - finalNewBusLicPenIn1) >0.01) {
 comment(finalOldBusLicPenIn1 - finalNewBusLicPenIn1);
 addFee('LIC_ADJ_LATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn1 - finalNewBusLicPenIn1), 'Y');
 }
if (feeExists('LIC_BUS_LAT2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicPenIn2 - finalNewBusLicPenIn2) >0.01) {
 comment(finalOldBusLicPenIn2 - finalNewBusLicPenIn2);
 addFee('LIC_ADJLAT2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn2 - finalNewBusLicPenIn2), 'Y');
 }
if (feeExists('LIC_ADJ_LAT2','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicPenIn2 - finalNewBusLicPenIn2) >0.01) {
 comment(finalOldBusLicPenIn2 - finalNewBusLicPenIn2);
 addFee('LIC_ADJLAT2C', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicPenIn2 - finalNewBusLicPenIn2), 'Y');
 }
if (feeExists('LIC_BUS_PLAT','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicFeeIn - finalNewBusLicFeeIn) >0.01) {
 comment(finalOldBusLicFeeIn - finalNewBusLicFeeIn);
 addFee('LIC_ADJPLATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFeeIn - finalNewBusLicFeeIn), 'Y');
 }
if (feeExists('LIC_ADJ_PLAT','INVOICED') && CloseDate == null &&(finalOldBusLicFee - finalNewBusLicFee) >0.01 && (finalOldBusLicFeeIn - finalNewBusLicFeeIn) >0.01) {
 comment(finalOldBusLicFeeIn - finalNewBusLicFeeIn);
 addFee('LIC_ADJPLATC', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalOldBusLicFeeIn - finalNewBusLicFeeIn), 'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && finalOldBusLicFee < finalNewBusLicFee) {
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_REN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
logDebug('Values are ' + finalOldBusLicFee + ' ' + finalNewBusLicFee);
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && finalOldBusLicFee < finalNewBusLicFee) {
 logDebug('Ivan was here ');
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_CANA', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && finalOldBusLicFee < finalNewBusLicFee) {
 comment(finalNewBusLicFee - finalOldBusLicFee);
 addFee('LIC_ADJ_CANM', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFee - finalOldBusLicFee), 'Y');
 }
if (finalOldBusLicFee < finalNewBusLicFee && CloseDate == null && DaysLate > 0 && DaysLate < 31) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 }
if (finalOldBusLicFee < finalNewBusLicFee && CloseDate == null && DaysLate >= 30) {
 addFee('LIC_ADJ_PEN', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen1 - finalOldBusLicPen1), 'Y');
 addFee('LIC_ADJ_LAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn1 - finalOldBusLicPenIn1), 'Y');
 addFee('LIC_ADJ_PLAT', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicFeeIn - finalOldBusLicFeeIn), 'Y');
 addFee('LIC_ADJ_PEN2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPen2 - finalOldBusLicPen2), 'Y');
 addFee('LIC_ADJ_LAT2', 'LIC_BUSINESS_RENEWAL', 'FINAL' , (finalNewBusLicPenIn2 - finalOldBusLicPenIn2), 'Y');
 }

}
//end replaced branch: EMSE:PICalculation_AdjustedGrossReceiptAdjustment;
 }

}
