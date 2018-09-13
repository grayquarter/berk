function pICalculation_GrossReceipt() {

comment('***** Get LookUp Values *****');
BusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
GRBusLicPercent = lookup('LOOKUPFEE:BusinessLicFeePercent',appTypeArray[2]);
RORPCombinedTaxRate = lookup('LOOKUPFEE:BusinessLicFeePercent','Rental of Real Property Combined');
RROPU1TaxRate =lookup('LOOKUPFEE:BusinessLicFeePercent','Rental of Real Property U1');
comment('***** Initialize Variables *****');
BusLicPercentFeeAmt = AInfo['GrossReceipt'] * GRBusLicPercent;
var CloseDate = AInfo['ClosureDate'];
var BaseTax_Amount = AInfo['BaseTax'];
var U1BLT_Amount = AInfo['U1BusinessLicenseTax'];
var BaseTaxPlusU1Tax = AInfo['TotalTax'];
if (!appMatch('Licenses/Business/Rental of Real Property/Renewal')) {
 BaseTaxPlusU1Tax = BusLicPercentFeeAmt;
 }
comment('***** Display Variable values in log *****');
comment('GrossReceipt * GRBusLicPercent (BusLicPercentFeeAmt) = ' + BusLicPercentFeeAmt);
comment('Minimum BLT Fee (BusLicMinFeeAmt) = ' + BusLicMinFeeAmt);
comment('Rental of Real Property % (GRBusLicPercent) = ' + GRBusLicPercent);
comment('Rental of Real Property Combined % (RORPCombinedTaxRate) = ' + RORPCombinedTaxRate);
comment('Rental of Real Property U1% (RROPU1TaxRate) = ' + RROPU1TaxRate);
comment('Combined Taxes to calc fees from (BaseTaxPlusU1Tax) = '+BaseTaxPlusU1Tax);
comment('BLT Tax with Exemptions - Base Tax (BaseTax_Amount) = '+BaseTax_Amount);
comment('U1 BLT (U1BLT_Amount) = '+U1BLT_Amount);
comment('*** OLD BLT Tax without exemptions (BusLicPercentFeeAmt) = '+BusLicPercentFeeAmt);
if (CloseDate == undefined) {
 CloseDate = null;
 }
PostMarkDate = new Date(AInfo['Postmark']);
RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
RenewalDueDate = new Date(RenewalDueDateMMDDYY);
DaysLate = (PostMarkDate - RenewalDueDate)/(24*60*60*1000);
MonthDiff = PostMarkDate.getMonth()-RenewalDueDate.getMonth()+(12*(PostMarkDate.getFullYear() - RenewalDueDate.getFullYear()));
if (!appMatch('Licenses/Business/Rental of Real Property/Renewal') && BusLicPercentFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicPercentFeeAmt,'Y');
 }
if (appMatch('Licenses/Business/Rental of Real Property/Renewal') && parseInt(BaseTaxPlusU1Tax) > BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BaseTax_Amount,'Y');
 }
if (parseInt(AInfo['RenewYear']) >=2017 && (parseInt(BaseTaxPlusU1Tax) > BusLicMinFeeAmt) && U1BLT_Amount > 0) {
 addFee('LIC_REN_U1','LIC_BUSINESS_RENEWAL','FINAL', U1BLT_Amount,'Y');
 }
if (CloseDate == null && parseInt(BaseTaxPlusU1Tax) < BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicMinFeeAmt,'Y');
 }
if (CloseDate != null && parseInt(BaseTaxPlusU1Tax) < BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BaseTaxPlusU1Tax,'Y');
 }
if ((DaysLate > 0 && DaysLate < 31) && parseInt(BaseTaxPlusU1Tax) > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax *.01* MonthDiff),'Y');
 }
if (CloseDate == null && (DaysLate > 0 && DaysLate < 31) && parseInt(BaseTaxPlusU1Tax) < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (CloseDate != null && (DaysLate > 0 && DaysLate < 31) && parseInt(BaseTaxPlusU1Tax) < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax *.01* MonthDiff),'Y');
 }
if (DaysLate >= 31 && parseInt(BaseTaxPlusU1Tax) > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax *.01* MonthDiff),'Y');
 }
if (CloseDate == null && DaysLate >= 31 && parseInt(BaseTaxPlusU1Tax) < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * .01 *MonthDiff),'Y');
 }
if (CloseDate != null && DaysLate >= 31 && parseInt(BaseTaxPlusU1Tax) < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BaseTaxPlusU1Tax *.01* MonthDiff),'Y');
 }
if (CloseDate == null && !feeExists('LIC_BUS_SMF4','INVOICED')) {
 addFee('LIC_BUS_SMF4', 'LIC_BUSINESS_RENEWAL', 'FINAL', '1', 'Y');
 }

}
