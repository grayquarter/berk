
var vCapContactModel = AInfo[''];
var cContactTypeToCheckFor = 'Reporting Party';
var vContactFound = false;
var vContactSeqNumber = 0;
var vPeopleModel = AInfo[''];
vCapContactModel = vContactAry[ yy ].getCapContactModel();
vContactFound = true;
if (vContactFound) {
 vPeopleModel = vContactAry[ yy ].getPeople();
 }
if (vContactFound) {
 vContactSeqNumber = parseInt( vPeopleModel.getContactSeqNumber());
 }
if (vContactFound) {
 aa.people.removeCapContact( licCapId, vContactSeqNumber );
 }

