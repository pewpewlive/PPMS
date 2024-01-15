using Godot;
using System;

public partial class Edit : PopupMenu
{
	public override void _Ready()
	{
		IdPressed += PressedOnId;
	}

	private void PressedOnId(long id)
	{
		switch (id)
		{
			case 4:
				var aboutWindowScene = ResourceLoader.Load<PackedScene>("res://Scenes/UI/About.tscn").Instantiate();
				GetNode<Control>("/root/Editor/CanvasLayer/UserInterface/").AddChild(aboutWindowScene);
				break;
		}
	}
}
