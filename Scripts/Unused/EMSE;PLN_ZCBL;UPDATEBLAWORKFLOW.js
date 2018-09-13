
blaAppName = cap.getSpecialText();
comment(blaAppName);
pId = getApplication(blaAppName);
capId = pId;
comment(pId);
asiToxics = getAppSpecific('HazMat', capId);
comment(asiToxics);
asiTobacco = getAppSpecific('Tobacco',capId);
comment(asiTobacco);
asiTattoo = getAppSpecific('Tattoo',capId);
comment(asiTattoo);
asiSwimPool = getAppSpecific('SwimPool',capId);
comment(asiSwimPool);
if (matches(wfTask,'Zoning Certificate') && matches(wfStatus, 'Continuing legal use','New Use - Meets Zoning') && pId != null) {
 holdId=capId;
 capId = pId;
 comment(capId);
 closeTask('Zoning Review','Approved','Closed via Script û Zoning Review Approved','');
 capId = holdId;
 }
if (asiToxics =='No') {
 setTask('Toxics Review','N','N');
 }
if (asiTobacco =='No' && asiTattoo == 'No' && asiSwimPool == 'No') {
 setTask('Health Review','N','N');
 }
if (wfTask == 'Zoning Certificate' && matches (wfStatus, 'Prohibited Use','New Use - Requires AUP/UP') && pId != null) {
 holdId=capId;
 capId = pId;
 branchTask('Zoning Review','Not Approved','Updated via Script û Zoning Review Denied','');
 capId = holdId;
 }

