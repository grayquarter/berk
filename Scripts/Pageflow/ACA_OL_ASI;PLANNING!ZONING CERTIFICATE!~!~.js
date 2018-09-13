
vParcel = null;
vParcel = getParcel4ACA();
vZoning=null;
if (vParcel) {
 vZoning=getGISInfoParcel('AGIS_BERKELEY','Zoning Districts','ZONDIST',vParcel);
 }
if (vZoning) {
 editAppSpecific4ACA('zoningDistrict',vZoning);
 }

