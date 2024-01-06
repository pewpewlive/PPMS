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
			new Vector3(10f, 0.25f, 0),
      new Vector3(10.6f, 0.2f, 0),
      new Vector3(10f, 5, 2),
		};

		var colors = new Color[]
		{
			new Color(0xff8800ff),
			new Color(0x00ff88ff),
			new Color(0x0088ffff),

            new Color(0xff8800ff),
            new Color(0x00ff88ff),
            new Color(0x0088ffff),
		};

		var indices = new int[]
		{
			0, 1, 1, 2, 2, 0, 
			3, 4, 4, 5, 5, 3,
		};

        // Initialize the ArrayMesh.
        var arrMesh = new ArrayMesh();
		var arrays = new Godot.Collections.Array();
		arrays.Resize((int)Mesh.ArrayType.Max);
		arrays[(int)Mesh.ArrayType.Vertex] = vertices;
		arrays[(int)Mesh.ArrayType.Index] = indices;
		arrays[(int)Mesh.ArrayType.Color] = colors;

        // Create the Mesh.
        arrMesh.AddSurfaceFromArrays(Mesh.PrimitiveType.Lines, arrays);

		var m = new MeshInstance3D
		{
			Mesh = arrMesh,
			MaterialOverride = new ShaderMaterial
			{
				Shader = GD.Load<Shader>("res://MeshShader.gdshader")
			},
			Position = new Vector3(3, 0, 0)
		};
		GetNode("/root/Control/Node3D").AddChild(m);

		// var colorEditor = new ColorPicker
		// {
		// 	Color = colors[0]
		// };
		// GetNode("/root/Control/Inspector/InspectorItems").AddChild(colorEditor);

		var xMarker = GetNode<SpinBox>("/root/Control/Inspector/InspectorItems/Vector3 Picker/SpinBoxX");
		xMarker.Value = vertices[3].X;
		var yMarker = GetNode<SpinBox>("/root/Control/Inspector/InspectorItems/Vector3 Picker/SpinBoxY");
		yMarker.Value = vertices[3].Y;
		var zMarker = GetNode<SpinBox>("/root/Control/Inspector/InspectorItems/Vector3 Picker/SpinBoxZ");
		zMarker.Value = vertices[3].Z;

	}
}
