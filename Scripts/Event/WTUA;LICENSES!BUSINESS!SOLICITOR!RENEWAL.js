

//start replaced branch: EMSE:WTUA:NewRowGRAduit_Solicitor
 {
newRow = new Array();
newRow['AuditDate'] = new asiTableValObj('AuditDate',String(wfDateMMDDYYYY),'Y');
newRow['GrossReceipt'] = new asiTableValObj('GrossReceipt',AInfo['GrossReceipt'],'Y');
newRow['Postmark'] = new asiTableValObj('Postmark',AInfo['Postmark'],'Y');
newRow['RenewYear'] = new asiTableValObj('RenewYear',AInfo['RenewYear'],'Y');
if (wfTask == 'Data Entry Correction' && wfStatus == 'Corrected') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//replaced branch(EMSE:PICalculation_FlatFee)
pICalculation_FlatFee();
 }
if (wfTask == 'Gross Receipts Adjustment' && wfStatus == 'Adjusted') {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 
//replaced branch(EMSE:PICalculation_FlatFeeAdjustment)
pICalculation_FlatFeeAdjustment();
 }

}
//end replaced branch: EMSE:WTUA:NewRowGRAduit_Solicitor;

