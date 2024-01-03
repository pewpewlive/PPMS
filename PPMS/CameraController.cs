using Godot;
using System;

public partial class CameraController : Camera3D
{
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	public override void _Process(double delta)
	{
		var fdelta = (float)delta;

        if (Input.IsActionPressed("move_forward"))
		{
            Position = new Vector3(Position.X, Position.Y, Position.Z - 10f * fdelta);
        }
        if (Input.IsActionPressed("move_backward"))
        {
            Position = new Vector3(Position.X, Position.Y, Position.Z + 10f * fdelta);
        }
        if (Input.IsActionPressed("move_left"))
        {
            Position = new Vector3(Position.X - 10f * fdelta, Position.Y, Position.Z);
        }
        if (Input.IsActionPressed("move_right"))
        {
            Position = new Vector3(Position.X + 10f * fdelta, Position.Y, Position.Z);
        }
    }
}
