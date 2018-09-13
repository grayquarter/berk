
vParcel = null;
vParcel = getParcel4ACA();
vFireZone=null;
if (vParcel) {
 vFireZone = getGISInfoParcel('AGIS_BERKELEY','Fire Districts  Hill Zones 1 2 or 3','PLN_HILL_ZONE',vParcel);
 }
if (vFireZone) {
 editAppSpecific4ACA('Fire Zone',vFireZone);
 }

