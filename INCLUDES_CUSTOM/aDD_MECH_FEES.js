function aDD_MECH_FEES() {

var totalFees = 0;
var mechFees = 'FM100,FM101,FM102,FM103,FM104,FM105,FM106,FM107,FM108,FM109,FM110,FM111,FM112,FM113,FM114,FM115,FM116,FM117,FM118,FM119,FM120,FM121';
if (AInfo['Gas Appliance 1 to 2 Units'] > 0) {
 updateFee('FM100','B_MECH','FINAL',AInfo['Gas Appliance 1 to 2 Units'] ,'N');
 totalFees = totalFees + feeAmount('FM100');
 }
if (AInfo['Gas Appliannce 3+ Units'] > 0) {
 updateFee('FM101','B_MECH','FINAL',AInfo['Gas Appliannce 3+ Units'] ,'N');
 totalFees = totalFees + feeAmount('FM101');
 }
if (AInfo['Gas Pipe Repair/Alter/Extend'] > 0) {
 updateFee('FM102','B_MECH','FINAL',AInfo['Gas Pipe Repair/Alter/Extend'],'N');
 totalFees = totalFees + feeAmount('FM102');
 }
if (AInfo['Gas Service (with Meter)'] > 0) {
 updateFee('FM103','B_MECH','FINAL',AInfo['Gas Service (with Meter)'],'N');
 totalFees = totalFees + feeAmount('FM103');
 }
if (AInfo['Additional Gas Meters'] > 0) {
 updateFee('FM104','B_MECH','FINAL',AInfo['Additional Gas Meters'] ,'N');
 totalFees = totalFees + feeAmount('FM104');
 }
if (AInfo['Gas Pipe Outlets'] > 0) {
 updateFee('FM105','B_MECH','FINAL',AInfo['Gas Pipe Outlets'] ,'N');
 totalFees = totalFees + feeAmount('FM105');
 }
if (AInfo['Gas Pipe Pressure Test Only'] > 0) {
 updateFee('FM106','B_MECH','FINAL',AInfo['Gas Pipe Pressure Test Only'] ,'N');
 totalFees = totalFees + feeAmount('FM106');
 }
if (AInfo['Heating/Furnace/AC 100K Btu'] > 0) {
 updateFee('FM107','B_MECH','FINAL',AInfo['Heating/Furnace/AC 100K Btu'] ,'N');
 totalFees = totalFees + feeAmount('FM107');
 }
if (AInfo['Heating/Furnace/AC 101 - 500K Btu'] > 0) {
 updateFee('FM108','B_MECH','FINAL',AInfo['Heating/Furnace/AC 101 - 500K Btu'],'N');
 totalFees = totalFees + feeAmount('FM108');
 }
if (AInfo['Heating/Furnace/AC 500K+ Btu'] > 0) {
 updateFee('FM109','B_MECH','FINAL',AInfo['Heating/Furnace/AC 500K+ Btu'],'N');
 totalFees = totalFees + feeAmount('FM109');
 }
if (AInfo['Air Handling Equip., To 10K Cfm'] > 0) {
 updateFee('FM110','B_MECH','FINAL',AInfo['Air Handling Equip., To 10K Cfm'],'N');
 totalFees = totalFees + feeAmount('FM110');
 }
if (AInfo['Air Handling Equip over 10K Cfm'] > 0) {
 updateFee('FM111','B_MECH','FINAL',AInfo['Air Handling Equip over 10K Cfm'] ,'N');
 totalFees = totalFees + feeAmount('FM111');
 }
if (AInfo['Boilers up to 100K Btu'] > 0) {
 updateFee('FM112','B_MECH','FINAL',AInfo['Boilers up to 100K Btu'],'N');
 totalFees = totalFees + feeAmount('FM112');
 }
if (AInfo['Boilers 101 - 500K Btu'] > 0) {
 updateFee('FM113','B_MECH','FINAL',AInfo['Boilers 101 - 500K Btu'] ,'N');
 totalFees = totalFees + feeAmount('FM113');
 }
if (AInfo['Boilers Over 500K+ Btu'] > 0) {
 updateFee('FM114','B_MECH','FINAL',AInfo['Boilers Over 500K+ Btu'] ,'N');
 totalFees = totalFees + feeAmount('FM114');
 }
if (AInfo['Hoods Residential'] > 0) {
 updateFee('FM115','B_MECH','FINAL',AInfo['Hoods Residential'] ,'N');
 totalFees = totalFees + feeAmount('FM115');
 }
if (AInfo['Ducts, Fans, Registers, Dampers'] > 0) {
 updateFee('FM116','B_MECH','FINAL',AInfo['Ducts, Fans, Registers, Dampers'] ,'N');
 totalFees = totalFees + feeAmount('FM116');
 }
if (AInfo['Prefab Fireplace'] > 0) {
 updateFee('FM117','B_MECH','FINAL',AInfo['Prefab Fireplace'] ,'N');
 totalFees = totalFees + feeAmount('FM117');
 }
if (AInfo['Vent, Flue, or Chimney'] > 0) {
 updateFee('FM118','B_MECH','FINAL',AInfo['Vent, Flue, or Chimney'] ,'N');
 totalFees = totalFees + feeAmount('FM118');
 }
if (AInfo['Hoods Commercial Type I'] > 0) {
 updateFee('FM119','B_MECH','FINAL',AInfo['Hoods Commercial Type I'] ,'N');
 totalFees = totalFees + feeAmount('FM119');
 }
if (AInfo['Hoods Commercial Type II'] > 0) {
 updateFee('FM120','B_MECH','FINAL',AInfo['Hoods Commercial Type II'] ,'N');
 totalFees = totalFees + feeAmount('FM120');
 }
if (totalFees <= 100) {
 removeFees(mechFees);
 updateFee('FM121','B_MECH','FINAL',1,'N');
 updateFee('FM122','B_MECH','FINAL',1,'N');
 updateFee('FM210','B_MECH','FINAL',1,'N');
 }
if (totalFees > 100) {
 removeFee('FM121','FINAL');
 updateFee('FM122','B_MECH','FINAL',1,'N');
 totalFees = totalFees  + feeAmount('FM122');
 updateFee('FM210','B_MECH','FINAL',1,'N');
 }

}
