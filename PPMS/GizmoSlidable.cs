using Godot;

public partial class GizmoSlidable : GizmosInteractable
{
    [Export]
    private bool scaleAndNotMove;
    private bool faceTheCamera;
    private bool dissapearWhenFacingCamera;

    [Export]
    private MeshInstance3D headMesh;
    private Transform3D headOriginalTransform;
    private Transform3D stickOriginalTransform;

    public override void _Ready()
    {
        base._Ready();
        headOriginalTransform = headMesh.Transform;
        stickOriginalTransform = mesh.Transform;
    }

    public override void _Process(double delta)
    {
        base._Process(delta);

        if (!interactable)
            return;

        StandardMaterial3D material = (StandardMaterial3D)mesh.GetSurfaceOverrideMaterial(0);
        material.AlbedoColor = idleColor;
        mesh.MaterialOverride = material;
        headMesh.MaterialOverride = material;

        if (dragged && !Input.IsMouseButtonPressed(MouseButton.Left))
        {
            dragged = false;
            
            parentGizmo.OnDeactivated(this);
        }

        headMesh.Transform = headOriginalTransform;
        mesh.Transform = stickOriginalTransform;

        if (dragged)
        {
            material.AlbedoColor = activeColor;
            mesh.MaterialOverride = material;
            headMesh.MaterialOverride = material;

            Camera3D cam = GetViewport().GetCamera3D();

            Vector2 mousePosition = GetViewport().GetMousePosition();
            Vector2 dd = cam.UnprojectPosition(GlobalTransform.Origin + workingAxis) - cam.UnprojectPosition(parentGizmo.GlobalTransform.Origin);

            parentGizmo.GlobalTransform = originalTransform;
            parentGizmo.FitToScreen();

            Vector2 step = dd.Normalized();

            Vector2 distance = mousePosition - dragStartPosition;

            Vector2 output = step * distance;

            Vector3 diff = workingAxis switch
            {
                Vector3(1, 0, 0) => new Vector3(output.X + output.Y, 0, 0),
                Vector3(0, 1, 0) => new Vector3(0, output.X + output.Y, 0),
                Vector3(0, 0, 1) => new Vector3(0, 0, output.X + output.Y),
                _ => new Vector3(0, 0, 0),
            } / 100;

            if (!scaleAndNotMove)
            {
                parentGizmo.TranslateObjectLocal(diff);
            }
            else
            {
                float diffLen = diff.X > 0 || diff.Y > 0 || diff.Z > 0 ? diff.Length() : -diff.Length();
                mesh.Scale = new Vector3(1, diffLen, 1);
                headMesh.TranslateObjectLocal(new Vector3(0, diffLen - 1, 0));
            }
            OnManipulate?.Invoke(diff);
            //GD.Print(step);
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

    public override void Highlight()
    {
        StandardMaterial3D material = (StandardMaterial3D)mesh.GetSurfaceOverrideMaterial(0);
        material.AlbedoColor = activeColor;
        mesh.MaterialOverride = material;
        headMesh.MaterialOverride = material;
    }
}
