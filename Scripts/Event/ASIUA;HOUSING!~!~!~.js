
if (getAppSpecific('Case Type') != null) {
	updateShortNotes(getAppSpecific('Case Type'));
}
vActionFlag = false;

//start replaced branch: EMSE:IsScheduleARec
{
	if (typeof(ACTIONLOG) == 'object' && ACTIONLOG.length > 0) {
		vActionFlag = false;
		vAction = '';
		vTblArray = new Array();
		vRowArray = new Array();
		vTblArray = loadASITable('ACTION LOG');
		for (thisRow in vTblArray)
			//start replaced branch: EMSE:IsScheduleARecLoop
		{
			if (vTblArray[thisRow] != null) {
				vAction = vTblArray[thisRow]['Action'];
			}
			logDebug('Action = ' + vTblArray[thisRow]['Action']);
			if (vAction == 'Schedule A Received') {
				vActionFlag = true;
			}

		}
		//end replaced branch: EMSE:IsScheduleARecLoop;
	}
	if (vActionFlag) {

		//start replaced branch: EMSE:SendNotificationOfScheduleA
		{
			vEmailTemplate = 'HOUSING_SCHEDULE_A_NOTIFICATION';
			vFromEmail = '';
			vToEmail = '';
			emailParameters = aa.util.newHashtable();
			vEmailSent = false;
			firstTime = true;
			getRecordParams4NotificationCOB(emailParameters);
			addParameter(emailParameters, '$$caseType$$', AInfo['Case Type']);
			vFromEmail = 'noreply@cityofberkeley.info';
			vToEmail = 'bnelson.ci.berkeley.ca.us;
				jslivinski.ci.berkeley.ca.us';
			logDebug('vFromEmail= ' + vFromEmail + ';
				vToEmail= ' + vToEmail + ';
				vEmailTemplate= ' + vEmailTemplate + '. emailParameters= ' + emailParameters);

			//start replaced branch: EMSE:NotificationIsFirstTest
			{
				if (typeof(NOTIFICATIONS) == 'object' && NOTIFICATIONS.length > 0) {
					vNoticeType = '';
					vTblArray = new Array();
					vRowArray = new Array();
					vTblArray = loadASITable('NOTIFICATIONS');
					for (thisRow in vTblArray)
						//start replaced branch: EMSE:NotificationIsFirstTestLoop
					{
						if (vTblArray[thisRow] != null) {
							vNoticeType = vTblArray[thisRow]['Type'];
						}
						logDebug('Notice Type = ' + vTblArray[thisRow]['Type']);
						if (vNoticeType == vEmailTemplate) {
							firstTime = false;
						}

					}
					//end replaced branch: EMSE:NotificationIsFirstTestLoop;
				}

			}
			//end replaced branch: EMSE:NotificationIsFirstTest;
			if (firstTime) {
				vEmailSent = sendNotification(vFromEmail, vToEmail, '', vEmailTemplate, emailParameters, null);
			}
			if (vEmailSent) {

				//start replaced branch: EMSE:PostNotificationToTable
				{
					newTblArray = new Array();
					newRowArray = new Array();
					newRowArray['Type'] = vEmailTemplate;
					newRowArray['Date Sent'] = dateAdd(null, 0);
					if (typeof(NOTIFICATIONS) != 'object') {
						newTblArray.push(newRowArray);
						addASITable('NOTIFICATIONS', newTblArray);
					}
					if (typeof(NOTIFICATIONS) == 'object') {
						addToASITable('NOTIFICATIONS', newRowArray);
					}

				}
				//end replaced branch: EMSE:PostNotificationToTable;
			}
			logDebug('Email Sent = ' + vEmailSent);

		}
		//end replaced branch: EMSE:SendNotificationOfScheduleA;
	}

}
//end replaced branch: EMSE:IsScheduleARec;
if (AInfo['Case Type'] != null) {
	updateShortNotes(AInfo['Case Type']);
}
