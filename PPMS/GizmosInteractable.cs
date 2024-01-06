using Godot;
using System;

public partial class GizmosInteractable : Node3D
{
    protected Transform3D originalTransform;
    protected Vector2 parentCenter = new Vector2(0, 0);
    protected Vector2 dragStartPosition = new Vector2(0, 0);

    protected Action OnActivate;
    protected Action OnManipulate;
    protected Action OnDeactivate;

    protected bool dragged;
    public bool interactable = true;

    protected MeshInstance3D mesh;
    protected PPMSGizmos parentGizmo;

    [Export]
    protected Color idleColor = new Color(1f, 1f, 1f, 1f);
    [Export]
    protected Color activeColor = new Color(1f, 1f, 1f, 1f);

    [Export]
    protected Vector3 workingAxis;

	public override void _Ready()
	{
        mesh = GetChild<MeshInstance3D>(0);
        StandardMaterial3D material = (StandardMaterial3D)mesh.GetSurfaceOverrideMaterial(0);
        material.AlbedoColor = idleColor;
        mesh.MaterialOverride = material;
        parentGizmo = GetParent<PPMSGizmos>();  
        parentGizmo.RegisterGizmo(this);
    }

	public override void _Process(double delta)
	{
        
    }

    public virtual void Manipulate(Camera3D camera, Vector2 clickPosition) 
    {
        
    }

    public void Highlight()
    {
        StandardMaterial3D material = (StandardMaterial3D)mesh.GetSurfaceOverrideMaterial(0);
        material.AlbedoColor = activeColor;
        mesh.MaterialOverride = material;
    }
}
