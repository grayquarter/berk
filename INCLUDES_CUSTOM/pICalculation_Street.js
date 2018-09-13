function pICalculation_Street() {

if (AInfo['RenewMonthNum']=='half year') {
 addFee('LIC_VEND06','LIC_BUSINESS_VENDOR','FINAL','1','Y');
 }
if (AInfo['RenewMonthNum']=='full year') {
 addFee('LIC_VEND05','LIC_BUSINESS_VENDOR','FINAL','1','Y');
 }

}
