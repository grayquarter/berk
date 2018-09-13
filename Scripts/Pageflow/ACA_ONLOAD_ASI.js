
showDebug = false;
showMessage= false;

//replaced branch(EMSE:GlobalFlags)
globalFlags();
branch('ACA_OL_ASI:' + appTypeArray[0] + '/*/*/*');
branch('ACA_OL_ASI:' + appTypeArray[0] + '/' + appTypeArray[1] + '/*/*');
branch('ACA_OL_ASI:' + appTypeArray[0] + '/' + appTypeArray[1] + '/*/*');
branch('ACA_OL_ASI:' + appTypeArray[0] + '/' + appTypeArray[1] + '/' + appTypeArray[2] + '/*');
branch('ACA_OL_ASI:' + appTypeArray[0] + '/*/*/' + appTypeArray[3]);
branch('ACA_OL_ASI:' + appTypeString);
branch('ACA_OL_ASI:' + '*/*/*');

