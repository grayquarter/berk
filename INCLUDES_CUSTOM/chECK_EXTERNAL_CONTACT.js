function chECK_EXTERNAL_CONTACT() {

addRefContact = true;
var taskAssignmentNameArray = lookup('EXTERNAL_REVIEWERS',taskAssignment).split(' ');
taskAssignmentFirstName = taskAssignmentNameArray[0];
taskAssignmentLastName = taskAssignmentNameArray[1];
comment(taskAssignmentNameArray);
comment(taskAssignmentFirstName);
comment(taskAssignmentLastName);
emailParameters = aa.util.newHashtable();
contArray = getContactArray();
if (contArray !=null) for (eachCont in contArray) 
//start replaced branch: EMSE:DRUA_GET EXTERNAL CONTACT DETAILS
 {
thisContact = contArray[eachCont];
if (matches(thisContact['contactType'],'Individual','Organization','External Reviewer') && taskAssignmentFirstName == thisContact['firstName'] && taskAssignmentLastName == thisContact['lastName']) {
 addRefContact = false;
 }

}
//end replaced branch: EMSE:DRUA_GET EXTERNAL CONTACT DETAILS;
if (addRefContact == true) comment('Need to add this ref contact');
if (addRefContact == false) comment('This ref contact already exists.');
if (addRefContact == true) {
 addReferenceContactByName(taskAssignmentFirstName,null,taskAssignmentLastName);
 }

}
