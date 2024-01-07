using Godot;
using System;

public partial class StartButton : Button
{
	public override void _Pressed()
	{
		base._Pressed();

		var editorScene = ResourceLoader.Load<PackedScene>("res://Scenes/Editor.tscn").Instantiate();
		GetTree().Root.AddChild(editorScene);
		var mainMenu = GetNode<Control>("/root/Main Menu");
		mainMenu.Hide();
		mainMenu.QueueFree();
	}
}
