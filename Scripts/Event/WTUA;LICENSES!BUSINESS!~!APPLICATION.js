
if (wfTask == 'License Issuance' && matches(wfStatus,'Approved','Approved with Conditions')) {
 
//replaced branch(LIC Establish Links to Reference Contacts)
establish Links to Reference Contacts();
 }
if (wfTask == 'License Issuance' && matches(wfStatus,'Approved','Approved with Conditions')) {
 
//replaced branch(LIC Issue Business License)
issueBusinessLicense();
 }
if (wfTask == 'License Issuance' && matches(wfStatus,'Approved','Approved with Conditions')) {
 licProfLookup();
 }
externalLaganWF();
if (wfTask == 'Application Acceptance' & wfStatus == 'Approved') {
 
//start replaced branch: EMSE:Various_Workflow_Disabled
 {
var capAddResult = aa.address.getAddressByCapId(capId);
comment(capAddResult);
var addrArray = new Array();
var addrArray = capAddResult.getOutput();
var streetName = addrArray[0].getStreetName();
comment(streetName);
if (streetName == 'VARIOUS') {
 setTask('Toxics Review','N','N');
 setTask('Health Review','N','N');
 setTask('Zoning Review','N','N');
 setTask('Building Review','N','N');
 setTask('Fire Review','N','N');
 setTask('License Issuance','Y','N');
 //externalLaganWFDisableAllReviews();
 }
if (streetName == 'VARIOUS' && appMatch('Licenses/Business/Massage/*')) {
 setTask('Zoning Review','N','N');
 setTask('Establishment Permit','Y','N');
 setTask('Therapist Permit','Y','N');
 setTask('Toxics Review','N','N');
 setTask('Fire Review','N','N');
 setTask('Building Review','N','N');
 setTask('Health Review','N','N');
 setTask('License Issuance','Y','N');
 }
if (streetName == 'VARIOUS' && appMatch('Licenses/Business/Auto Vehicle For Hire/*')) {
 setTask('Zoning Review','N','N');
 setTask('Owner Permit','Y','N');
 setTask('Vehicle Permit','Y','N');
 setTask('Driver Permit','Y','N');
 setTask('License Issuance','N','N');
 }
if (appMatch('Licenses/Business/Administrative Headquarters/*')) {
 setTask('Toxics Review','N','N');
 setTask('Health Review','N','N');
 setTask('Zoning Review','N','N');
 setTask('Building Review','N','N');
 setTask('Fire Review','N','N');
 setTask('License Issuance','Y','N');
 //externalLaganWFDisableAllReviews();
 }
if (appMatch('Licenses/Business/Rental of Real Property/*')) {
 setTask('Toxics Review','N','N');
 setTask('Health Review','N','N');
 setTask('Zoning Review','N','N');
 setTask('Building Review','N','N');
 setTask('Fire Review','N','N');
 setTask('License Issuance','Y','N');
 //externalLaganWFDisableAllReviews();
 }

}
//end replaced branch: EMSE:Various_Workflow_Disabled;
 }
if (matches(wfTask,'Application Acceptance','Zoning Review') && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable','Override Zoning') && AInfo['HazMat'] == 'No') {
 setTask('Toxics Review','N','N');
 //externalLaganWFDisableToxic();
 }
if (matches(wfTask,'Application Acceptance','Zoning Review') && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable','Override Zoning') && AInfo['FoodDrink'] == 'No' && AInfo['Tobacco'] == 'No' && AInfo['Tattoo'] == 'No' && AInfo['SwimPool'] == 'No') {
 setTask('Health Review','N','N');
 //externalLaganWFDisableHealth();
 }
if (wfTask == 'Application Acceptance' & wfStatus == 'Denied') {
 wfAsgnArray = new Array();
 wfAsgnArray = loadTasks(capId);
 for (x in wfAsgnArray) if (wfAsgnArray[x].active == 'Y') setTask(x,'N','N');
 closeTask('License Issuance','Denied','Closed by EMSE','');
 }
if (wfTask == 'Application Acceptance' && matches(wfStatus,'Override','Void','Withdrawn')) {
 externalLaganWFDisableAllReviews();
 }
if (wfTask == 'Zoning Review' && wfStatus == 'Not Approved') {
 externalLaganWFDisableLoop();
 }
if (matches(wfTask,'Zoning Review') && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable') && AInfo['HazMat'] == 'No') {
 externalLaganWFDisableToxic();
 comment('http://cobcrmdv1/AccelaIntegration/BusinessLicense/WorkflowTaskUpdateAfter.aspx?alternateId=' + capIDString + '&taskDescription=' + (encodeURIComponent(wfTask)) + '&disposition=' + (encodeURIComponent(wfStatus)) + '&disabledTask=Toxics%20Review&recordBy=' + currentUserID);
 }
if (matches(wfTask,'Zoning Review') && matches(wfStatus,'Approved','Approved with Conditions','Not Applicable') && AInfo['FoodDrink'] == 'No' && AInfo['Tobacco'] == 'No' && AInfo['Tattoo'] == 'No' && AInfo['SwimPool'] == 'No') {
 externalLaganWFDisableHealth();
 comment('http://cobcrmdv1/AccelaIntegration/BusinessLicense/WorkflowTaskUpdateAfter.aspx?alternateId=' + capIDString + '&taskDescription=' + (encodeURIComponent(wfTask)) + '&disposition=' + (encodeURIComponent(wfStatus)) + '&disabledTask=Health%20Review&recordBy=' + currentUserID);
 }

//start replaced branch: EMSE:EmailAssignedStaffTask
 {
var assignedZoningStaff;
var assignedToxicsStaff;
var assignedFireStaff;
var assignedBuildingStaff;
var assignedHealthStaff;
if (matches (wfTask, 'Application Acceptance') && matches(wfStatus, 'Approved')) {
 assignedZoningStaff=getTaskAssignUserEmail('Zoning Review');
 }
if (matches (wfTask, 'Zoning Review') && matches(wfStatus, 'Approved','Not Applicable') && isTaskActive('Toxics Review')) {
 assignedToxicsStaff=getTaskAssignUserEmail('Toxics Review');
 }
if (matches (wfTask, 'Zoning Review') && matches(wfStatus, 'Approved','Not Applicable') && isTaskActive('Fire Review')) {
 assignedFireStaff=getTaskAssignUserEmail('Fire Review');
 }
if (matches (wfTask, 'Zoning Review') && matches(wfStatus, 'Approved','Not Applicable') && isTaskActive('Building Review')) {
 assignedBuildingStaff=getTaskAssignUserEmail('Building Review');
 }
if (matches (wfTask, 'Zoning Review') && matches(wfStatus, 'Approved','Not Applicable') && isTaskActive('Health Review')) {
 assignedHealthStaff=getTaskAssignUserEmail('Health Review');
 }
if (assignedToxicsStaff != null) {
 aa.sendMail('noreply@cityofberkeley.info', 'cityofberkeley@cityofberkeley.info', '', assignedToxicsStaff +', '+capIDString + ' needs Toxics Review',assignedToxicsStaff +', '+capIDString + ' needs Toxics Review. Please go to https://aadev.berkeley.root to view this record');
 }
if (assignedFireStaff != null) {
 aa.sendMail('noreply@cityofberkeley.info', assignedFireStaff, '', assignedFireStaff +', '+capIDString + ' needs Fire Review',assignedFireStaff +', '+capIDString + ' needs Fire Review. Please go to https://aadev.berkeley.root to view this record');
 }
if (assignedBuildingStaff != null) {
 aa.sendMail('noreply@cityofberkeley.info', assignedBuildingStaff, '', assignedBuildingStaff +', '+capIDString + ' needs Building Review',assignedBuildingStaff +', '+capIDString + ' needs Building Review. Please go to https://aadev.berkeley.root to view this record');
 }
if (assignedHealthStaff != null) {
 aa.sendMail('noreply@cityofberkeley.info', assignedHealthStaff, '', assignedHealthStaff +', '+capIDString + ' needs Health Review',assignedHealthStaff +', '+capIDString + ' needs Health Review. Please go to https://aadev.berkeley.root to view this record');
 }
if (assignedZoningStaff != null) {
 aa.sendMail('noreply@cityofberkeley.info', assignedZoningStaff, '', assignedZoningStaff +', '+capIDString + ' needs Zoning Review',assignedZoningStaff +', '+capIDString + ' needs Zoning Review. Please go to https://aadev.berkeley.root to view this record');
 }

}
//end replaced branch: EMSE:EmailAssignedStaffTask;

