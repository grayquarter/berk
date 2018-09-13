
if (wfTask == 'Zoning Review' && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable') && AInfo['HazMat'] == 'No') {
 setTask('Toxics Review','N','N');
 }
if (wfTask == 'Zoning Review' && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable') && AInfo['FoodDrink'] == 'No' && AInfo['Tobacco'] == 'No' && AInfo['Tattoo'] == 'No' && AInfo['SwimPool'] == 'No') {
 setTask('Health Review','N','N');
 }
if (wfTask == 'Zoning Review' && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable') && AInfo['Moved'] == 'No') {
 setTask('Health Review','N','N');
 setTask('Toxics Review','N','N');
 setTask('Zoning Review','N','N');
 setTask('Fire Review','N','N');
 setTask('Building Review','N','N');
 activateTask('License Issuance');
 }
if (wfTask == 'License Issuance' && matches(wfStatus, 'Approved', 'Delinquent', 'Payment Pending')) {
 aa.runScript('WorkflowTaskUpdateAfter4Renew');
 }

