function bUILD_CHILD_ALTID() {

pCapId = getParent();
logDebug('The pCapId is:'+pCapId);
cCapId = capId;
logDebug('The ccapId is:'+cCapId);
logDebug('Child Type is :'+childType);
childString = updateChildAltID2Digits(pCapId,cCapId,childType);
logDebug('Child AltID = ' + childString);

}
