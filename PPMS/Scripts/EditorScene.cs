using Godot;
using System.Collections.Generic;

public partial class EditorScene : Node3D
{
	private List<EditorObject> objects;

	public override void _Ready()
	{
        objects = new List<EditorObject>();
    }

	public override void _Process(double delta)
	{
		
	}

	public void CreateMesh() 
	{
		objects.Add(new EditorMesh());
	}

	public void DeleteObject(int index)
	{
		objects.RemoveAt(index);
	}

	public EditorObject GetObject(int index)
	{
		return objects[index];
	}
}
