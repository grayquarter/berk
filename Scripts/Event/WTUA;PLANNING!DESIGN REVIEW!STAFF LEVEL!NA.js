
if (wfTask == 'Completeness Review' && wfStatus == 'Complete') {
 deactivateTaskOnTSI('Completeness Review');
 }
pId=getParent();
if (wfTask == 'Case Closed' && matches(wfStatus,'Approved') && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('Design Review','DRSL Approved','Closed via Script','');
 capId = holdId;
 }
if (wfTask == 'Case Closed' && wfStatus == 'Denied' && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('Design Review','DRSL Denied','Closed via Script','');
 capId = holdId;
 }
if (matches(wfTask, 'DRC Meeting','Completeness Review', 'Case Closed') && wfStatus == 'Withdrawn' && pId != null) {
 holdId=capId;
 capId = pId;
 closeTask('Design Review','Withdrawn','Closed via Script','');
 capId = holdId;
 }

