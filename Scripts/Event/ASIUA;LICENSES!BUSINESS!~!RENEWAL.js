
if (AInfo['Moved'] == 'No') {
	setTask('Toxic Review', 'N', 'N');
	setTask('Zoning Review', 'N', 'N');
	setTask('Fire Review', 'N', 'N');
	setTask('Application Acceptance', 'N', 'N');
	setTask('Building Review', 'N', 'N');
	setTask('Health Review', 'N', 'N');
	updateTask('License Issuance', 'Approved', '', 'No changes to the business;status updated via script');
}

//replaced branch(EMSE:LicProfLookup:getLicenses)
licProfLookup: getLicenses();
//Get License CAP;
