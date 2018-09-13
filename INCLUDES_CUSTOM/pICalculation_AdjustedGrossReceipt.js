function pICalculation_AdjustedGrossReceipt() {

comment('***** Get LookUp Values *****');
BusLicMinFeeAmt = lookup('LOOKUPFEE:BusinessLicMinFee',appTypeArray[2]);
GRBusLicPercent = lookup('LOOKUPFEE:BusinessLicFeePercent',appTypeArray[2]);
var CannabisAdultUsePercentAmt = lookup('LOOKUPFEE:BusinessLicFeePercent','Cannabis Adult Use');
var CannabisMedicalUsePercentAmt = lookup('LOOKUPFEE:BusinessLicFeePercent','Cannabis Medical Use');
comment('***** Initialize Variables *****');
BusLicPercentFeeAmt = AInfo['AdjustedGrossReceipt'] * GRBusLicPercent;
var CloseDate = AInfo['ClosureDate'];
var CannabisAdultUseFeeAmt = AInfo['AdjustedGrossReceipt'] * CannabisAdultUsePercentAmt;
var CannabisMedicalUseFeeAmt = AInfo['AdjustedGrossReceipt'] * CannabisMedicalUsePercentAmt;
comment('***** Display Variable values in log *****');
comment('AdjustedGrossReceipt * GRBusLicPercent(BusLicPercentFeeAmt) =' + BusLicPercentFeeAmt);
comment('Minimum BLT Fee(BusLicMinFeeAmt) =' + BusLicMinFeeAmt);
comment('Cannabis Adult Use Fee(CannabisAdultUseFeeAmt) = ' + CannabisAdultUseFeeAmt);
comment('Cannabis Medical Use Fee(CannabisMedicalUseFeeAmt) = ' + CannabisMedicalUseFeeAmt);
PostMarkDate = new Date(AInfo['Postmark']);
RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
RenewalDueDate = new Date(RenewalDueDateMMDDYY);
DaysLate = (PostMarkDate - RenewalDueDate)/(24*60*60*1000);
MonthDiff = PostMarkDate.getMonth()-RenewalDueDate.getMonth()+(12*(PostMarkDate.getFullYear() - RenewalDueDate.getFullYear()));
if (!appMatch('Licenses/Business/Cannabis/Renewal') && BusLicPercentFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicPercentFeeAmt,'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && BusLicPercentFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicMinFeeAmt,'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && CannabisAdultUseFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_REN_CANA','LIC_BUSINESS_RENEWAL','FINAL',CannabisAdultUseFeeAmt,'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && CannabisAdultUseFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicMinFeeAmt,'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && CannabisMedicalUseFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_REN_CANM','LIC_BUSINESS_RENEWAL','FINAL',CannabisMedicalUseFeeAmt,'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && CannabisMedicalUseFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_REN','LIC_BUSINESS_RENEWAL','FINAL',BusLicMinFeeAmt,'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && CloseDate == null && (DaysLate > 0 && DaysLate < 31) && BusLicPercentFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt *.01* MonthDiff),'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && CloseDate == null && (DaysLate > 0 && DaysLate < 31) && BusLicPercentFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && CloseDate == null && (DaysLate > 0 && DaysLate < 31) && CannabisAdultUseFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && CloseDate == null && (DaysLate > 0 && DaysLate < 31) && CannabisAdultUseFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && CloseDate == null && (DaysLate > 0 && DaysLate < 31) && CannabisMedicalUseFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && CloseDate == null && (DaysLate > 0 && DaysLate < 31) && CannabisMedicalUseFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && CloseDate == null && DaysLate >= 31 && BusLicPercentFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicPercentFeeAmt *.01* MonthDiff),'Y');
 }
if (!appMatch('Licenses/Business/Cannabis/Renewal') && CloseDate == null && DaysLate >= 31 && BusLicPercentFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * .01 *MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && CloseDate == null && DaysLate >= 31 && CannabisAdultUseFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisAdultUseFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Adult Use' && CloseDate == null && DaysLate >= 31 && CannabisAdultUseFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && CloseDate == null && DaysLate >= 31 && CannabisMedicalUseFeeAmt > BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CannabisMedicalUseFeeAmt *.01* MonthDiff),'Y');
 }
if (appMatch('Licenses/Business/Cannabis/Renewal') && getAppSpecific('CannabisBusinessType') == 'Medical Use' && CloseDate == null && DaysLate >= 31 && CannabisMedicalUseFeeAmt < BusLicMinFeeAmt) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1),'Y');
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4),'Y');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.1*.01*MonthDiff),'Y');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt * 0.4*.01*MonthDiff),'Y');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(BusLicMinFeeAmt *.01* MonthDiff),'Y');
 }
if (!feeQty('LIC_BUS_SMF4') > 0 && CloseDate == null) {
 addFee('LIC_BUS_SMF4', 'LIC_BUSINESS_RENEWAL', 'FINAL', '1', 'Y');
 }

}
