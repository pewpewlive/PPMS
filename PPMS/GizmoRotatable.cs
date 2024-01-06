using Godot;

public partial class GizmoRotatable : GizmosInteractable
{
	public override void _Ready()
	{
		base._Ready();
	}

	public override void _Process(double delta)
	{
        if (!interactable)
            return;

        StandardMaterial3D material = (StandardMaterial3D)mesh.GetSurfaceOverrideMaterial(0);
        material.AlbedoColor = idleColor;
        mesh.MaterialOverride = material;

        if (dragged && !Input.IsMouseButtonPressed(MouseButton.Left))
        {
            dragged = false;

            parentGizmo.OnDeactivated(this);
        }

        if (dragged)
        {
            material.AlbedoColor = activeColor;
            mesh.MaterialOverride = material;

            var mp = GetViewport().GetMousePosition();

            var start = parentCenter.AngleToPoint(dragStartPosition);

            var angle = parentCenter.AngleToPoint(mp);

            var direction = (GetViewport().GetCamera3D().GlobalTransform.Origin - ((Node3D)GetParent()).GlobalTransform.Origin);

            direction = direction.Normalized();

            Vector3 face = workingAxis switch
            {
                Vector3(1, 0, 0) => ((Node3D)GetParent()).GlobalTransform.Basis.X,
                Vector3(0, 1, 0) => ((Node3D)GetParent()).GlobalTransform.Basis.Y,
                Vector3(0, 0, 1) => ((Node3D)GetParent()).GlobalTransform.Basis.Z,
                _ => new Vector3(0, 0, 0),
            };

            ((Node3D)GetParent()).GlobalTransform = originalTransform;

            if (Mathf.RadToDeg(face.Dot(direction)) > 0)
            {
                ((Node3D)GetParent()).RotateObjectLocal(workingAxis, start - angle);
            }
            else
            {
                ((Node3D)GetParent()).RotateObjectLocal(workingAxis, angle - start);
            }
        }
    }

    public override void Manipulate(Camera3D camera, Vector2 clickPosition)
    {
        if (!interactable)
            return;

        if (dragged)
            return;

        dragged = true;
        parentGizmo.OnActivated(this);

        originalTransform = ((Node3D)GetParent()).GlobalTransform;
        parentCenter = camera.UnprojectPosition(((Node3D)GetParent()).GlobalTransform.Origin);

        dragStartPosition = clickPosition;
    }
}
