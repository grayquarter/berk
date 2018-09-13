
if (matches(AInfo['Type of Work'],'EV Charging','Solar PV') && balanceDue == 0) {
 
//start replaced branch: EMSE:B_ACA_Solar_Issuance
 {
closeTask('PSC Review','Approved','Closed by EMSE','');
closeTask('Issuance','Issued','Closed by EMSE','');
updateAppStatus('Issued','Update by EMSE:B_ACA_Solar_Issuance',capId);
emailSendFrom='';
emailSendTo='';
emailSendCC='';
emailTemplate='B_ACA_Minor_Issuance';
emailParameters = aa.util.newHashtable();
fileList=[];
if (lookup('LOOKUP:ScriptResources','Environment') == 'UAT' || lookup('LOOKUP:ScriptResources','Environment') == 'DEV') {
 emailSendTo = 'jsousa@cityofberkeley.info;
 rcarrillo@cityofberkeley.info';
 }
var reportName;
var reportParameters = aa.util.newHashMap();
var generateReportOutput;
reportName='Building Permit';
reportParameters.put('permitnumber', capIDString);
generateReportOutput=generateReportSavetoEDMS(reportName, reportParameters, 'Building');
fileList.push(generateReportOutput);
reportName='BP Job Card';
generateReportOutput=generateReportSavetoEDMS(reportName, reportParameters, 'Building');
fileList.push(generateReportOutput);
logDebug(fileList+' is the fileList content');
reportName='Building Permit Declarations';
generateReportOutput=generateReportSavetoEDMS(reportName, reportParameters, 'Building');
fileList.push(generateReportOutput);
logDebug(fileList+' is the fileList content at 3rd doc-- declarations');
getRecordParams4NotificationCOB(emailParameters);
acaURL='https://acadev.cityofberkeley.info/CitizenAccessDev/';
getACARecordParam4Notification(emailParameters, acaURL);
if (emailSendTo == '') {
 contactArray= getContactArray();
 if (contactArray!=null) for (eachContact in contactArray) 
//replaced branch(EMSE:CTRCA_GET CONTACT DETAILS)
gET CONTACT DETAILS();
 }
if (emailSendTo != '') {
 sendNotification(emailSendFrom, emailSendTo, emailSendCC, emailTemplate, emailParameters, fileList);
 }

}
//end replaced branch: EMSE:B_ACA_Solar_Issuance;
 }
if (AInfo['PaidPRA'] == 'Y' && matches(AInfo['Type of Work'],'Water Heater','HVAC','Re-roof','Seismic Gas Shut-Off Valve') && balanceDue == 0) {
 editAppSpecific('PaidPRA','Y');
 
//start replaced branch: EMSE:B_ACA_Minor_Issuance
 {
closeTask('Application Submittal','Ready to Issue','Closed by EMSE','');
deactivateTask('Building and Safety Review');
deactivateTask('PSC Review');
deactivateTask('Fire Review');
closeTask('Issuance','Issue','Closed by EMSE','');
updateAppStatus('Issued','Update by EMSE:B_ACA_Minor_Issuance',capId);
emailSendFrom='';
emailSendTo='';
emailSendCC='';
emailTemplate='B_ACA_Minor_Issuance';
emailParameters = aa.util.newHashtable();
fileList=[];
reportName = '';
reportParameters = aa.util.newHashMap();
generateReportOutput='';
reportName='Building Permit';
reportParameters.put('permitnumber', capIDString);
generateReportOutput=generateReportSavetoEDMS(reportName, reportParameters, 'Building');
fileList.push(generateReportOutput);
reportName='BP Job Card';
generateReportOutput=generateReportSavetoEDMS(reportName, reportParameters, 'Building');
fileList.push(generateReportOutput);
reportName='Building Permit Declarations';
generateReportOutput=generateReportSavetoEDMS(reportName, reportParameters, 'Building');
fileList.push(generateReportOutput);
getRecordParams4NotificationCOB(emailParameters);
acaURL='https://acadev.cityofberkeley.info/CitizenAccessDev/';
getACARecordParam4Notification(emailParameters, acaURL);
if (emailSendTo == '') {
 contactArray= getContactArray();
 if (contactArray!=null) for (eachContact in contactArray) 
//replaced branch(EMSE:CTRCA_GET CONTACT DETAILS)
gET CONTACT DETAILS();
 }
if (emailSendTo != '') {
 sendNotification(emailSendFrom, emailSendTo, emailSendCC, emailTemplate, emailParameters, fileList);
 }

}
//end replaced branch: EMSE:B_ACA_Minor_Issuance;
 }
if (AInfo['PaidPRA'] != 'Y') {
 editAppSpecific('PaidPRA','Y');
 //on first fire of PRA, do nothing and just set flag to, 'Y';
 }

