
if (matches(AInfo['Type of Work'],'EV Charging','Solar PV')) {
 
//start replaced branch: EMSE:B_ACA_Minor_Submittal
 {
contArray = new Array();
todayIs = new Date();
emailSendFrom='';
emailSendTo='';
emailSendCC='';
emailTemplate='B_ACA_Minor_Submittal';
emailParameters = aa.util.newHashtable();
fileList=[];
if (lookup('LOOKUP:ScriptResources','Environment') == 'UAT' || lookup('LOOKUP:ScriptResources','Environment') == 'TEST') {
 emailSendTo = 'jsousa@cityofberkeley.info;
 rcarrillo@cityofberkeley.info';
 }
getRecordParams4NotificationCOB(emailParameters);
acaURL='https://acadev.cityofberkeley.info/CitizenAccessDev/';
getACARecordParam4Notification(emailParameters, acaURL);
if (emailSendTo == '') {
 contactArray= getContactArray();
 comment('\n about thisContact: '+contArray);
 if (contactArray!=null) for (eachContact in contactArray) 
//replaced branch(EMSE:CTRCA_GET CONTACT DETAILS)
gET CONTACT DETAILS();
 }
if (emailSendTo != '') {
 sendNotification(emailSendFrom, emailSendTo, emailSendCC, emailTemplate, emailParameters, fileList);
 }

}
//end replaced branch: EMSE:B_ACA_Minor_Submittal;
 }
if (matches(AInfo['Type of Work'],'EV Charging','Solar PV')) {
 
//start replaced branch: EMSE:AdvanceWorkflowMinorPermit
 {
closeTask('Application Submittal','Plan Distribution','Application submittal','Publicuser submittal');
deactivateTask('Application Submittal');
closeTask('Plan Distribution','Route','Application submittal','Publicuser submittal');
deactivateTask('Application Submittal');
updateTask('Building and Safety Review','Assigned','Application submittal','Publicuser submittal');
activateTask('Building and Safety Review');
deactivateTask('Zoning Review');
deactivateTask('Fire Review');
deactivateTask('Environmental Health Review');
deactivateTask('Public Works Review');
deactivateTask('Toxics Review');
deactivateTask('Landmarks Review');
deactivateTask('Energy Review');
deactivateTask('Traffic Review');
deactivateTask('Design Review');

}
//end replaced branch: EMSE:AdvanceWorkflowMinorPermit;
 }
if (matches(AInfo['Type of Work'],'EV Charging','Gas Line','HVAC','Re-roof','Solar PV','Water Heater')) {
 
//start replaced branch: EMSE:SetTradeType
 {
if (AInfo['Type of Work'] == 'EV Charging') {
 editAppSpecific('Electrical','Y');
 }
if (AInfo['Type of Work'] == 'Gas Line') {
 editAppSpecific('Plumbing','Y');
 }
if (AInfo['Type of Work'] == 'HVAC') {
 editAppSpecific('Mechanical','Y');
 }
if (AInfo['Type of Work'] == 'Re-roof') {
 editAppSpecific('Building','Y');
 }
if (AInfo['Type of Work'] == 'Solar') {
 editAppSpecific('Electrical','Y');
 }
if (AInfo['Type of Work'] == 'Water Heater') {
 editAppSpecific('Plumbing','Y');
 }

}
//end replaced branch: EMSE:SetTradeType;
 }

