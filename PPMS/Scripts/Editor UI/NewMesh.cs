using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Security.Cryptography;
using Godot;
using NLua;

public partial class NewMesh : Button
{
	public override void _Pressed()
	{
		base._Pressed();

		var L = new Lua();
		var file = FileAccess.Open("res://Assets/Lua/mesh.lua", FileAccess.ModeFlags.Read);
		L.DoString(file.GetAsText());
		file.Close();

		if (L.GetTable("meshes") is null)
			return;

		foreach (LuaTable mesh in L.GetTable("meshes").Values)
		{
			var vertices = new List<Vector3>();
			var indices = new List<int>();
			var colors = new List<Color>();

			if (mesh["vertexes"] is null)
				throw new NotImplementedException();

			foreach (LuaTable vertex in (mesh["vertexes"] as LuaTable).Values)
			{
				var newVertex = new Vector3(Convert.ToSingle(vertex[1]), Convert.ToSingle(vertex[2]), 0.0f);
				if (vertex[3] is not null)
					newVertex.Z = Convert.ToSingle(vertex[3]);
				newVertex /= 10.0f;   // FIXME: Make meshes scale normally
				vertices.Add(newVertex);
			}

			if (mesh["segments"] is null)
				throw new NotImplementedException();

			foreach (LuaTable segment in (mesh["segments"] as LuaTable).Values)
			{
				int i = 0;
				foreach (long index in segment.Values)
				{
					indices.Add(Convert.ToInt32(index));
					if (i > 0 && i < segment.Values.Count - 1)
						indices.Add(Convert.ToInt32(index));

					i++;
				}
			}

			if (mesh["colors"] is not null)
			{
				foreach (var color in (mesh["colors"] as LuaTable).Values)
					colors.Add(new Color(Convert.ToUInt32(color)));
			}
			else
				colors = Enumerable.Repeat(new Color(0xffffffff), vertices.Count).ToList();

			var arrMesh = new ArrayMesh();
			var arrays = new Godot.Collections.Array();
			arrays.Resize((int)Mesh.ArrayType.Max);
			arrays[(int)Mesh.ArrayType.Vertex] = vertices.ToArray();
			arrays[(int)Mesh.ArrayType.Index] = indices.ToArray();
			arrays[(int)Mesh.ArrayType.Color] = colors.ToArray();

			// Create the Mesh.
			arrMesh.AddSurfaceFromArrays(Mesh.PrimitiveType.Lines, arrays);

			var m = new MeshInstance3D
			{
				Mesh = arrMesh,
				MaterialOverride = new ShaderMaterial
				{
					Shader = GD.Load<Shader>("res://Shaders/MeshShader.gdshader")
				},
			};
			GetNode("/root/Editor/Node3D").AddChild(m);
		}

		// Initialize the ArrayMesh.


		// var colorEditor = new ColorPicker
		// {
		// 	Color = colors[0]
		// };
		// GetNode("/root/Control/Inspector/InspectorItems").AddChild(colorEditor);

		// var xMarker = GetNode<SpinBox>("/root/Control/Inspector/InspectorItems/Vector3 Picker/SpinBoxX");
		// xMarker.Value = vertices[3].X;
		// var yMarker = GetNode<SpinBox>("/root/Control/Inspector/InspectorItems/Vector3 Picker/SpinBoxY");
		// yMarker.Value = vertices[3].Y;
		// var zMarker = GetNode<SpinBox>("/root/Control/Inspector/InspectorItems/Vector3 Picker/SpinBoxZ");
		// zMarker.Value = vertices[3].Z;

	}
}
