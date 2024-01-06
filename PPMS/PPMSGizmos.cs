using Godot;
using System.Collections.Generic;

public partial class PPMSGizmos : Node3D
{
    private Camera3D cam;
    private List<GizmosInteractable> elements = new List<GizmosInteractable>();

    [Export]
    public bool resetTransform;
    [Export]
    public bool hideOtherElementsOnMove;

    public override void _Ready()
    {
        cam = GetViewport().GetCamera3D();

    }

    public override void _Process(double delta)
	{
        FitToScreen();
    }

    public void RegisterGizmo(GizmosInteractable gizmo)
    {
        elements.Add(gizmo);
    }

    public void OnActivated(GizmosInteractable activated)
    {
        foreach (GizmosInteractable node in elements)
        {
            if (node != activated)
            {
                if (hideOtherElementsOnMove)
                    node.Hide();
                node.interactable = false;
            }
        }
    }

    public void OnDeactivated(GizmosInteractable deactivated)
    {
        foreach (GizmosInteractable node in elements)
        {
            node.Show();
            node.interactable = true;
        }
        Transform = Transform3D.Identity;
        FitToScreen();
    }

    public void FitToScreen()
    {
        float offset = (cam.Position - Position).Length();

        float size = (cam.Size / 2 + offset) / 10;

        Scale = new Vector3(size, size, size);
    }
}
