
if (estValue != AInfo['Job Valuation']) {
 updateValFlag = true;
 comment('Job Value = ' + estValue);
 } else {
 updateValFlag = false;
 }
aa.finance.reCalculateFees(capId,'CONT',AInfo['Job Valuation']);
newTblArray = new Array();
newRowArray = new Array();
strValuation = '';
if(String(getAppSpecific('Job Valuation')) == 'null') strValuation = '0';
else strValuation = String(getAppSpecific('Job Valuation'));
newRowArray['Valuation'] = String(strValuation);
newRowArray['Date'] = dateAdd(null,0);
newRowArray['Updated By'] = String(currentUserID);
if (typeof(VALUATIONHISTORY) != 'object') {
 newTblArray.push(newRowArray);
 addASITable('VALUATION HISTORY',newTblArray);
 }
if (typeof(VALUATIONHISTORY) == 'object') {
 addToASITable('VALUATION HISTORY',newRowArray);
 }

