
emailSendFrom = 'noreply@cityofberkeley.info';
emailSendTo = '';
emailStaffCC = '';
emailTemplate = 'DUA_BLD_CONTACT NOTIFICATION_CHECKIN';
fileNames = [];
emailParameters = aa.util.newHashtable();
getRecordParams4NotificationCOB(emailParameters);
if (lookup('LOOKUP:ScriptResources','Environment') == 'UAT' || lookup('LOOKUP:ScriptResources','Environment') == 'DEV') {
 emailSendTo = 'rcarrillo@cityofberkeley.info';
 }
acaUrl = 'http://10.1.1.80/CitizenAccessDev/';
getACARecordParam4Notification(emailParameters,acaUrl);
if (emailSendTo == '') {
 contactArray = getContactArray();
 if(typeof(contactArray == 'object')) for (eachContact in contactArray) 
//start replaced branch: EMSE:DUA_BLD_GET CONTACT DETAILS
 {
thisContact = contactArray[eachContact];
if (thisContact['contactType'] == 'Applicant') {
 getContactParams4Notification(emailParameters,thisContact);
 emailSendTo = thisContact['email'];
 comment('Applicant email: ' + emailSendTo);
 }

}
//end replaced branch: EMSE:DUA_BLD_GET CONTACT DETAILS;
 }
if (emailSendTo != '') {
 sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
 }

