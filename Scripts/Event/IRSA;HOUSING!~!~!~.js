
if (false) {
 /* Assess reinspection fees based on inspection result status */;
 }
if (inspType == 'Re-inspection' && matches(inspResult,'Complete with $300 fee')) {
 addFee('F500','ENF_HOUSE','FINAL',1,'N');
 }
if (inspType == 'Re-inspection' && matches(inspResult,'Complete with $400 fee')) {
 addFee('F510','ENF_HOUSE','FINAL',1,'N');
 }

