
showMessage = true;
var  caseId = null;
pUserId = null;
pCapDetail = null;
if (true) {
 var pCapDetailObj = aa.cap.getCapDetail(capId);
 parentId  = capId;
 if (pCapDetailObj.getSuccess()) pCapDetail = pCapDetailObj.getOutput();
 }
if (pCapDetail != null) {
 pUserIdObj = aa.person.getUser(pCapDetail.getAsgnStaff());
 if (pUserIdObj.getSuccess()) pUserId = pUserIdObj.getOutput();
 comment('user id ' + pUserId);
 }
if (pUserId != null) {
 if (pUserId.getEmail() != null) aa.sendMail('aylee@cityofberkeley.info', pUserId.getEmail(), '', capIDString + ' Has Been Assigned to You',capIDString + ' Has Been Assigned to You');
 }

