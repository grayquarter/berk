
var DeactivateTasks = false;
var isRevoked = false;
var isDenied = false;
var currentUserGroup ='';
var currentUserGroupObj = aa.userright.getUserRight('Planning',currentUserID).getOutput();
if (isTaskStatus('Rent Board Review','Revoked') || isTaskStatus('Zoning Review','Revoked')) {
 isRevoked = true;
 }
if (currentUserGroupObj) {
 currentUserGroup = currentUserGroupObj.getGroupName();
 }
if (isTaskStatus('Rent Board Review','Denided') || isTaskStatus('Zoning Review','Denided')) {
 isDenied = true;
 }
if ((!isDenied &&!isRevoked ) && isTaskStatus('Zoning Review','Approved') && isTaskStatus('Rent Board Review','Approved')) {
 updateAppStatus('Approved',currentUserID );
 updateTask('Issuance','Approved','Issuance update', 'Final step done by user:  '+currentUserID );
 DeactivateTasks = true;
 emailTemplate='PLN_ZC_STR_APPROVED';
 }
if (wfStatus == 'Approved') {
 deactivateTask(wfTask);
 }
if ((!isDenied &&!isRevoked ) && ((isTaskStatus('Zoning Review','Approved') && !isTaskStatus('Rent Board Review','Approved')) ||(!isTaskStatus('Zoning Review','Approved') && isTaskStatus('Rent Board Review','Approved')))) {
 updateAppStatus('In Review',currentUserID );
 }
if ((!isDenied &&!isRevoked ) && !isTaskStatus('Rent Board Review','Approved') && !isTaskStatus('Zoning Review','Approved')) {
 updateAppStatus('Received',currentUserID);
 }
if ((matches(wfTask,'Rent Board Review') || matches(wfTask,'Zoning Review')) && wfStatus == 'Needs Applicant Response' && !isDenied && !isRevoked) {
 updateAppStatus('In Review',currentUserID );
 }
if (wfStatus == 'Prohibited Use') {
 updateAppStatus('Denied',currentUserID );
 varCloseAll = true;
 DeactivateTasks = true;
 emailTemplate = 'PLN_ZC_STR_DENIED';
 }
if (wfStatus == 'Prohibited Use') {
 updateTask('Issuance','Denied','Issuance update', 'Final step done by user:  '+currentUserID );
 deactivateTask('Zoning Review');
 deactivateTask('Rent Board Review');
 }
if ((currentUserGroup == 'LandUseSupervisors' || currentUserGroup == 'PlanningAdmin' || currentUserGroup == 'STR_RentBoardSupervisor') && wfStatus == 'Revoked') {
 
//start replaced branch: EMSE:RequireShortTermRentalRevokeLetterAttachment
 {
var letterRequired = false;
var letterFound = false;
var docList = new Array();
var docInfo = new Array();
var uploadUser='';
var formattedDate = '';
var todaysDate = new Date();
formattedDate =todaysDate.getFullYear().toString();
+'-';
if (todaysDate.getMonth() < 10) formattedDate = formattedDate + '-0' + (todaysDate.getMonth()+1).toString()+'-'+todaysDate.getDate().toString();
else formattedDate = formattedDate +'-'+ (1+todaysDate.getMonth()).toString()+'-'+todaysDate.getDate().toString();
// logDebug('Date components are:  '+formattedDate);
if (wfStatus == 'Revoked') {
 letterRequired = true;
 }
if (letterRequired) {
 docList  = aa.document.getDocumentListByEntity(capId, 'CAP').getOutput().toArray();
 }
if (letterRequired) {
 for (var xdoc in docList) if (docList[xdoc].getDocCategory() == 'ShortTermRentalUpdate') docInfo  =docList[xdoc];
 }
if (letterRequired) {
 for (var xdoc in docList) if (docList[xdoc].getDocCategory() == 'ShortTermRentalUpdate') letterFound =true;
 }
if (letterRequired && !letterFound) {
 cancel=true;
 showMessage = true;
 comment('<font size = 4 color=ff000><br><b>An explanation letter is required to be uploaded before updating status to Revoke.  Please upload a letter under documents tab..</b><br>');
 }

}
//end replaced branch: EMSE:RequireShortTermRentalRevokeLetterAttachment;
 }
if ((currentUserGroup == 'LandUseSupervisors' || currentUserGroup == 'PlanningAdmin' || currentUserGroup == 'STR_RentBoardSupervisor')&& wfStatus == 'Revoked' && cancel != true) {
 updateTask('Issuance','Revoked','Issuance update', currentUserID );
 updateAppStatus('Revoked',currentUserID);
 deactivateTask('Zoning Review');
 deactivateTask('Rent Board Review');
 varCloseAll = true;
 DeactivateTasks = true;
 emailTemplate='PLN_ZC_STR_REVOKE';
 }
if (cancel && isRevoked) {
 updateTask(wfTask,'Assigned','Attachment revoke letter required', 'Final step done by user:  '+currentUserID );
 logDebug('\nmissing revoke letter\n');
 }
if (DeactivateTasks) {
 deactivateTask('Issuance');
 }
if (DeactivateTasks) {
 logDebug('\n my mail template is:  ' +emailTemplate);
 
//replaced branch(EMSE:STR_Email)
sTR_Email();
 }

