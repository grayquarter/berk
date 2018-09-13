
emailSendFrom='';
emailSendTo='';
emailSendCC='';
emailTemplate='PLN_ZC_STR_Issuance';
emailParameters = aa.util.newHashtable();
fileList=[];
if (!isTaskActive('Zoning Review')) {
 activateTask('Zoning Review');
 }
if (!isTaskActive('Rent Board Review')) {
 activateTask('Rent Board Review');
 }
updateAppStatus('Received','PUBLICUSER');
updateTask('Rent Board Review','Assigned','Application submittal','Publicuser submittal');
updateTask('Zoning Review','Assigned','Application submittal','Publicuser submittal');
assignTask('Zoning Review','EGREENE');
assignTask('Rent Board Review','ATA1');

//replaced branch(EMSE:STR_Email)
sTR_Email();

