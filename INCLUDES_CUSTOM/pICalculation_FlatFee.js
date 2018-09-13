function pICalculation_FlatFee() {

BusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
var CloseDate = AInfo['ClosureDate'];
PostMarkDate = new Date(AInfo['Postmark']);
RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
RenewalDueDate = new Date(RenewalDueDateMMDDYY);
DaysLate = (PostMarkDate - RenewalDueDate)/(24*60*60*1000);
MonthDiff = PostMarkDate.getMonth()-RenewalDueDate.getMonth()+(12*(PostMarkDate.getFullYear() - RenewalDueDate.getFullYear()));
addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicMinFeeAmt,'Y');
if (CloseDate == null &&(DaysLate > 0 && DaysLate < 31)) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (CloseDate == null &&DaysLate >= 31) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * .01 *MonthDiff),'Y');
 }
if (CloseDate == null) {
 addFee('LIC_BUS_SMF4', 'LIC_BUSINESS_RENEWAL', 'FINAL', '1', 'Y');
 }

}
