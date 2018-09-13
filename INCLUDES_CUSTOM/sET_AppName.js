function sET_AppName() {

permitName = 'Permit';
comboName = '';
if (matches(AInfo['Work Type'],'Demolition','Sign','Solar','Structure Move','Electrical Vehicle Charging')) {
 permitName = AInfo['Work Type'] + ' ';
 }
if (AInfo['Building'] == 'Yes') {
 comboName = 'Building ';
 }
if (AInfo['Electrical'] == 'Yes') {
 comboName = comboName + 'Electrical ';
 }
if (AInfo['Mechanical'] == 'Yes') {
 comboName = comboName + 'Mechanical ';
 }
if (AInfo['Plumbing'] == 'Yes') {
 comboName = comboName + 'Plumbing ';
 }
if (permitName == 'Permit' && comboName != '') {
 permitName = comboName + permitName;
 } else {
 permitName = permitName + comboName + 'Permit';
 }
editAppName(permitName);
logDebug('Value of permitName is:  '+permitName);

}
