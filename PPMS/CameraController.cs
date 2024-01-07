using Godot;
using System;
using System.Diagnostics;

public partial class CameraController : Camera3D
{
	private RayCast3D rayCast;
	private MeshInstance3D gridPlane;

	private Vector2 mousePos;
	private Vector3 moveVector;

	public override void _Ready()
	{
		rayCast = GetNode<RayCast3D>("CameraGizmosRaycast");
		gridPlane = GetNode<MeshInstance3D>("GridPlane");
	}

	public override void _Process(double delta)
	{
		var fdelta = (float)delta;

		// if (Input.IsActionPressed("move_forward"))
		// {
		//     Position = new Vector3(Position.X, Position.Y, Position.Z - 10f * fdelta);
		// }
		// if (Input.IsActionPressed("move_backward"))
		// {
		//     Position = new Vector3(Position.X, Position.Y, Position.Z + 10f * fdelta);
		// }
		// if (Input.IsActionPressed("move_left"))
		// {
		//     Position = new Vector3(Position.X - 10f * fdelta, Position.Y, Position.Z);
		// }
		// if (Input.IsActionPressed("move_right"))
		// {
		//     Position = new Vector3(Position.X + 10f * fdelta, Position.Y, Position.Z);
		// }
		// if(Input.IsKeyPressed(Key.Space))
		// {
		//     Position = new Vector3(Position.X, Position.Y + 10f * fdelta, Position.Z);
		// }
		// if(Input.IsKeyPressed(Key.Shift))
		// {
		//     Position = new Vector3(Position.X, Position.Y - 10f * fdelta, Position.Z);
		// }

		Vector2 newMousePos = GetViewport().GetMousePosition();
		Vector3 from = ProjectRayOrigin(newMousePos);
		Vector3 to = from + ProjectRayNormal(newMousePos) * 100000;

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
				gi.Activate(this, newMousePos);
			}
			else
			{
				gi.Highlight();
			}
		}

		//movement
		if (Input.IsMouseButtonPressed(MouseButton.Right)){
			MoveCamera(newMousePos, fdelta);
		}

		mousePos = newMousePos;
	}

	private void MoveCamera(Vector2 newMousePos, float delta){
		Vector2 mousePosDelta = newMousePos-mousePos;
		if (mousePosDelta == Vector2.Zero){
			return;
		}
		float deltaDist = Mathf.Sqrt((mousePosDelta.X*mousePosDelta.X)+(mousePosDelta.Y*mousePosDelta.Y))*0.4f;
		//Debug.WriteLine(deltaDist);
		mousePosDelta = mousePosDelta.Normalized();
		moveVector = -Transform.Basis.X *mousePosDelta.X + Transform.Basis.Y*mousePosDelta.Y;
		Position = Position+moveVector*deltaDist*delta;
	}

    private void RotateCamera(){

    }
}
