

//replaced branch(EMSE:WTUA:NewRowGRAduit_AdjustedGrossReceipt)
newRowGRAduit_AdjustedGrossReceipt();
if (AInfo['ConLicNum']) {
 conLicNum = AInfo['ConLicNum'];
 } else {
 conLicNum='';
 }
if (wfTask == 'License Issuance' && matches(wfStatus,'Approved','Approved with Conditions')) {
 newLicIdString='BL-'+capId.getCustomID().slice(-6);
 //showMessage= true;
 comment('Testing scope. ParentCapID# is: ' + newLicIdString);
 showMessage= false;
 }
if (wfTask == 'License Issuance' && matches(wfStatus,'Approved','Approved with Conditions') && conLicNum.substr(0,1) >0 && conLicNum.substr(0,6) <999999) {
 externalLP_CA_COB2(newLicIdString,'Construction or Contractor',true,false,null);
 }

