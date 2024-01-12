using Godot;
using System;

public partial class File : PopupMenu
{
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		IdPressed += PressedOnId;
	}

	private void PressedOnId(long id)
	{
		switch (id)
		{
			case 5:
				var mainmenuScene = ResourceLoader.Load<PackedScene>("res://Scenes/MainMenu.tscn").Instantiate();
				GetTree().Root.AddChild(mainmenuScene);
				var editor = GetNode<Node3D>("/root/Editor");
				editor.Hide();
				editor.QueueFree();
				break;
			case 6:
				GetTree().Quit(0);
				break;
		}
	}
}
