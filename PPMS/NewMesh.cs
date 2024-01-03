using Godot;
using System;

public partial class NewMesh : Button
{
	public override void _Pressed()
	{
		base._Pressed();

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

        var m = new MeshInstance3D();
		m.Mesh = arrMesh;
		m.Position = new Vector3(10, 0, 10);

		var Mat = new ShaderMaterial();
        Mat.Shader = (Shader)GD.Load("res://MeshShader.gdshader");
		m.SetSurfaceOverrideMaterial(0, Mat);
		GetParent().GetParent().GetParent().GetChild(-1).AddChild(m);
    }
}
