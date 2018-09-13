
if (inspType.indexOf('1200 Building Final') > -1 && matches(inspResult,'Approved') && matches(AInfo['Certificate of Occupancy Required'],'Yes','Y')) {
 activateTask('Certificate of Occupancy');
 }

