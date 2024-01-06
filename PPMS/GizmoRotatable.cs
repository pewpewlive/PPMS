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

            Vector2 mp = GetViewport().GetMousePosition();

            float start = parentCenter.AngleToPoint(dragStartPosition);

            float angle = parentCenter.AngleToPoint(mp);

            Vector3 direction = (GetViewport().GetCamera3D().GlobalTransform.Origin - parentGizmo.GlobalTransform.Origin);

            direction = direction.Normalized();

            Vector3 face = workingAxis switch
            {
                Vector3(1, 0, 0) => parentGizmo.GlobalTransform.Basis.X,
                Vector3(0, 1, 0) => parentGizmo.GlobalTransform.Basis.Y,
                Vector3(0, 0, 1) => parentGizmo.GlobalTransform.Basis.Z,
                _ => new Vector3(0, 0, 0),
            };

            parentGizmo.GlobalTransform = originalTransform;
            parentGizmo.FitToScreen();

            if (Mathf.RadToDeg(face.Dot(direction)) > 0)
            {
                parentGizmo.RotateObjectLocal(workingAxis, start - angle);

                Vector3 diff = workingAxis switch
                {
                    Vector3(1, 0, 0) => new Vector3(start - angle, 0, 0),
                    Vector3(0, 1, 0) => new Vector3(0, start - angle, 0),
                    Vector3(0, 0, 1) => new Vector3(0, 0, start - angle),
                    _ => new Vector3(0, 0, 0),
                };
                OnManipulate?.Invoke(diff);
            }
            else
            {
                parentGizmo.RotateObjectLocal(workingAxis, angle - start);

                Vector3 diff = workingAxis switch
                {
                    Vector3(1, 0, 0) => new Vector3(angle - start, 0, 0),
                    Vector3(0, 1, 0) => new Vector3(0, angle - start, 0),
                    Vector3(0, 0, 1) => new Vector3(0, 0, angle - start),
                    _ => new Vector3(0, 0, 0),
                };
                OnManipulate?.Invoke(diff);
            }
        }
    }

    public override void Activate(Camera3D camera, Vector2 clickPosition)
    {
        if (!interactable)
            return;

        if (dragged)
            return;

        dragged = true;
        parentGizmo.OnActivated(this);

        originalTransform = parentGizmo.GlobalTransform;
        parentCenter = camera.UnprojectPosition(parentGizmo.GlobalTransform.Origin);

        dragStartPosition = clickPosition;
    }
}
