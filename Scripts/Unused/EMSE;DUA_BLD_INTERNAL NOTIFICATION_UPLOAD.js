
emailSendFrom = 'noreply@cityofberkeley.info';
emailSendTo = assignedToEmail;
emailStaffCC = '';
emailTemplate = 'DUA_BLD_INTERNAL NOTIFICATION_UPLOAD';
fileNames = [];
emailParameters = aa.util.newHashtable();
getRecordParams4NotificationCOB(emailParameters);
addParameter(emailParameters,'$$docName$$',docDetails['fileName']);
if (docDetails['categoryByAction'] == null) docAction = 'new';
if (docDetails['categoryByAction'] == 'RESUBMIT') docAction = 'resubmitted';
addParameter(emailParameters,'$$docAction$$',docAction);
assignedToFullName = aa.person.getUser(assignedTo).getOutput().getFirstName() + ' ' + aa.person.getUser(assignedTo).getOutput().getLastName();
addParameter(emailParameters,'$$assignedToFullName$$',assignedToFullName);
sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);

