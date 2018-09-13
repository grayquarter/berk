
newRow = new Array();
newRow['AuditDate'] = new asiTableValObj('AuditDate',String(fileDate),'Y');
newRow['GrossReceipt'] = new asiTableValObj('GrossReceipt',AInfo['RenewMonthNum'],'Y');
newRow['Postmark'] = new asiTableValObj('Postmark',AInfo['Postmark'],'Y');
newRow['RenewYear'] = new asiTableValObj('RenewYear',AInfo['RenewYear'],'Y');
if (newRow) {
 addToASITable('AUDITGROSSRECEIPTS',newRow);
 }

