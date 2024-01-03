using Godot;
using System;

[Tool]
public partial class MeshInstance3D : Godot.MeshInstance3D
{
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		var vertices = new Vector3[]
		{
			new Vector3(0, 1, 0),
			new Vector3(1, 0, 0),
			new Vector3(0, 0, 1),
			new Vector3(0, 1, 0),
		};

		var colors = new Color[]
		{
			new Color(0xff0000ff),
			new Color(0x00ff00ff),
			new Color(0x0000ffff),
			new Color(0xff0000ff),
        };

		// Initialize the ArrayMesh.
		var arrMesh = new ArrayMesh();
		var arrays = new Godot.Collections.Array();
		arrays.Resize((int)Mesh.ArrayType.Max);
		arrays[(int)Mesh.ArrayType.Vertex] = vertices;
		arrays[(int)Mesh.ArrayType.Color] = colors;

		// Create the Mesh.
		arrMesh.AddSurfaceFromArrays(Mesh.PrimitiveType.LineStrip, arrays);
		this.Mesh = arrMesh;
	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	public override void _Process(double delta)
	{
	}
}
