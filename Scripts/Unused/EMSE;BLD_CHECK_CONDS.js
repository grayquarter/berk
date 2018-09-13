
varCancelFlag = false;
mBody = '<font size = 4 color=ff000><b>The following condition(s) has(have) not been met:</b></font><br><br>';
if (appHasCondition('Finals','Applied','Stop All Finals',null) && stopAllFinalFlag) {
 varCancelFlag = true;
 mBody = mBody + 'There is a stop on scheduling any Final Inspections on this permit<br>';
 }
if (appHasCondition('Finals','Applied','Stop All Inspections',null) && stopAllInspFlag) {
 varCancelFlag = true;
 mBody = mBody + 'There is a stop on scheduling any inspections on this permit<br>';
 }
if (varCancelFlag) {
 showMessage = true;
 comment(mBody);
 cancel = true;
 /* appHasCondition(cType,cStatus,cDesc,cImpact) cDesc = Condition Name */;
 }

