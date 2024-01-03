using System;
using Godot;
using NLua;

public partial class plugin_slot : Node
{
    private Lua L = new Lua();

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        L.NewTable("PPMS");
        L.NewTable("PPMS.UI");
        L["PPMS.Print"] = (string what) => GD.Print(what);
        L["PPMS.UI.Button"] = (string title, LuaFunction function) => CreateButton(title, function);

        var file = FileAccess.Open("res://main.lua", FileAccess.ModeFlags.Read);
        string content = file.GetAsText();
        file.Close();
        L.DoString(content);

        var label = new Label
        {
            Text = "Hello World!"
        };
        AddChild(label);
    }

    private void CreateButton(string title, LuaFunction function)
    {
        var button = new Button
        {
            Text = title,
        };
        button.Pressed += () => function.Call();
        GetNode("HFlowContainer").AddChild(button);
    }
}
