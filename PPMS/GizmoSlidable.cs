using Godot;
using System;

public partial class GizmoSlidable : GizmosInteractable
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

            Camera3D cam = GetViewport().GetCamera3D();

            Vector2 mousePosition = GetViewport().GetMousePosition();

            Vector2 dd = cam.UnprojectPosition(GlobalTransform.Origin + workingAxis) - cam.UnprojectPosition(((Node3D)GetParent().GetParent()).GlobalTransform.Origin);

            ((Node3D)GetParent().GetParent()).GlobalTransform = originalTransform;

            Vector2 step = dd.Normalized();

            Vector2 distance = mousePosition - dragStartPosition;

            Vector2 output = step * distance;

            Vector3 diff = workingAxis switch
            {
                Vector3(1, 0, 0) => new Vector3(output.X + output.Y, 0, 0),
                Vector3(0, 1, 0) => new Vector3(0, output.X + output.Y, 0),
                Vector3(0, 0, 1) => new Vector3(0, 0, output.X + output.Y),
                _ => new Vector3(0, 0, 0),
            } / 500;

            ((Node3D)GetParent().GetParent()).TranslateObjectLocal(diff);
            //GD.Print(step);
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

        originalTransform = ((Node3D)GetParent().GetParent()).GlobalTransform;
        parentCenter = camera.UnprojectPosition(((Node3D)GetParent().GetParent()).GlobalTransform.Origin);

        dragStartPosition = clickPosition;
    }
}
