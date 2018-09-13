function gETCONTACTDETAILS() {

thisContact = contArray[eachCont];
if (thisContact['contactType'] == 'Applicant') {
 getContactParams4Notification(emailParameters,thisContact);
 }

}
