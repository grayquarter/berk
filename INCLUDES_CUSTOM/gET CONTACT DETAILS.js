function gET CONTACT DETAILS() {

if (contactArray!=null) {
 thisContact = contactArray[eachContact];
 }
if (thisContact['contactType'] == 'Applicant') {
 getContactParams4Notification(emailParameters,thisContact);
 emailSendTo = thisContact['email'];
 }

}
