
var inspOverrideID = null;
capDetailObj = aa.cap.getCapDetail(capId);
if (capDetailObj.getSuccess()) inspOverrideID = capDetailObj.getOutput().getCapDetailModel().getInspectorName();
if (typeof inspInspector == 'undefined' || inspInspector == null || inspInspector == '') {
 if (inspOverrideID == '' || inspOverrideID == null) 
//start replaced branch: EMSE:AssignInspectorFromParcelDist
 {
var inspUserName=null;
if (AInfo['ParcelAttribute.InspectionDistrict'] == null || AInfo['ParcelAttribute.InspectionDistrict'] == '') {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspector was not assigned</b></font><br>The parcel attached to the Permit does not have an Inspection District set.<br>');
 } else {
 inspUserName = lookup('LOOKUP:BuildingInspectorUserName',AInfo['ParcelAttribute.InspectionDistrict']);
 }
if (inspUserName) {
 assignInspection(inspId,inspUserName);
 } else {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspector was not assigned</b></font><br>The value for Inspector District ' ' + AInfo['ParcelAttribute.InspectionDistrict'] + ' was not found in the Inspector look up table.<br>');
 }

}
//end replaced branch: EMSE:AssignInspectorFromParcelDist;
 else assignInspection(inspId,inspOverrideID);
 }

