function cONTACT NOTIFICATION_PLAN CHECK COMPLETED() {

emailSendFrom = 'noreply@cityofberkeley.info';
emailSendTo = '';
emailStaffCC = '';
if (wfStatus == 'Corrections List Issued') emailTemplate = 'WTUA_BLD_CONTACT NOTIFICATION_CORRECTIONS';
if (wfStatus == 'Ready To Issue') emailTemplate = 'WTUA_BLD_CONTACT NOTIFICATION_APPROVAL';
fileNames = [];
emailParameters = aa.util.newHashtable();
getRecordParams4Notification(emailParameters);
getPrimaryAddressLineParam4Notification(emailParameters);
//addParameter(emailParameters,'$$wfComment$$',wfComment);
acaUrl = 'http://aca.cityofberkeley.info/Community/';
getACARecordParam4Notification(emailParameters,acaUrl);
if (emailSendTo == '') {
 contactArray = getContactArray();
 if(typeof(contactArray == 'object')) for (eachContact in contactArray) 
//start replaced branch: EMSE:WTUA_GET CONTACT DETAILS
 {
thisContact = contactArray[eachContact];
if (thisContact['contactType'] == 'Applicant' && thisContact['email'] != null) {
 getContactParams4Notification(emailParameters,thisContact);
 emailSendTo = thisContact['email'];
 }

}
//end replaced branch: EMSE:WTUA_GET CONTACT DETAILS;
 }
if (emailSendTo != '') {
 sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
 }

}
