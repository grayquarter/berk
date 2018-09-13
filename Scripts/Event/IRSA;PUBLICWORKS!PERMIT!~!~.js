
if (// false) {
 When a Final Inspection is approved, close out workflow and updates status;
 }
if (inspType.indexOf('6100 Public Works Final') > -1 && matches(inspResult,'Approve')) {
 closeTask('Inspection','Finaled','6100 Public Works Final was Approved',' ');
 updateAppStatus('Closed Complete','6100 Public Works Final Passed on ' + dateAdd(null,0));
 }

