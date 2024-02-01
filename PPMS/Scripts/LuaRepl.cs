using System;
using System.Linq;
using Godot;
using NLua;
using NLua.Event;


public partial class LuaRepl : Control
{
	private LineEdit ExpressionInput;
	private TextEdit ExpressionOutput;
	private Lua L;
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		ExpressionInput = GetNode<LineEdit>("ExpressionInput");
		ExpressionOutput = GetNode<TextEdit>("ExpressionOutput");
		L = new Lua();
		L.HookException += Oopsie;
		L.NewTable("Repl");
#pragma warning disable CS8974 // Converting method group to non-delegate type
		L["Repl.Help"] = Help;
		L["Repl.Clear"] = Clear;
#pragma warning restore CS8974 // Converting method group to non-delegate type

		ExpressionInput.GuiInput += ExprInput;
	}

	private void Oopsie(object sender, HookExceptionEventArgs e)
	{
		throw new NotImplementedException();
	}

	private void ExprInput(InputEvent @event)
	{
		if (!@event.IsActionPressed("ui_text_newline")) return;

		ExpressionOutput.Text += "> " + ExpressionInput.Text + "\n";
		//var expr = L.DoString("local func, err = load([[" + ExpressionInput.Text +"]]); if err then return err else return pcall(func) end");
		var expr = L.DoString(ExpressionInput.Text);
		ExpressionInput.Text = "";

		ExpressionOutput.Text += String.Join('\t', expr) + "\n";
	}

	private void Help()
	{
		ExpressionOutput.Text += @"
Interactive Lua Console Help
Outputting to the console: use `return` keyword.

Repl library:
	Repl.Help() -> opens this 
	Repl.Clear() -> clears the console output

More help TBA.
";
		ExpressionOutput.Text += "\n";
	}
	private void Clear()
	{
		ExpressionOutput.Text = "";
	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	public override void _Process(double delta)
	{
	}
}
