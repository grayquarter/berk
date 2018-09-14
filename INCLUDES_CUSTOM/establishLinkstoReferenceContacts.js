function establishLinkstoReferenceContacts() {

iArr = new Array();
// attributes to ignore;
contactTypeArray = new Array('Applicant','Business Owner','Corporate Officer','Director','Manager','Officer','Partner','President','Respondent','Shareholder');
createRefContactsFromCapContactsAndLink(capId,contactTypeArray,iArr,false,false,comparePeopleGeneric);

}
