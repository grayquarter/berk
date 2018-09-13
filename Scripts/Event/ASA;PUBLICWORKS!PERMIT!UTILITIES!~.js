
subType = AInfo['Work Subtype'] + ' ' + AInfo['Type of Service'];
if (AInfo['Excavation']) {
	subType += ' & Excavation';
}
if (subType != null) {
	updateShortNotes(subType);
}
if (subType != null) {
	updateWorkDesc(subType);
}
addFee('FP1000', 'PWORKS', 'FINAL', 2, 'N');
addFee('FP420', 'PWORKS', 'FINAL', 1, 'N');
