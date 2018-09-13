function aDD_ELEC_FEES() {

var totalFee = 0.00;
var varcount = 0;
var eleFees= 'FE100,FE134,FE129,FE130,FE103,FE104,FE105,FE106,FE107,FE108,FE109,FE110,FE111,FE112,FE113,FE114,FE115,FE116,FE117,FE118,FE124,FE128,FE129,FE111,FE123,FE191';
if (AInfo['Service (new/change) Each 100 amps'] > 0) {
 varcount =  parseInt(AInfo['Service (new/change) Each 100 amps']);
 updateFee('FE100','B_ELEC','FINAL',varcount ,'N');
 totalFee  = totalFee  + feeAmount('FE100');
 }
if (AInfo['Subpanel (new/change) Each 100 amps'] > 0) {
 varcount =  parseInt(AInfo['Subpanel (new/change) Each 100 amps']);
 updateFee('FE134','B_ELEC','FINAL',varcount ,'N');
 totalFee  = totalFee  + feeAmount('FE134');
 }
if (AInfo['PgeServiceRecheck'] > 0) {
 varcount =   parseInt(AInfo['PgeServiceRecheck']);
 updateFee('FE129','B_ELEC','FINAL',varcount ,'N');
 totalFee  = totalFee  + feeAmount('FE129');
 }
if (AInfo['Device Outlets (receptacle switch light)'] > 0) {
 updateFee('FE130','B_ELEC','FINAL', AInfo['Device Outlets (receptacle switch light)']  ,'N');
 totalFee  = totalFee  + feeAmount('FE130');
 }
if (AInfo['Lights'] > 0) {
 updateFee('FE103','B_ELEC','FINAL',AInfo['Lights'] ,'N');
 totalFee  = totalFee  + feeAmount('FE103');
 }
if (AInfo['Alter/Change Wiring (Each Change)'] > 0) {
 updateFee('FE104','B_ELEC','FINAL',AInfo['Alter/Change Wiring (Each Change)'] ,'N');
 totalFee  = totalFee  + feeAmount('FE104');
 }
if (AInfo['Solar Panels'] > 0) {
 updateFee('FE105','B_ELEC','FINAL',AInfo['Solar Panels'] ,'N');
 totalFee  = totalFee  + feeAmount('FE105');
 }
if (AInfo['Branch Circuits'] > 0) {
 updateFee('FE106','B_ELEC','FINAL',AInfo['Branch Circuits'] ,'N');
 totalFee  = totalFee  + feeAmount('FE106');
 }
if (AInfo['Fixed Appliance Outlet'] > 0) {
 updateFee('FE107','B_ELEC','FINAL',AInfo['Fixed Appliance Outlet']  ,'N');
 totalFee  = totalFee  + feeAmount('FE107');
 }
if (AInfo['Meter (New or Changed)'] > 0) {
 updateFee('FE108','B_ELEC','FINAL',AInfo['Meter (New or Changed)'] ,'N');
 totalFee  = totalFee  + feeAmount('FE108');
 }
if (AInfo['Temp Power Pole/per 100 Amps'] > 0) {
 updateFee('FE109','B_ELEC','FINAL',AInfo['Temp Power Pole/per 100 Amps']*100,'N');
 totalFee  = totalFee  + feeAmount('FE109');
 }
if (AInfo['Motors up to 10 HP'] > 0) {
 updateFee('FE110','B_ELEC','FINAL',AInfo['Motors up to 10 HP'] ,'N');
 totalFee   = totalFee  + feeAmount('FE110');
 }
if (AInfo['Motors over 10 HP per Each HP'] > 0) {
 updateFee('FE111','B_ELEC','FINAL',AInfo['Motors over 10 HP per Each HP'] ,'N');
 totalFee   = totalFee  + feeAmount('FE111');
 }
if (AInfo['Generator up to 10 KV'] > 0) {
 updateFee('FE112','B_ELEC','FINAL',AInfo['Generator up to 10 KV'] ,'N');
 totalFee   = totalFee  + feeAmount('FE112');
 }
if (AInfo['Generator over 10 KV per Each KV'] > 0) {
 updateFee('FE113','B_ELEC','FINAL',AInfo['Generator over 10 KV per Each KV'] ,'N');
 totalFee   = totalFee  + feeAmount('FE113');
 }
if (AInfo['Transformer Up To 10KV'] > 0) {
 updateFee('FE114','B_ELEC','FINAL',AInfo['Transformer Up To 10KV'],'N');
 totalFee   = totalFee  + feeAmount('FE114');
 }
if (AInfo['Transformers over 10 KV per Each KV'] > 0) {
 updateFee('FE115','B_ELEC','FINAL',AInfo['Transformers over 10 KV per Each KV'],'N');
 totalFee   = totalFee  + feeAmount('FE115');
 }
if (AInfo['Signs, Outline Light/KV'] > 0) {
 updateFee('FE116','B_ELEC','FINAL',AInfo['Signs, Outline Light/KV'],'N');
 totalFee   = totalFee  + feeAmount('FE116');
 }
if (AInfo['X-Ray Capacitors/misc'] > 0) {
 updateFee('FE117','B_ELEC','FINAL',AInfo['X-Ray Capacitors/misc'] ,'N');
 totalFee   = totalFee  + feeAmount('FE117');
 }
if (AInfo['Festoon Lighting Systems'] > 0) {
 updateFee('FE118','B_ELEC','FINAL',AInfo['Festoon Lighting Systems'] ,'N');
 totalFee   = totalFee  + feeAmount('FE118');
 }
if (AInfo['Residential New or Additions per 100sf'] > 0 && AInfo['Category'] == 'Residential') {
 updateFee('FE124','B_ELEC','FINAL',AInfo['Residential New or Additions per 100sf']  ,'N');
 totalFee = totalFee  + feeAmount('FE124');
 }
if (AInfo['Electrical Vehicle Charger'] > 0) {
 updateFee('FE128','B_ELEC','FINAL',AInfo['Electrical Vehicle Charger'] ,'N');
 totalFee   = totalFee  + feeAmount('FE128');
 }
if (AInfo['Large Commercial/Industrial Projects Value of Electrical Work > 100K'] > 100000 && AInfo['Category'] != 'Residential' && AInfo['Use Component Total Cost Fee'] == 'Yes') {
 var projectValue = parseInt(AInfo['Large Commercial/Industrial Projects Value of Electrical Work > 100K']);
 projectValue *=0.01;
 updateFee('FE123','B_ELEC','FINAL',projectValue,'N');
 logDebug('project value 1 per '+projectValue);
 totalFee +=  feeAmount('FE123');
 editAppSpecific('Electrical 1% fee',projectValue);
 }
if (AInfo['Large Commercial/Industrial Projects Value of Electrical Work > 100K'] > 100000 && AInfo['Category'] != 'Residential' && AInfo['Use Component Total Cost Fee'] == 'No') {
 removeFees(eleFees);
 var projectValue = parseInt(AInfo['Large Commercial/Industrial Projects Value of Electrical Work > 100K']);
 projectValue *=0.01;
 updateFee('FE123','B_ELEC','FINAL',projectValue,'N');
 logDebug('project value 1 per '+projectValue);
 totalFee +=  feeAmount('FE123');
 editAppSpecific('Electrical 1% fee',projectValue);
 }
if (AInfo['Work Type'] != 'Solar' && totalFee <= 100) {
 removeFees(eleFees);
 updateFee('FE119','B_ELEC','FINAL',1,'N');
 updateFee('FE191','B_ELEC','FINAL',1,'N');
 updateFee('FE120','B_ELEC','FINAL',1,'N');
 }
if (AInfo['Work Type'] != 'Solar' && totalFee > 100) {
 removeFee('FE119','FINAL');
 updateFee('FE120','B_ELEC','FINAL',1,'N');
 updateFee('FE191','B_ELEC','FINAL',1,'N');
 logDebug('Adding elec tech fee: '+totalFee +' tech fee amount is:  '+feeAmount('FE191'));
 }
if (AInfo['Use Component Total Cost Fee'] == 'Yes') {
 editAppSpecific('Electrical total component fee', totalFee );
 }

}
