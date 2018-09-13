
addFee('FP230', 'PWORKS', 'FINAL', 1, 'N');
addFee('FP100', 'PWORKS', 'FINAL', 1, 'N');
iArr = new Array();
createRefContactsFromCapContactsAndLink(capId, null, iArr, false, false, comparePeopleGenericCOB);
if (!publicUser) {
	branch('ES_CSLB_AFTER');
}
subType = AInfo['Work Subtype'];
if (subType != null) {
	updateShortNotes(subType);
}
editConstType('10');
if (!publicUser) {
	editAppSpecific('Plan Review Expiration Date', dateAdd(null, 180));
	editAppSpecific('Filing Date', dateAdd(null, 0));
}
