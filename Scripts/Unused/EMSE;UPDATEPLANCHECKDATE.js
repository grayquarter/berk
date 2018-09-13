
var todaysDate = new Date();
var dateOfPermitIssued = fileDate;
var isPSC = false;
var isInitialCheck = false;
var planCheckType = AInfo['Plan Check Type'];
var planCheckDays = parseInt(AInfo['Plan Check Goal']);
var dueDate = generateDueDate(dateOfPermitIssued, planCheckDays,planCheckType ,isInitialCheck,isPSC);
logDebug('today's date is:  '+dateOfPermitIssued);
logDebug('Due date is:  '+dueDate);
var dueDates = dueDate.split(' PSC ');
editAppSpecific('PSC Plan Check Due Date',dueDates[1]);
editAppSpecific('Plan Check Due Date',dueDates[0]);

