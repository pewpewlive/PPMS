using Godot;
using System;
using System.Diagnostics;

public partial class CameraController : Camera3D
{
	private RayCast3D rayCast;
	private MeshInstance3D gridPlane;

	private Vector2 mousePos;
	private Vector3 lookAtPos;
	private Vector2 cameraAngle;

	float zoom;

	public override void _Ready()
	{
		rayCast = GetNode<RayCast3D>("CameraGizmosRaycast");
		gridPlane = GetNode<MeshInstance3D>("GridPlane");
		ResetCamera();
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


		//var spaceState = GetWorld3D().DirectSpaceState;
		//var query = PhysicsRayQueryParameters3D.Create(GlobalPosition, GlobalPosition + to);
		//var result = spaceState.IntersectRay(query);

		Vector2 newMousePos = GetViewport().GetMousePosition();
		rayCast.TargetPosition = ProjectRayOrigin(newMousePos) + ProjectRayNormal(newMousePos) * 100000;

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
		if (Input.IsMouseButtonPressed(MouseButton.Middle) && Input.IsKeyPressed(Key.Shift))
		{
			PanCamera(newMousePos, fdelta);
		}
		else if (Input.IsMouseButtonPressed(MouseButton.Middle))
		{
			RotateCamera(newMousePos, fdelta);
		}
		if (Input.IsKeyPressed(Key.R))
		{
			ResetCamera();
		}
		if (Input.IsActionJustPressed("scroll_up"))
		{
			zoom -= 0.5f;
			UpdateCameraPosition();
		}
		if (Input.IsActionJustPressed("scroll_down"))
		{
			zoom += 0.5f;
			UpdateCameraPosition();
		}

		mousePos = newMousePos;
	}

	private void PanCamera(Vector2 newMousePos, float delta)
	{
		Vector2 mousePosDelta = newMousePos - mousePos;
		if (mousePosDelta == Vector2.Zero)
		{
			return;
		}
		var panAmount = mousePosDelta.Normalized();
		Vector3 CameraOffsetX = Vector3.Back.Cross(Position - lookAtPos).Normalized();
		Vector3 CameraOffsetY = (Position - lookAtPos).Normalized().Cross(CameraOffsetX);
		var cameraOffset = (CameraOffsetX * -mousePosDelta.X + CameraOffsetY * mousePosDelta.Y) / 125;
		lookAtPos += cameraOffset;
		Position += cameraOffset;
	}

	private void RotateCamera(Vector2 newMousePos, float delta)
	{
		Vector2 mousePosDelta = newMousePos - mousePos;
		if (mousePosDelta == Vector2.Zero)
		{
			return;
		}
		cameraAngle -= new Vector2(Mathf.DegToRad(mousePosDelta.Y / 5), Mathf.DegToRad(mousePosDelta.X / 5));
		// clamp rotation
		if (cameraAngle.X < Mathf.DegToRad(0.1f))
			cameraAngle = new Vector2(Mathf.DegToRad(0.1f), cameraAngle.Y);
		if (cameraAngle.X > Mathf.DegToRad(179.9f))
			cameraAngle = new Vector2(Mathf.DegToRad(179.9f), cameraAngle.Y);
		UpdateCameraPosition();
	}

	private void UpdateCameraPosition()
	{
		Position = lookAtPos + new Vector3(Mathf.Sin(cameraAngle.X) * Mathf.Cos(cameraAngle.Y) * zoom,
																			 Mathf.Sin(cameraAngle.X) * Mathf.Sin(cameraAngle.Y) * zoom,
																			 Mathf.Cos(cameraAngle.X) * zoom);
		LookAt(lookAtPos, Vector3.Back);
	}

	private void ResetCamera()
	{
		lookAtPos = Vector3.Zero;
		zoom = 3.0f;
		cameraAngle = new Vector2(Mathf.DegToRad(0.1f), Mathf.DegToRad(-90.0f));
		UpdateCameraPosition();
	}
}
