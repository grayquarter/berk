
showMessage=true;
var gsi = gsoArry[x];
gsi.loadInfo();
gsi.loadInfoTables();
var rowVals = new Array();
if (gsi.status == 'Yes' && gsi.validInfo && gsi.validTables) {
 for (i in gsi.infoTables['CODE_INSPECT']) rowVals['Violation'] = new asiTableValObj('Violation',gsi.text,'N');
 rowVals['Violation Number'] = new asiTableValObj('Violation Number',gsi.infoTables['CODE_INSPECT'][i]['Violation Number'],'N');
 rowVals['Violation Count'] = new asiTableValObj('Violation Count',gsi.infoTables['CODE_INSPECT'][i]['Violation Count'],'N');
 rowVals['Inspector Comments'] = new asiTableValObj('Inspector Comments',gsi.infoTables['CODE_INSPECT'][i]['Inspector Comments'],'N');
 rowVals['Ticket Number'] = new asiTableValObj('Ticket Number',gsi.infoTables['CODE_INSPECT'][i]['Ticket Number'],'N');
 addToASITable('ENFORCEMENT VIOLATIONS', rowVals);
 }

