function solano_Fees() {

solanoDistrict = 'NoSolano';
solanoDistrict = AInfo['BID'];
capSubType=appTypeArray[2];
solanoBusinessType='';
if (matches(capSubType,'Administrative Headquarters','Auto Vehicle For Hire','Business Personal Repair Svs','Entertainment Recreation','Manufacturing','Wholesale Trade','Recycling','Solicitor')) {
 solanoBusinessType='Service';
 }
if (matches(capSubType,'Cannabis','Food Vendors','Grocer','Motor Vehicle Sales','Retail Trade','Street Vendors')) {
 solanoBusinessType='Retailer';
 }
if (matches(capSubType,'Massage','Professional SemiProfessional')) {
 solanoBusinessType='Professional';
 }
if (solanoDistrict == 'A' &&  solanoBusinessType=='Service') {
 feeCode='SOL110';
 }
if (solanoDistrict == 'B' && solanoBusinessType=='Service') {
 feeCode='SOL120';
 }
if (solanoDistrict == 'A' && solanoBusinessType=='Professional') {
 feeCode='SOL030';
 }
if (solanoDistrict == 'B' && solanoBusinessType=='Professional') {
 feeCode='SOL040';
 }
if (solanoDistrict == 'A' && solanoBusinessType=='Retailer' && AInfo['EmployeeNum'] <= 5) {
 feeCode='SOL050';
 }
if (solanoDistrict == 'A' && solanoBusinessType=='Retailer' && (AInfo['EmployeeNum'] > 5 && AInfo['EmployeeNum'] <=9)) {
 feeCode='SOL070';
 }
if (solanoDistrict == 'A' && solanoBusinessType=='Retailer' && AInfo['EmployeeNum'] >= 10) {
 feeCode='SOL060';
 }
if (solanoDistrict == 'B' && solanoBusinessType=='Retailer' && AInfo['EmployeeNum'] <= 5) {
 feeCode='SOL080';
 }
if (solanoDistrict == 'B' && solanoBusinessType=='Retailer' && (AInfo['EmployeeNum'] > 5 && AInfo['EmployeeNum'] <=9)) {
 feeCode='SOL100';
 }
if (solanoDistrict == 'B' && solanoBusinessType=='Retailer' && AInfo['EmployeeNum'] >= 10) {
 feeCode='SOL090';
 }
if ((solanoDistrict == 'A' || solanoDistrict == 'B') && solanoBusinessType.length) {
 addFee(feeCode,'LIC_SOLANO','FINAL',1,'N');
 }
comment('value of solanoDistrict is: ' + solanoDistrict);
if (solanoDistrict == 'NoSolano' || solanoDistrict == false) {
 showMessage=true;
 comment('<font color='red'><b>ERROR: No response from GIS Solano BID check. Please check this address manually.</b></font>');
 }

}
