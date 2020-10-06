var Addons_Id = "userjs";
if (window.Addon == 1) {
	importScript(fso.BuildPath(te.Data.DataFolder, "config\\user.js"));
} else {
	importScript("addons\\" + Addon_Id + "\\options.js");
}
