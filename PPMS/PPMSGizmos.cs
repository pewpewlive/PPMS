using Godot;
using System;
using System.Collections.Generic;

public partial class PPMSGizmos : Node3D
{
    private Camera3D cam;
    private List<GizmosInteractable> yes = new List<GizmosInteractable>();

    [Export]
    public bool resetTransform;

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
        yes.Add(gizmo);
    }

    public void OnActivated(GizmosInteractable activated)
    {
        foreach (GizmosInteractable node in yes)
        {
            if (node != activated)
            {
                node.Hide();
                node.interactable = false;
            }
        }
    }

    public void OnDeactivated(GizmosInteractable deactivated)
    {
        foreach (GizmosInteractable node in yes)
        {
            node.Show();
            node.interactable = true;
        }
        Transform = Transform3D.Identity;
        FitToScreen();
    }

    private void FitToScreen()
    {
        float offset = (cam.Position - Position).Length();

        float size = (cam.Size / 2 + offset) / 10;

        Scale = new Vector3(size, size, size);
    }
}
