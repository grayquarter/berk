
newDocModelArr = documentModelArray.toArray();
for (eachDoc in newDocModelArr) 
//start replaced branch: EMSE:DUA_FIRE
 {
docDetails = newDocModelArr[eachDoc];
//for (x in docDetails) comment(x + ' = ' + docDetails[x]);
if (matches(docDetails['docGroup'],'FIRE','FIRE ACA') && matches(docDetails['docCategory'],'Plans','Construction Plans') && matches(docDetails['categoryByAction'],'RESUBMIT')) {
 afterResubmitDocument();
 documentID = docDetails['documentNo'];
 adsDocumentModel = aa.document.getDocumentByPK(documentID).getOutput();
 var checkInDocumentId = adsDocumentModel.getParentSeqNbr();
 var checkInDocument = aa.document.getDocumentByPK(checkInDocumentId).getOutput();
 checkInDocument.setResubmit(false);
 aa.document.updateDocument(checkInDocument);
 }

}
//end replaced branch: EMSE:DUA_FIRE;

