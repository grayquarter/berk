
if (appTypeString == 'Licenses/Business/Rental of Real Property/Renewal' && (parseFloat(AInfo['NetGrossReceipts1']) < 0 || parseFloat(AInfo['NetGrossReceipts2']) < 0)) {
	showMessage = true;
	comment('<font color=red><font size=small><b>U1 TAX CALCULATION WARNING:</font></b></font><br><br>Neither Net Gross receipts 1 OR Net Gross Receipts 2 cannot exceed the Gross Receipts. Please make the needed adjustments and resubmit.<br><br>');
	cancel = true;
}
