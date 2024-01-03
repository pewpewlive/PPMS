using Godot;

public partial class NewMesh : Button
{
	public override void _Pressed()
	{
		base._Pressed();

		var vertices = new Vector3[]
		{
			new Vector3(0, 0.25f, 0),
			new Vector3(0.6f, 0.2f, 0),
			new Vector3(0, 5, 2),
			new Vector3(0, 0.8f, 0),
		};

		var colors = new Color[]
		{
			new Color(0xff8800ff),
			new Color(0x00ff88ff),
			new Color(0x0088ffff),
			new Color(0xff8800ff),
		};

		// Initialize the ArrayMesh.
		var arrMesh = new ArrayMesh();
		var arrays = new Godot.Collections.Array();
		arrays.Resize((int)Mesh.ArrayType.Max);
		arrays[(int)Mesh.ArrayType.Vertex] = vertices;
		arrays[(int)Mesh.ArrayType.Color] = colors;

		// Create the Mesh.
		arrMesh.AddSurfaceFromArrays(Mesh.PrimitiveType.LineStrip, arrays);

		var m = new MeshInstance3D
		{
			Mesh = arrMesh,
			MaterialOverride = new ShaderMaterial
			{
				Shader = GD.Load<Shader>("res://MeshShader.gdshader")
			},
			Position = new Vector3(10, 0, 10)
		};
		GetNode("/root/Control/Node3D").AddChild(m);
	}
}
