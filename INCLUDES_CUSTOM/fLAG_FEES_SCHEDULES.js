function fLAG_FEES_SCHEDULES() {

var totalFee = 0.00;
var varcount = 0;
var occupancy = AInfo['Type of Occupancy'];
logDebug('Occupancy is:  '+occupancy);
comment('About to add:  '+specFeeCodes[thisCode]+' and index of occupance for R3 is:  '+occupancy.indexOf('R3') );
if (specFeeCodes[thisCode] != null && specFeeCodes[thisCode]!='F120' && specFeeCodes[thisCode]!='FE191') {
 feeName = specFeeCodes[thisCode];
 comment('Fee Name = ' + feeName);
 updateFee(feeName,varFeeSched,'FINAL',1,'N');
 }
if (feeName == 'F110') {
 totalFee = totalFee + feeAmount(feeName);
 comment('just added total fee for:  '+feeName+' and total fee is now:  '+totalFee+' on fee schedule: '+varFeeSched);
 }
if (feeName == 'F110') {
 removeFee('F120','FINAL');
 updateFee('F120','B_BLDG','FINAL',1,'N');
 }

}
