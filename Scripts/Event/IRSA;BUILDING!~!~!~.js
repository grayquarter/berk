
inspResultArr = new Array();
inspResultArr = aa.env.getValue('InspectionResultArray');
for (thisResult in inspResultArr) comment('Result = ' + inspResultArr[thisResult]);
if (matches(inspResult,'Disapproved-Assess Fees') && feeExists('F390') && feeExists('F400') && feeExists('F410')) {
 addFee('F420','B_BLDG','FINAL',1,'N');
 }
if (matches(inspResult,'Disapproved-Assess Fees') && feeExists('F390') && feeExists('F400') && !feeExists('F410')) {
 addFee('F410','B_BLDG','FINAL',1,'N');
 }
if (matches(inspResult,'Disapproved-Assess Fees') && feeExists('F390') && !feeExists('F400') && !feeExists('F410')) {
 addFee('F400','B_BLDG','FINAL',1,'N');
 }
if (matches(inspResult,'Disapproved-Assess Fees') && !feeExists('F390') && !feeExists('F400') && !feeExists('F410')) {
 addFee('F390','B_BLDG','FINAL',1,'N');
 }
if (inspType.indexOf('1200 Building Final') > -1 && matches(inspResult,'Approved')) {
 closeTask('Inspection','Finaled','1200 Building Final was Approved',' ');
 updateAppStatus('Finaled','1200 Building Final Passed on ' + dateAdd(null,0));
 }
if (inspType.indexOf(' Final') > -1 && matches(inspResult,'Approved') && !matches(AInfo['Building'],'Y','Yes')) {
 closeTask('Inspection','Finaled',inspType + ' was Approved',' ');
 updateAppStatus('Finaled',inspType + ' Passed on ' + dateAdd(null,0));
 }

