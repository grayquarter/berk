
if (matches(currentUserID, 'ADMIN', 'JWHITE', 'GLAMY')) {
	showDebug = 0;
	showMessage = false;

	//replaced branch(EMSE:GlobalFlags)
	globalFlags();
}
if ((typeof(VIOLATIONS) == 'object' && VIOLATIONS.length) > 0 || (typeof(VIOLATIONSR2) == 'object' && VIOLATIONSR2.length) > 0) {
	vTooLongFlag = false;
}
if ((typeof(VIOLATIONS) == 'object' && VIOLATIONS.length) > 0) {
	loadASITablesBefore();
	if (typeof(VIOLATIONS) == 'object')
		for (eachrow in VIOLATIONS)
			//start replaced branch: EMSE:CheckViolationTextLimit
		{
			vViolation = VIOLATIONS[eachrow];
			strValue = vViolation['Narrative Text'].toString();
			if (strValue.length > 0) {
				logDebug('Violation = ' + vViolation['Narrative Text']);
			}
			if (strValue.length > 880) {
				vTooLongFlag = true;
			}

		}
	//end replaced branch: EMSE:CheckViolationTextLimit;
}
if ((typeof(VIOLATIONSR2) == 'object' && VIOLATIONSR2.length) > 0) {
	loadASITablesBefore();
	if (typeof(VIOLATIONSR2) == 'object')
		for (eachrow in VIOLATIONSR2)
			//start replaced branch: EMSE:CheckViolationTextLimitR2
		{
			vViolation = VIOLATIONSR2[eachrow];
			strValue = vViolation['Narrative Text'].toString();
			if (strValue.length > 0) {
				logDebug('Violation = ' + vViolation['Narrative Text']);
			}
			if (strValue.length > 870) {
				vTooLongFlag = true;
			}

		}
	//end replaced branch: EMSE:CheckViolationTextLimitR2;
}
if (vTooLongFlag) {
	showMessage = true;
	showDebug = 0;
	comment('Please limit the length of each violation text area to 870 characters or less.');
	cancel = true;
}
