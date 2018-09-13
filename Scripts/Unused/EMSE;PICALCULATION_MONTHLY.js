
PostMarkDate = new Date(AInfo['Postmark']);
RenewalDueDateMMDDYY = '02/28/' + (parseInt(AInfo['RenewYear']) + parseInt(1));
RenewalDueDate = new Date(RenewalDueDateMMDDYY);
comment(RenewalDueDate);
DaysLate = parseInt((PostMarkDate - RenewalDueDate)/(24*60*60*1000));
comment(DaysLate);
DaysLatePos = DaysLate * -1;
comment('what is the value of DaysLate = ' + DaysLate + ' DaysLatePos = ' + DaysLatePos);
TodayMMDDYYYY = new Date();
var dd = TodayMMDDYYYY.getDate();
var mm = TodayMMDDYYYY.getMonth()+1;
var yyyy = TodayMMDDYYYY.getFullYear();
TodayMMDDYYYY = mm+'/'+dd+'/'+yyyy;
comment(TodayMMDDYYYY);
Today = new Date(TodayMMDDYYYY);
DaysAccrue = parseInt((Today - RenewalDueDate)/(24*60*60*1000));
comment(DaysAccrue);
AccrueMonthDiff = Today.getMonth()-RenewalDueDate.getMonth()+(12*(Today.getFullYear() - RenewalDueDate.getFullYear()));
comment(AccrueMonthDiff);
MonthDiff = PostMarkDate.getMonth()-RenewalDueDate.getMonth()+(12*(PostMarkDate.getFullYear() - RenewalDueDate.getFullYear()));
comment(MonthDiff);
CurrentTaxBalance = feeBalance('LIC_BUS_REN','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_ADJ_REN','LIC_BUSINESS_RENEWAL');
comment(CurrentTaxBalance);
CurrentPen1Balance = feeBalance('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_ADJ_PEN','LIC_BUSINESS_RENEWAL');
comment(CurrentPen1Balance);
CurrentPen2Balance = feeBalance('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL') + feeBalance('LIC_ADJ_PEN2','LIC_BUSINESS_RENEWAL');
comment(CurrentPen2Balance);
if (DaysAccrue > 0 && DaysAccrue < 31 && CurrentTaxBalance >0) {
 addFee('LIC_BUS_PEN','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance * 0.1),'N');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance * 0.1*.01),'N');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance *.01),'N');
 }
if (DaysAccrue >= 31 && DaysAccrue <=60 && CurrentTaxBalance >0) {
 addFee('LIC_BUS_PEN2','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance * 0.4),'N');
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CurrentPen1Balance * .01),'N');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance * 0.4*.01),'N');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance *.01),'N');
 }
if (DaysAccrue > 60 && CurrentTaxBalance >0) {
 addFee('LIC_BUS_LAT','LIC_BUSINESS_RENEWAL','FINAL',(CurrentPen1Balance * .01),'N');
 addFee('LIC_BUS_LAT2','LIC_BUSINESS_RENEWAL','FINAL',(CurrentPen2Balance*.01),'N');
 addFee('LIC_BUS_PLAT','LIC_BUSINESS_RENEWAL','FINAL',(CurrentTaxBalance *.01),'N');
 }

