
senderEmailAddr = 'noreply@ci.berkeley.ca.us';
emailNotification = 'DRUA_PSC_CORRECTIONS_NOTIFICATION';
NotificationType = 'Test Notice';
ccEmailAddr = 'jsousa@cityofberkeley.info;
lsalcedo@cityofberkeley.info;
JBright@ci.berkeley.ca.us;
dlopez@ci.berkeley.ca.us';
fileNames = [];
emailAddress = 'jsousa@cityofberkeley.info;
lsalcedo@cityofberkeley.info;
JBright@ci.berkeley.ca.us;
dlopez@ci.berkeley.ca.us';
capModel = cap.getCapModel();
alias = capModel.getAppTypeAlias();
var params = aa.util.newHashtable();
getRecordParams4NotificationCOB(params);
params.put('$$TASKNAME$$', wfTask);
params.put('$$TASKSTATUS$$', wfStatus);
params.put('$$REVIEWER$$', currentUserID);
params.put('$$CUSTOMRECID$$', capIDString);
params.put('$$RECORDALIAS$$', alias);
sendNotification(senderEmailAddr, emailAddress, ccEmailAddr, emailNotification, params, fileNames);
//Send email notice;

