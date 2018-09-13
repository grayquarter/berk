function aDD_PLUMB_FEES() {

/*all plumbing component fees are:*/ var allFees=  'FB200,FB124,FB123,FB100,FB101,FB102,FB103,FB104,FB105,FB106,FB107,FB108,FB109,FB110,FB111,FB112,FB113,FB114,FB115,FB116,FB117,FB118,FB119,FB131,FB132,FB133,FB134,FB135,FB136,FB137,FB138,FB139,FB120,FB121,FB130';
var feeTotal = 0.0;
var feeName = '';
logDebug('DWV value is:  ' + AInfo['Fixtures (with water and DWV)'] + ' and use fixture is:  '+AInfo['Use fixtures field input'] );
if (AInfo['Water Heater (with Vent and Electrical)'] > 0) {
 feeName += 'FB100,';
 updateFee('FB100','B_PLUMB','FINAL',AInfo['Water Heater (with Vent and Electrical)'] ,'N');
 feeTotal = feeTotal + feeAmount('FB100');
 }
if (AInfo['Solar Water Heater'] > 0) {
 feeName += 'FB101,';
 updateFee('FB101','B_PLUMB','FINAL',AInfo['Solar Water Heater'],'N');
 feeTotal = feeTotal + feeAmount('FB101');
 }
if (AInfo['Fixtures (with water and DWV)'] > 0) {
 feeName += 'FB103,';
 updateFee('FB103','B_PLUMB','FINAL',AInfo['Fixtures (with water and DWV)'],'N');
 feeTotal = feeTotal + feeAmount('FB103');
 }
if (AInfo['Water Main <=25 outlets'] > 0) {
 feeName += 'FB104,';
 updateFee('FB104','B_PLUMB','FINAL',AInfo['Water Main <=25 outlets'] ,'N');
 feeTotal = feeTotal + feeAmount('FB104');
 }
if (AInfo['Water Main additional outlet'] > 0) {
 feeName += 'FB105,';
 updateFee('FB105','B_PLUMB','FINAL',AInfo['Water Main additional outlet'] ,'N');
 feeTotal = feeTotal + feeAmount('FB105');
 }
if (AInfo['Water Main Service (meter to bldg)'] > 0) {
 feeName += 'FB106,';
 updateFee('FB106','B_PLUMB','FINAL',AInfo['Water Main Service (meter to bldg)'],'N');
 feeTotal = feeTotal + feeAmount('FB106');
 }
if (AInfo['Additional Water Meter'] > 0) {
 feeName += 'FB107,';
 updateFee('FB107','B_PLUMB','FINAL',AInfo['Additional Water Meter'] ,'N');
 feeTotal = feeTotal + feeAmount('FB107');
 }
if (AInfo['Sewer (on private property)'] > 0) {
 feeName += 'FB108,';
 updateFee('FB108','B_PLUMB','FINAL',AInfo['Sewer (on private property)'] ,'N');
 feeTotal = feeTotal + feeAmount('FB108');
 }
if (AInfo['Stand Pipe System'] > 0) {
 feeName += 'FB109,';
 updateFee('FB109','B_PLUMB','FINAL',AInfo['Stand Pipe System'] ,'N');
 feeTotal = feeTotal + feeAmount('FB109');
 }
if (AInfo['Water Line <= 25 outlets'] > 0) {
 feeName += 'FB110,';

 updateFee('FB110','B_PLUMB','FINAL',AInfo['Water Line <= 25 outlets'],'N');
 feeTotal = feeTotal + feeAmount('FB110');
 }
if (AInfo['Water Line additional outlet'] > 0) {
 feeName += 'FB111,';
 updateFee('FB111','B_PLUMB','FINAL',AInfo['Water Line additional outlet'] ,'N');
 feeTotal = feeTotal + feeAmount('FB111');
 }
if (AInfo['Lawn Sprinkler 1-2 Family Dwelling'] > 0) {
 feeName += 'FB112,';
 updateFee('FB112','B_PLUMB','FINAL',AInfo['Lawn Sprinkler 1-2 Family Dwelling'],'N');
 feeTotal = feeTotal + feeAmount('FB112');
 }
if (AInfo['Lawn Sprinkler all other'] > 0) {
 feeName += 'FB113,';
 updateFee('FB113','B_PLUMB','FINAL',AInfo['Lawn Sprinkler all other'] ,'N');
 feeTotal = feeTotal + feeAmount('FB113');
 }
if (AInfo['Inside Rain Leader/System'] > 0) {
 feeName += 'FB114,';
 updateFee('FB114','B_PLUMB','FINAL',AInfo['Inside Rain Leader/System'],'N');
 feeTotal = feeTotal + feeAmount('FB114');
 }
if (AInfo['Swimming Pool Filtration System'] > 0) {
 feeName += 'FB115,';
 updateFee('FB115','B_PLUMB','FINAL',AInfo['Swimming Pool Filtration System'] ,'N');
 feeTotal = feeTotal + feeAmount('FB115');
 }
if (AInfo['Gas Pipe, Repair/Alter'] > 0) {
 feeName += 'FB116,';
 updateFee('FB116','B_PLUMB','FINAL',AInfo['Gas Pipe, Repair/Alter'] ,'N');
 feeTotal = feeTotal + feeAmount('FB116');
 }
if (AInfo['Gas Pipe,Service (with Meter)'] > 0) {
 feeName += 'FB117,';
 updateFee('FB117','B_PLUMB','FINAL',AInfo['Gas Pipe,Service (with Meter)'],'N');
 feeTotal = feeTotal + feeAmount('FB117');
 }
if (AInfo['Gas Pipe, additional meters'] > 0) {
 feeName += 'FB118,';
 updateFee('FB118','B_PLUMB','FINAL',AInfo['Gas Pipe, additional meters'],'N');
 feeTotal = feeTotal + feeAmount('FB118');
 }
if (AInfo['Gas Pipe, outlets'] > 0) {
 feeName += 'FB119,';
 updateFee('FB119','B_PLUMB','FINAL',AInfo['Gas Pipe, outlets'],'N');
 feeTotal = feeTotal + feeAmount('FB119');
 }
if (AInfo['SubsoilStormDrainagePiping'] > 0) {
 feeName += 'FB131,';
 updateFee('FB131','B_PLUMB','FINAL',AInfo['SubsoilStormDrainagePiping'],'N');
 feeTotal = feeTotal + feeAmount('FB131');
 }
if (AInfo['RemovalIllicitConnections'] > 0) {
 feeName += 'FB132,';
 updateFee('FB132','B_PLUMB','FINAL',AInfo['RemovalIllicitConnections'],'N');
 feeTotal = feeTotal + feeAmount('FB132');
 }
if (AInfo['WaterAirPressureTest'] > 0) {
 feeName += 'FB133,';
 updateFee('FB133','B_PLUMB','FINAL',AInfo['WaterAirPressureTest'],'N');
 feeTotal = feeTotal + feeAmount('FB133');
 }
if (AInfo['BackflowPreventer'] > 0) {
 feeName += 'FB134,';
 updateFee('FB134','B_PLUMB','FINAL',AInfo['BackflowPreventer'],'N');
 feeTotal = feeTotal + feeAmount('FB134');
 }
if (AInfo['HydronicWaterPiping'] > 0) {
 feeName += 'FB135,';
 updateFee('FB135','B_PLUMB','FINAL',AInfo['HydronicWaterPiping'],'N');
 feeTotal = feeTotal + feeAmount('FB135');
 }
if (AInfo['GrayWaterOneOrTwoFamilyDwellings']>0) {
 feeName += 'FB136,';
 updateFee('FB136','B_PLUMB','FINAL',AInfo['GrayWaterOneOrTwoFamilyDwellings'],'N');
 feeTotal = feeTotal + feeAmount('FB136');
 }
if (AInfo['GrayWaterMultiUnitResidentialOrCommercial']>0) {
 feeName += 'FB137,';
 updateFee('FB137','B_PLUMB','FINAL',AInfo['GrayWaterMultiUnitResidentialOrCommercial'],'N');
 feeTotal = feeTotal + feeAmount('FB137');
 }
if (AInfo['NonpotableRainwaterCatchmentOneOrTwoFamilyDwellings']>0) {
 feeName += 'FB138,';
 updateFee('FB138','B_PLUMB','FINAL',AInfo['NonpotableRainwaterCatchmentOneOrTwoFamilyDwellings'],'N');
 feeTotal = feeTotal + feeAmount('FB138');
 }
if (AInfo['NonpotableRainwaterCatchmentMultiUnitResidentialOrCommercial']>0) {
 feeName += 'FB139,';
 updateFee('FB139','B_PLUMB','FINAL',AInfo['NonpotableRainwaterCatchmentMultiUnitResidentialOrCommercial'],'N');
 feeTotal = feeTotal + feeAmount('FB139');
 }
if (AInfo['Gas Pipe, Pressure Test Only'] > 0) {
 feeName += 'FB120,';
 updateFee('FB120','B_PLUMB','FINAL',AInfo['Gas Pipe, Pressure Test Only'],'N');
 feeTotal = feeTotal + feeAmount('FB120');
 }
if (AInfo['Seismic Gas Shut-Off Valve'] > 0) {
 feeName += 'FB121,';
 updateFee('FB121','B_PLUMB','FINAL',AInfo['Seismic Gas Shut-Off Valve'] ,'N');
 feeTotal = feeTotal + feeAmount('FB121');
 }
if (AInfo['Seismic Gas Shut-Off Valve, group'] > 0) {
 feeName += 'FB130,';
 updateFee('FB130','B_PLUMB','FINAL',AInfo['Seismic Gas Shut-Off Valve, group'] ,'N');
 feeTotal = feeTotal + feeAmount('FB130');
 }
if (AInfo['Fixtures (with water and DWV)']  > 0 && AInfo['Use fixtures field input'] == 'Yes') {
 feeName += 'FB103,';
 updateFee('FB103','B_PLUMB','FINAL', AInfo['Fixtures (with water and DWV)'] ,'N');
 feeTotal = feeTotal + feeAmount('FB103');
 editAppSpecific('Fixture fee total',feeAmount('FB103'));
 }
if (AInfo['New Residential Buildings and Additions per 100sf'] > 0  && AInfo['Use fixtures field input'] == 'No'  && AInfo['Category'] != 'Commercial') {
 feeTotal = 0;
 removeFees(allFees);
 feeName += 'FB102,';
 updateFee('FB102','B_PLUMB','FINAL',AInfo['New Residential Buildings and Additions per 100sf'],'N');
 editAppSpecific('New Residential Buildings and Additions Total',feeAmount('FB102'));
 feeTotal = feeTotal + feeAmount('FB102');
 }
if (AInfo['New Residential Buildings and Additions per 100sf'] > 0  && AInfo['Use fixtures field input'] == 'Yes' && AInfo['Category'] != 'Commercial') {
 feeName += 'FB102,';
 updateFee('FB102','B_PLUMB','FINAL',AInfo['New Residential Buildings and Additions per 100sf'],'N');
 editAppSpecific('New Residential Buildings and Additions Total',feeAmount('FB102'));
 feeTotal = feeTotal + feeAmount('FB102');
 }
if (feeTotal <= 100) {
 removeFees(allFees);
 updateFee('FB123','B_PLUMB','FINAL',1,'N');
 updateFee('FB124','B_PLUMB','FINAL',1,'N');
 updateFee('FB200','B_PLUMB','FINAL',1,'N');
 }
if (feeTotal > 100) {
 logDebug('name of all fees is:  '+feeName+ ' and fees total is:  '+feeTotal);
 removeFee('FB123','FINAL');
 updateFee('FB124','B_PLUMB','FINAL',1,'N');
 feeTotal = feeTotal + feeAmount('FB124');
 updateFee('FB200','B_PLUMB','FINAL',1,'N');
 }
editAppSpecific('Fixture fee total',feeTotal);

}
