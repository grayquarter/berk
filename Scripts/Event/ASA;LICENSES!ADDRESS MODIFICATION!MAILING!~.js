
contactType = 'Applicant';
ca = null;
p = null;
contactToEdit = null;
contactTypeArray = new Array(contactType);
iArr = new Array();
if (parentCapId) {
	capContacts = aa.people.getCapContactByCapID(parentCapId).getOutput();
}
if (capContacts) {
	for (thisContact in capContacts)
		if (contactType.equals(capContacts[thisContact].getCapContactModel().getPeople().getContactType()))
			contactToEdit = capContacts[thisContact];
}
if (contactToEdit) {
	ca = contactToEdit.getCapContactModel().getPeople().getCompactAddress();
}
if (ca) {
	if (AInfo['Address Line 1'] != '')
		ca.setAddressLine1(AInfo['Address Line 1']);
	else
		ca.setAddressLine1('');
}
if (ca) {
	if (AInfo['Address Line 2'] != '')
		ca.setAddressLine2(AInfo['Address Line 2']);
	else
		ca.setAddressLine2('');
}
if (ca) {
	if (AInfo['City'] != '')
		ca.setCity(AInfo['City']);
	else
		ca.setCity('');
}
if (ca) {
	if (AInfo['State'] != '')
		ca.setState(AInfo['State']);
	else
		ca.setState('');
}
if (ca) {
	if (AInfo['Zip'] != '')
		ca.setZip(AInfo['Zip']);
	else
		ca.setZip('');
}
if (contactToEdit) {
	p = contactToEdit.getCapContactModel().getPeople();
}
if (p) {
	if (AInfo['Phone'] != '')
		p.setPhone1(AInfo['Phone']);
	else
		p.setPhone1('');
}
if (p) {
	if (AInfo['Mobile Phone'] != '')
		p.setPhone2(AInfo['Mobile Phone']);
	else
		p.setPhone2('');
}
if (p) {
	if (AInfo['Fax'] != '')
		p.setFax(AInfo['Fax']);
	else
		p.setFax('');
}
if (contactToEdit) {
	aa.people.editCapContact(contactToEdit.getCapContactModel());
}
if (contactToEdit) {
	createRefContactsFromCapContactsAndLink(parentCapId, contactTypeArray, iArr, false, true, comparePeopleGeneric);
}
updateAppStatus('Approved', 'Instant Approval and update via ACA');
