
if (balanceDue > 0) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Balance Due:</b></font><br><br>There is a balance due of ' + formatCurrency(balanceDue) + ' for this Public Works Permit.  No additional inspections can be scheduled until the balance due is paid.<br>');
 cancel = true;
 }
if (feeGetTotByDateRange(dateAdd(null,-730),dateAdd(null,0),'NEW') > 0) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Assessed Fees:</b></font><br><br>There are uninvoiced assessed fees in the amount of ' + formatCurrency(feeGetTotByDateRange(dateAdd(null,-730),dateAdd(null,0),'NEW')) + ' for this Public WOrks Permit.  No additional inspections can be scheduled until the fees are assessed and paid.<br>');
 cancel = true;
 }
if (capStatus != 'Issued') {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>The current status is: ' + capStatus + ' for this Public Works Permit. All public works permts must be in either an Issued or Re-Issue status to schedule inspections.<br>');
 cancel = true;
 }
if (capId.getCustomID().indexOf('-E') > -1 || capId.getCustomID().indexOf('-M') > -1 || capId.getCustomID().indexOf('-P') > -1) {
 showMessage = true;
 comment('<font size = 4 color=ff000><b>Inspections cannot be scheduled</b></font><br><br>You are attempting to schedule an inspection on an electrical, mechanical, or plumbing permit. All inspections must be scheduled against the building permit.<br>');
 cancel = true;
 }

