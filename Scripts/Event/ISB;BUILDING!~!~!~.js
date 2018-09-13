
if (appMatch('Building/Permit/NA/NA') &&AInfo['AllowBlockedInspections'] != 'Yes' && (capId.getCustomID().indexOf('-E') > -1 || capId.getCustomID().indexOf('-M') > -1 || capId.getCustomID().indexOf('-P') > -1)) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>You are attempting to schedule an inspection on an electrical, mechanical, or plumbing permit. All inspections must be scheduled against the building permit.<br>');
 cancel = true;
 }
if (appMatch('Building/Permit/NA/NA') &&AInfo['AllowBlockedInspections'] != 'Yes' && (AInfo['Issue Date'] == null || AInfo['Issue Date'] == '')) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>The current status is: ' + capStatus + ' for this Building Permit. All building permts must be in either an Issued or Re-Issue status to schedule inspections.<br>');
 cancel = true;
 }
if (appMatch('Building/Permit/NA/NA') &&AInfo['AllowBlockedInspections'] != 'Yes' && matches(capStatus,'Closed Cancelled','Closed Complete','Closed Error','Closed Expired','Expired','Finaled','Void')) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>The current status is: ' + capStatus + ' for this Building Permit. All building permts must be in either an Issued or Re-Issue status to schedule inspections.<br>');
 cancel = true;
 }
if (appMatch('Building/Permit/NA/NA') &&AInfo['AllowBlockedInspections'] != 'Yes') {
 
//start replaced branch: EMSE:StopTradeOnDeferred
 {
vInspNum = 0;
vElecFlag = false;
vMechFlag = false;
vPlumbFlag = false;
vInspNumStr = '';
logDebug('inspType = ' + inspType);
vInspNumStr1 = inspType.match(/\d/g);
vInspNumStr = vInspNumStr1.join('');
vInspNum = vInspNumStr * 1;
logDebug('vInspNum = ' + vInspNum);
logDebug('vInspNumStr = ' + vInspNumStr);
if (vInspNum > 1999 && vInspNum < 3000 && matches(getAppSpecific('Deferred Electrical'),'Y','Yes')) {
 vdeferredType = 'Electrical';
 vElecFlag = true;
 }
if (vInspNum > 2999 && vInspNum < 4000 && matches(getAppSpecific('Deferred Mechanical'),'Y','Yes')) {
 vdeferredType = 'Mechanical';
 vElecFlag = true;
 }
if (vInspNum > 3999 && vInspNum < 5000 && matches(getAppSpecific('Deferred Plumbing'),'Y','Yes')) {
 vdeferredType = 'Plumbing';
 vElecFlag = true;
 }
if (vElecFlag || vMechFlag || vPlumbFlag) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b> ' + vdeferredType + ' Inspections cannot be scheduled</b></font><br><br>There is an unapproved Deferred ' + vdeferredType + ' Submittal for this Building Permit.<br>');
 cancel = true;
 }

}
//end replaced branch: EMSE:StopTradeOnDeferred;
 }
if (appMatch('Building/Permit/NA/NA') &&AInfo['AllowBlockedInspections'] != 'Yes') {
 
//start replaced branch: EMSE:B_ISB_BlockTradesByScope
 {
vInspNum = 0;
vElecFlag = false;
vMechFlag = false;
vPlumbFlag = false;
vInspNumStr = '';
logDebug('inspType = ' + inspType);
vInspNumStr1 = inspType.match(/\d/g);
vInspNumStr = vInspNumStr1.join('');
vInspNum = vInspNumStr * 1;
logDebug('vInspNum = ' + vInspNum);
logDebug('vInspNumStr = ' + vInspNumStr);
if (vInspNum > 1999 && vInspNum < 3000 && matches(getAppSpecific('Electrical'),'N','No')) {
 vdeferredType = 'Electrical';
 vElecFlag = true;
 }
if (vInspNum > 2999 && vInspNum < 4000 && matches(getAppSpecific('Mechanical'),'N','No')) {
 vdeferredType = 'Mechanical';
 vElecFlag = true;
 }
if (vInspNum > 3999 && vInspNum < 5000 && matches(getAppSpecific('Plumbing'),'N','No')) {
 vdeferredType = 'Plumbing';
 vElecFlag = true;
 }
if (vElecFlag || vMechFlag || vPlumbFlag) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b> ' + vdeferredType + ' Inspections cannot be scheduled</b></font><br><br>The trade of this inspection is not within the scope of this permit type.<br>');
 cancel = true;
 }

}
//end replaced branch: EMSE:B_ISB_BlockTradesByScope;
 }
if (inspType.indexOf('1200 Building Final') > -1 && matches(currentUserID,'ADMIN')) {
 
//start replaced branch: EMSE:B_ISB_BlockInspections
 {
if (balanceDue > 0) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Balance Due:</b></font><br><br>There is a balance due of ' + formatCurrency(balanceDue) + ' for this Building Permit.  No additional inspections can be scheduled until the balance due is paid.<br>');
 cancel = true;
 }
if (feeGetTotByDateRange(dateAdd(null,-730),dateAdd(null,0),'NEW') > 0) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Assessed Fees:</b></font><br><br>There are uninvoiced assessed fees in the amount of ' + formatCurrency(feeGetTotByDateRange(dateAdd(null,-730),dateAdd(null,0),'NEW')) + ' for this Building Permit.  No additional inspections can be scheduled until the fees are invoiced and paid.<br>');
 cancel = true;
 }
if (capStatus != 'Issued') {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>The current status is: ' + capStatus + ' for this Building Permit. All building permts must be in either an Issued or Re-Issue status to schedule inspections.<br>');
 cancel = true;
 }

//replaced branch(EMSE:DisallowFinalWhenOpenRevision)
disallowFinalWhenOpenRevision();

}
//end replaced branch: EMSE:B_ISB_BlockInspections;
 }
if (appMatch('Building/Permit/NA/NA')&& inspType.indexOf('1200 Building Final') > -1 && !matches(currentUserID,'ADMIN') && AInfo['AllowBlockedFinalInspections'] != 'Yes') {
 
//start replaced branch: EMSE:B_ISB_BlockInspections
 {
if (balanceDue > 0) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Balance Due:</b></font><br><br>There is a balance due of ' + formatCurrency(balanceDue) + ' for this Building Permit.  No additional inspections can be scheduled until the balance due is paid.<br>');
 cancel = true;
 }
if (feeGetTotByDateRange(dateAdd(null,-730),dateAdd(null,0),'NEW') > 0) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Assessed Fees:</b></font><br><br>There are uninvoiced assessed fees in the amount of ' + formatCurrency(feeGetTotByDateRange(dateAdd(null,-730),dateAdd(null,0),'NEW')) + ' for this Building Permit.  No additional inspections can be scheduled until the fees are invoiced and paid.<br>');
 cancel = true;
 }
if (capStatus != 'Issued') {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>The current status is: ' + capStatus + ' for this Building Permit. All building permts must be in either an Issued or Re-Issue status to schedule inspections.<br>');
 cancel = true;
 }

//replaced branch(EMSE:DisallowFinalWhenOpenRevision)
disallowFinalWhenOpenRevision();

}
//end replaced branch: EMSE:B_ISB_BlockInspections;
 }

