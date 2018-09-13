
if (cca[thisCC]) {
 pm = cca[thisCC].getPeople();
 pma = pm.getAttributes().toArray();
 } else {
 pm = null;
 pma = null;
 flagToSet = null;
 }
if (pm && pma) {
 for (thispma in pma) if (pma[thispma].getAttributeName().equals('INDIVIDUALORORGANIZATION4ACA')) flagToSet = pma[thispma].getAttributeValue().toUpperCase();
 }
if (flagToSet) {
 pm.setContactTypeFlag(flagToSet.toLowerCase());
 aa.people.editCapContact(cca[thisCC].getCapContactModel());
 }

