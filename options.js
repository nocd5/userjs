SetTabContents(4, "JavaScript", '<form name="E" style="height: 100%"><textarea name="js" style="width: 100%; height: 100%" wrap="off" onchange="g_bJs=true"></textarea></form>');
document.getElementById("toolbar").innerHTML = '<input type="button" value="Refresh" onclick="ReloadUserJs()" />&nbsp;<input type="button" value="Open" onclick="EditUserJs()" />';

ReadUserJs = function ()
{
	g_bJs = false;
	var ado = OpenAdodbFromTextFile(fso.BuildPath(te.Data.DataFolder, "config\\user.js"));
	if (ado) {
		document.E.js.value = ado.ReadText(adReadAll);
		ado.Close();
	}
}

ReloadUserJs = function ()
{
	if (!window.g_bJs || confirmOk("Are you sure?")) {
		ReadUserJs();
	}
}

EditUserJs = function ()
{
	SaveUserJs();
	MainWindow.InvokeCommand(fso.BuildPath(te.Data.DataFolder, "config\\user.js"), 0, te.hwnd, "Edit", null, null, SW_SHOWNORMAL, 0, 0, te, CMF_DEFAULTONLY);
}

SaveUserJs = function ()
{
	if (window.g_bJs) {
		var fn = fso.BuildPath(te.Data.DataFolder, "config\\user.js");
		try {
			var ado = api.CreateObject("ads");
			ado.CharSet = "utf-8";
			ado.Open();
			ado.WriteText(document.E.js.value.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n"));
			ado.SaveToFile(fn, adSaveCreateOverWrite);
			ado.Close();
			g_bJs = false;
		} catch (e) {
			ShowError(e, fn);
		}
	}
}

SaveLocation = SaveUserJs;
ReadUserJs();
