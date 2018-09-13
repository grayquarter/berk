
iArr = new Array();
createRefContactsFromCapContactsAndLink(capId, null, iArr, false, false, comparePeopleGenericCOB);
if (!publicUser) {
	branch('ES_CSLB_AFTER');
}
if (!publicUser) {
	editAppSpecific('Plan Review Expiration Date', dateAdd(null, 180));
}
subType = AInfo['Category'] + ' | ' + AInfo['Work Type'];
if (subType != null) {
	updateShortNotes(subType);
}
editConstType('10');
