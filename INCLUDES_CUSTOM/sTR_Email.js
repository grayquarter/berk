function sTR_Email() {

emailSendFrom='';
emailSendTo='';
emailSendCC='';
emailParameters = aa.util.newHashtable();
fileList=[];
//emailTemplate is set in WTUA:Planning/Zoning Certificate/Short Term Rental/NA;
if ((!emailSendTo.indexOf('@cityofberkeley') >= 0) && ( lookup('LOOKUP:ScriptResources','Environment') == 'DEV' || lookup('LOOKUP:ScriptResources','Environment') == 'UAT')) {
 emailSendTo = 'accelateam@cityofberkeley.info';
 }
reportName = '';
reportParameters = aa.util.newHashMap();
generateReportOutput='';
getRecordParams4NotificationCOB(emailParameters);
getWorkflowParams4Notification(emailParameters);
acaURL='https://acadev.cityofberkeley.info/CitizenAccessDev/';
getACARecordParam4Notification(emailParameters, acaURL);
if (emailSendTo == '') {
 contactArray= getContactArray();
 if (contactArray!=null) for (eachContact in contactArray) 
//replaced branch(EMSE:CTRCA_GET CONTACT DETAILS)
gET CONTACT DETAILS();
 }
if ((lookup('LOOKUP:ScriptResources','Environment') == 'UAT' || lookup('LOOKUP:ScriptResources','Environment') == 'DEV' ) && emailSendTo.indexOf('cityofberkeley') >= 0) {
 sendNotification(emailSendFrom, emailSendTo, emailSendCC, emailTemplate, emailParameters, fileList);
 }
if (emailSendTo != '') {
 sendNotification(emailSendFrom, emailSendTo, emailSendCC, emailTemplate, emailParameters, fileList);
 }

}
