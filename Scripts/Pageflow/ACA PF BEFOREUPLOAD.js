
cancel = true;
if (appTypeArray[0] == 'Building' && appTypeArray[1] == 'Minor' && appTypeArray[2] == 'NA' && appTypeArray[3] == 'NA') {
 
//start replaced branch: EMSE:ACARequireMinorPerimtAttachment
 {
var plansRequired = false;
var plansFound = false;
var docList = new Array();
if (AInfo['Type of Work'] == 'Solar PV' || AInfo['Type of Work'] == 'EV Charging') {
 plansRequired = true;
 }
if (plansRequired) {
 var tmpCapStr = capId.getID1() + '-' + capId.getID2() + '-' + capId.getID3();
 var docList = aa.document.getDocumentListByEntity(tmpCapStr, 'TMP_CAP').getOutput().toArray();
 }
if (plansRequired) {
 for (xdoc in docList) if (docList[xdoc].getDocCategory() == 'Plans') plansFound = true;
 }
if (plansRequired && !plansFound) {
 cancel=true;
 showMessage=true;
 message='You are required to upload a set of plans when the type of work is \'' + AInfo['Type of Work'] + '\'. Please upload a set of plans in order to continue to the next step.';
 }

}
//end replaced branch: EMSE:ACARequireMinorPerimtAttachment;
 }

