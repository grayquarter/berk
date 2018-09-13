
parentName = null;
parentCapId = getParent();
if (parentCapId) {
	parentCap = aa.cap.getCap(parentCapId).getOutput();
	if (parentCap)
		parentName = parentCap.getSpecialText();
}
if (parentName) {
	editAppName(parentName);
}
