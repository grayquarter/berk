
aa.runScript('ConvertToRealCapAfter4Renew');

//start replaced branch: EMSE:CTRCA_Renewal_Workflow_Disabled
 {
setTask('Toxics Review','N','N');
setTask('Zoning Review','N','N');
setTask('Fire Review','N','N');
setTask('Application Acceptance','N','N');
setTask('Building Review','N','N');
setTask('Health Review','N','N');
setTask('License Issuance','Y','N');
setTask('Address Assignment','N','N');
if (appMatch('Licenses/Business/Massage/*')) {
 setTask('Zoning Review','N','N');
 setTask('Establishment Permit','Y','N');
 setTask('Therapist Permit','Y','N');
 setTask('License Issuance','N','N');
 }
if (appMatch('Licenses/Business/Auto Vehicle For Hire/*')) {
 setTask('Zoning Review','N','N');
 setTask('Owner Permit','Y','N');
 setTask('Vehicle Permit','Y','N');
 setTask('Driver Permit','Y','N');
 setTask('License Issuance','N','N');
 }

}
//end replaced branch: EMSE:CTRCA_Renewal_Workflow_Disabled;

//replaced branch(EMSE:LicProfLookup:getLicenses)
licProfLookup:getLicenses();
//Get License CAP;
if (licCapId !=null) {
 comment('what is licCapId ' + licCapId);
 copyOwner(licCapId,capId);
 copyParcels(licCapId,capId);
 copyParcelGisObjects();
 }
var ignore = lookup('EMSE:ASI Copy Exceptions','License/*/*/*');
var ignoreArr = new Array();
if(ignore != null) ignoreArr = ignore.split('|');
copyAppSpecific(licCapId,ignoreArr);
licEditExpInfo('Active','12/31/' + (parseInt(AInfo['RenewYear']) + parseInt(1)));

//start replaced branch: EMSE:CTRCA_Update_Contacts_DBA
 {
var vContactResult = AInfo[''];
vContactsExist = false;
vContactAry = new Array();
var vContactResult = aa.people.getCapContactByCapID(licCapId);
if (vContactResult.getSuccess()) {
 vContactsExist = true;
 }
if (vContactsExist) {
 vContactAry = vContactResult.getOutput();
 comment(vContactAry);
 }
if (vContactsExist) {
 for ( yy in vContactAry ) branch( 'EMSE:CheckForAndDeleteReportingPartyContact');
 }
DBA = cap.getSpecialText();
comment(DBA);
editAppName(DBA,licCapId);
comment('what is licCapId ' + licCapId);
aa.cap.copyCapWorkDesInfo(capId,licCapId);
aa.cap.copyCapDetailInfo(capId,licCapId);
copyContacts(capId,licCapId);
copyOwner(capId,licCapId);
copyParcels(capId,licCapId);
comment(capId);
comment(licCapId);

}
//end replaced branch: EMSE:CTRCA_Update_Contacts_DBA;
licProfLookup();
setRenewalProjectComplete();
if (AInfo['BID_Elmwood'] == 'Elmwood') {
 
//start replaced branch: EMSE:Elmwood_Fees
 {
var elmwoodBusinessType='';
var capSubType=appTypeArray[2];
naicsCode = AInfo['NAICS'];
if (matches(capSubType,'Retail Trade') && naicsCode.indexOf('722') != 0) {
 elmwoodBusinessType='Retail';
 }
if (matches(capSubType, 'Grocer')) {
 elmwoodBusinessType='Retail';
 }
if (matches(capSubType, 'Manufacturing')) {
 elmwoodBusinessType = 'Retail';
 }
if (matches(capSubType,'Retail Trade') && naicsCode.indexOf('722') == 0) {
 elmwoodBusinessType='Restaurant';
 }
if (matches(capSubType,'Professional SemiProfessional')) {
 elmwoodBusinessType='Professional';
 }
if (matches(capSubType,'Entertainment Recreation')) {
 elmwoodBusinessType='Entertainment';
 }
if (matches(capSubType,'Business Personal Repair Svs') && (naicsCode.indexOf('81211') != 0 || naicsCode.indexOf('812930') != 0)) {
 elmwoodBusinessType='BPRS';
 }
if (matches(capSubType,'Business Personal Repair Svs') && naicsCode.indexOf('81211') == 0) {
 elmwoodBusinessType='HairNailSkin';
 }
if (matches(capSubType,'Business Personal Repair Svs') && naicsCode.indexOf('812930') == 0) {
 elmwoodBusinessType='Parking';
 }
if (elmwoodBusinessType== 'Retail' && parseInt(AInfo['GrossReceipt']) <= 350000) {
 addFee('ELM010','LIC_ELMWOOD','FINAL',250,'N');
 }
if (elmwoodBusinessType== 'Retail' && parseInt(AInfo['GrossReceipt'])  >350000 && parseInt(AInfo['GrossReceipt']) <= 999000) {
 addFee('ELM010','LIC_ELMWOOD','FINAL',350,'N');
 }
if (elmwoodBusinessType== 'Retail' && parseInt(AInfo['GrossReceipt']) > 999000) {
 addFee('ELM010','LIC_ELMWOOD','FINAL',500,'N');
 }
if (elmwoodBusinessType== 'Restaurant') {
 addFee('ELM010','LIC_ELMWOOD','FINAL',500,'N');
 }
if (elmwoodBusinessType== 'Professional' &&  parseInt(AInfo['AdjustedGrossReceipt']) < 100000) {
 addFee('ELM010','LIC_ELMWOOD','FINAL',300,'N');
 }
if (elmwoodBusinessType== 'Professional' &&  parseInt(AInfo['AdjustedGrossReceipt']) >= 100000) {
 addFee('ELM010','LIC_ELMWOOD','FINAL',400,'N');
 }
if (elmwoodBusinessType== 'Entertainment') {
 addFee('ELM010','LIC_ELMWOOD','FINAL',450,'N');
 }
if (elmwoodBusinessType== 'BPRS') {
 addFee('ELM010','LIC_ELMWOOD','FINAL',200,'N');
 }
if (elmwoodBusinessType== 'HairNailSkin') {
 addFee('ELM010','LIC_ELMWOOD','FINAL',250,'N');
 }
if (elmwoodBusinessType== 'Parking') {
 addFee('ELM010','LIC_ELMWOOD','FINAL',1000,'N');
 }

}
//end replaced branch: EMSE:Elmwood_Fees;
 }

//replaced branch(EMSE:Solano_Fees)
solano_Fees();

