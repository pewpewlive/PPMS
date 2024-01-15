using Godot;
using System;

public partial class About : Window
{
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		CloseRequested += onCloseRequested;
	}

	private void onCloseRequested() {
		Hide();
		QueueFree();
	}
}
