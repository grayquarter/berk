
if (wfTask == 'Issuance' && matches(wfStatus,'Issued','Re-issue')) {
 
//start replaced branch: EMSE:PostDeferredIssuedToParent
 {
vDeferredType = '';
vTradeType = '';
vIsDeferred = false;
if (false) {
 /* Child Type = addType (trade type) plus childType (type of plan check) */;
 }
pCapId = getParent();
logDebug('The pCapId is:'+pCapId);
cCapId = capId;
logDebug('The cCapId is:'+cCapId);
vDeferredType = getAppSpecific('Child Type');
logDebug('vDeferredType = ' + vDeferredType);
if (vDeferredType.indexOf('Electrical') > -1) {
 vTradeType = 'Electrical';
 } else {
 if(vDeferredType.indexOf('Mechanical') > -1) vTradeType = 'Mechanical';
 if(vDeferredType.indexOf('Plumbing') > -1) vTradeType = 'Plumbing';
 }
if (vDeferredType.indexOf('Deferred') > -1) {
 vIsDeferred = true;
 vWhichASI = 'Deferred ' + vTradeType;
 logDebug('vWhichASI = ' + vWhichASI);
 }
if (vIsDeferred) {
 editAppSpecific(vWhichASI,'N',pCapId);
 }

}
//end replaced branch: EMSE:PostDeferredIssuedToParent;
 }

