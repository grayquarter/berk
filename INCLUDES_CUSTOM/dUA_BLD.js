function dUA_BLD() {

docDetails = newDocModelArr[eachDoc];
//for (x in docDetails) comment(x + ' = ' + docDetails[x]);
if (matches(docDetails['docGroup'],'BLD','BLD ACA') && matches(docDetails['docCategory'],'Plans','Construction Plans') && matches(docDetails['categoryByAction'],'RESUBMIT')) {
 afterResubmitDocument();
 documentID = docDetails['documentNo'];
 adsDocumentModel = aa.document.getDocumentByPK(documentID).getOutput();
 var checkInDocumentId = adsDocumentModel.getParentSeqNbr();
 var checkInDocument = aa.document.getDocumentByPK(checkInDocumentId).getOutput();
 checkInDocument.setResubmit(false);
 aa.document.updateDocument(checkInDocument);
 }

}
