
if (wfTask =='Final Review and Assessment' && wfStatus == 'Inspection Required') {
 editAppSpecific('Work Order Status',null);
 }
if (wfTask =='Final Review and Assessment' && wfStatus == 'Inspection Required') {
 editScheduledDate(dateAdd(null,1));
 }
if (wfTask =='Work Order Assignment' && wfStatus == 'Assigned') {
 editScheduledDate(dateAdd(null,1));
 }

