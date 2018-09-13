function aSIUA_BLD_EDIT CONST TYPE() {

constType = null;
constTypeCode = null;
if (appMatch('Building/Permit/*/*') || appMatch('Building/Revision or Deferred/*/*')) constType = getAppSpecific('Type of Construction');
if (appMatch('Building/Minor/*/*')) constType = getAppSpecific('Construction Type');
if (!matches(constType,null,undefined,'')) {
 if(constType == 'IA') constTypeCode = '01';
 if(constType == 'IB') constTypeCode = '02';
 if(constType == 'IIA') constTypeCode = '03';
 if(constType == 'IIB') constTypeCode = '04';
 if(constType == 'IIIA') constTypeCode = '05';
 if(constType == 'IIIB') constTypeCode = '06';
 if(constType == 'IV-HT') constTypeCode = '07';
 if(constType == 'VA') constTypeCode = '08';
 if(constType == 'VB') constTypeCode = '09';
 }
if (matches(constType,null,undefined,'')) {
 constTypeCode = '10';
 }
if (constTypeCode != null) {
 editConstType(constTypeCode);
 }

}
