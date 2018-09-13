
vApp = createChildNoContacts('Enforcement','Enforcement','General','NA',conArry[x].getPeople().businessName);
if (vApp) {
 p = conArry[x].getCapContactModel();
 p.setCapID(vApp);
 aa.people.createCapContactWithAttribute(p);
 scheduleInspection('Sweep Inspection',1,'EOLSON',null,null,vApp);
 }

