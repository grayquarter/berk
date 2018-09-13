
if (getAppSpecific('Work Subtype') != null) {
	updateShortNotes(getAppSpecific('Work Subtype'));
}

//start replaced branch: EMSE:SetExtensions
{
	if (AInfo['Permit Extension'] != null && AInfo['Permit Extension'] != '') {

		//start replaced branch: EMSE:UpdatePermitExpirePW
		{
			vExtPeriod = 90;
			if (AInfo['Work Subtype'] == 'Construction Parking') {
				vExtPeriod = 90;
			}
			if (AInfo['Permit Extension'] != AInfo['Permit Extensions'] && AInfo['Permit Extension'] != 'Additional Extensions') {
				currentPCX = getAppSpecific('Permit Expiration Date');
				editAppSpecific('Permit Expiration Date', dateAdd(currentPCX, vExtPeriod * 1));
				editAppSpecific('Permit Extensions', AInfo['Permit Extension']);
			}
			if (AInfo['Permit Extension'] == 'Additional Extensions' && AInfo['Permit Extension'] != AInfo['Permit Extensions']) {
				currentPCX = getAppSpecific('Permit Expiration Date');
				editAppSpecific('Permit Expiration Date', dateAdd(currentPCX, vExtPeriod * 1));
				editAppSpecific('Permit Extensions', AInfo['Permit Extension']);
			}
			if (AInfo['Permit Extension'] == 'Additional Extensions' && AInfo['Permit Extension'] == AInfo['Permit Extensions'] && AInfo['Permit Additional Extension'] == 'Apply') {
				currentPCX = getAppSpecific('Permit Expiration Date');
				editAppSpecific('Permit Expiration Date', dateAdd(currentPCX, vExtPeriod * 1));
				editAppSpecific('Permit Extensions', AInfo['Permit Extension']);
				editAppSpecific('Permit Additional Extension', null);
			}

		}
		//end replaced branch: EMSE:UpdatePermitExpirePW;
	}

}
//end replaced branch: EMSE:SetExtensions;
