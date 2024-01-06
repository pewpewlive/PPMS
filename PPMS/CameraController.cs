using Godot;
using System;

public partial class CameraController : Camera3D
{
    private RayCast3D rayCast;
    private MeshInstance3D gridPlane;

	public override void _Ready()
	{
        rayCast = GetNode<RayCast3D>("CameraGizmosRaycast");
        gridPlane = GetNode<MeshInstance3D>("GridPlane");
    }

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

        Vector2 mousePos = GetViewport().GetMousePosition();
        Vector3 from = ProjectRayOrigin(mousePos);
        Vector3 to = from + ProjectRayNormal(mousePos) * 100000;

        //var spaceState = GetWorld3D().DirectSpaceState;
        //var query = PhysicsRayQueryParameters3D.Create(GlobalPosition, GlobalPosition + to);
        //var result = spaceState.IntersectRay(query);

        rayCast.TargetPosition = to;

        //foreach ( var item in result )
        //    GD.Print(item.Key.AsString());
        
        if (rayCast.IsColliding())
        {
            Node3D node = rayCast.GetCollider() as Node3D;
            GizmosInteractable gi = node.GetParent() as GizmosInteractable;
            if (Input.IsMouseButtonPressed(MouseButton.Left))
            {
                //rayCast.
                gi.Manipulate(this, mousePos);
            }
            else
            {
                gi.Highlight();
            }
        }
    }
}
