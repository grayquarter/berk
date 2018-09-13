
if (AInfo['Work Order Status'] != null && isTaskActive('Work Order Tasks') && appMatch('AMS/SEWER/NA/NA')) {
	var enableDebugMode = false;
	var arrParams = new Array();
	arrParams.push('alternateId=' + capIDString);
	arrParams.push('taskDescription=' + encodeURIComponent('Work Order Tasks'));
	arrParams.push('disposition=' + encodeURIComponent(AInfo['Work Order Status']));
	arrParams.push('recordBy=' + currentUserID);
	externalLaganWSCallForAssetManagementWTUA(arrParams, enableDebugMode);
}
if (AInfo['Work Order Status'] != null && isTaskActive('Work Order Tasks')) {
	updateAppStatus(AInfo['Work Order Status'], 'Updated by Script');
	if (AInfo['Work Order Status'] == 'Field Work Completed')
		closeTask('Work Order Tasks', AInfo['Work Order Status'], 'Updated by Script', 'Updated by Script');
	else
		updateTask('Work Order Tasks', AInfo['Work Order Status'], 'Updated by Script', 'Updated by Script');
}
if (appTypeArray[3] != 'Maintain' && AInfo['Work Order Status'] == 'Field Work Completed' && (AInfo['Jet Flush'] == 'CHECKED' || AInfo['CCTV'] == 'CHECKED' || AInfo['Handrod'] == 'CHECKED' || AInfo['Dig and Repair'] == 'CHECKED' || AInfo['Root Foam'] == 'CHECKED' || AInfo['Engineering'] == 'CHECKED' || AInfo['Other Follow Up'] == 'CHECKED')) {

	//start replaced branch: ES_CreateChildAssetWorkOrder
	{
		arrAssetList = cap.getCapModel().getAssetList().toArray();
		if (arrAssetList.length >= 1 && (AInfo['Jet Flush'] == 'CHECKED' || AInfo['Handrod'] == 'CHECKED' || AInfo['Root Foam'] == 'CHECKED')) {
			for (iCntr in arrAssetList)
				//start replaced branch: ES_CreateChildAssetWorkOrder_Loop_JetFlush
			{
				capNewChildWO = null;
				capNewChildWO = createChild('AMS', 'Sewer', arrAssetList[iCntr].getG1AssetType(), 'Maintain', 'Auto Generated');
				if (capNewChildWO) {
					saveCapId = capId;
					capId = capNewChildWO;
					assignCapDept('PW-Sewer Maintenance');
					capId = saveCapId;
					vNewWorkOrderAssetScriptModel = aa.asset.newWorkOrderAssetScriptModel().getOutput();
					vWorkOrderAssetModel = vNewWorkOrderAssetScriptModel.getWorkOrderAssetModel();
					vWorkOrderAssetModel.setCapID(capNewChildWO);
					vWorkOrderAssetModel.setAssetPK(arrAssetList[iCntr].getAssetPK());
					var resultCreateWOAsset = aa.asset.createWorkOrderAsset(vWorkOrderAssetModel);
					logDebug('Successfully added asset to record ID ' + capNewChildWO.getCustomID() + ': ' + resultCreateWOAsset.getSuccess());
				}

			}
			//end replaced branch: ES_CreateChildAssetWorkOrder_Loop_JetFlush;
		}
		if (arrAssetList.length >= 1 && AInfo['CCTV'] == 'CHECKED') {
			for (iCntr in arrAssetList)
				//start replaced branch: ES_CreateChildAssetWorkOrder_Loop_CCTV
			{
				capNewChildWO = null;
				capNewChildWO = createChild('AMS', 'Sewer', arrAssetList[iCntr].getG1AssetType(), 'Inspect', 'Auto Generated');
				if (capNewChildWO) {
					saveCapId = capId;
					capId = capNewChildWO;
					assignCapDept('PW-Sewer Maintenance');
					capId = saveCapId;
					vNewWorkOrderAssetScriptModel = aa.asset.newWorkOrderAssetScriptModel().getOutput();
					vWorkOrderAssetModel = vNewWorkOrderAssetScriptModel.getWorkOrderAssetModel();
					vWorkOrderAssetModel.setCapID(capNewChildWO);
					vWorkOrderAssetModel.setAssetPK(arrAssetList[iCntr].getAssetPK());
					var resultCreateWOAsset = aa.asset.createWorkOrderAsset(vWorkOrderAssetModel);
					logDebug('Successfully added asset to record ID ' + capNewChildWO.getCustomID() + ': ' + resultCreateWOAsset.getSuccess());
				}

			}
			//end replaced branch: ES_CreateChildAssetWorkOrder_Loop_CCTV;
		}
		if (arrAssetList.length >= 1 && AInfo['Dig and Repair'] == 'CHECKED') {
			for (iCntr in arrAssetList)
				//start replaced branch: ES_CreateChildAssetWorkOrder_Loop_DigandRepair
			{
				capNewChildWO = null;
				capNewChildWO = createChild('AMS', 'Sewer', arrAssetList[iCntr].getG1AssetType(), 'Repair', 'Auto Generated');
				if (capNewChildWO) {
					saveCapId = capId;
					capId = capNewChildWO;
					assignCapDept('PW-Sewer Maintenance');
					capId = saveCapId;
					vNewWorkOrderAssetScriptModel = aa.asset.newWorkOrderAssetScriptModel().getOutput();
					vWorkOrderAssetModel = vNewWorkOrderAssetScriptModel.getWorkOrderAssetModel();
					vWorkOrderAssetModel.setCapID(capNewChildWO);
					vWorkOrderAssetModel.setAssetPK(arrAssetList[iCntr].getAssetPK());
					var resultCreateWOAsset = aa.asset.createWorkOrderAsset(vWorkOrderAssetModel);
					logDebug('Successfully added asset to record ID ' + capNewChildWO.getCustomID() + ': ' + resultCreateWOAsset.getSuccess());
				}

			}
			//end replaced branch: ES_CreateChildAssetWorkOrder_Loop_DigandRepair;
		}
		if (arrAssetList.length >= 1 && AInfo['Engineering'] == 'CHECKED') {
			for (iCntr in arrAssetList)
				//start replaced branch: ES_CreateChildAssetWorkOrder_Loop_Engineering
			{
				capNewChildWO = null;
				capNewChildWO = createChild('AMS', 'Sewer', arrAssetList[iCntr].getG1AssetType(), 'Repair', 'Auto Generated');
				if (capNewChildWO) {
					saveCapId = capId;
					capId = capNewChildWO;
					assignCapDept('PW-Engineering Sewer');
					capId = saveCapId;
					vNewWorkOrderAssetScriptModel = aa.asset.newWorkOrderAssetScriptModel().getOutput();
					vWorkOrderAssetModel = vNewWorkOrderAssetScriptModel.getWorkOrderAssetModel();
					vWorkOrderAssetModel.setCapID(capNewChildWO);
					vWorkOrderAssetModel.setAssetPK(arrAssetList[iCntr].getAssetPK());
					var resultCreateWOAsset = aa.asset.createWorkOrderAsset(vWorkOrderAssetModel);
					logDebug('Successfully added asset to record ID ' + capNewChildWO.getCustomID() + ': ' + resultCreateWOAsset.getSuccess());
				}

			}
			//end replaced branch: ES_CreateChildAssetWorkOrder_Loop_Engineering;
		}

	}
	//end replaced branch: ES_CreateChildAssetWorkOrder;
}
