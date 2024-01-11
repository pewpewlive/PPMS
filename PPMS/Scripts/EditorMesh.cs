using Godot;
using Godot.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;

public partial class EditorMesh : EditorObject
{
    private MeshInstance3D meshNode;
    private ArrayMesh mesh;

    private List<Vector3> vertices;
    private List<Color> colors;
    private List<int> segments;

    private bool updated;
    private Action OnUpdated;

    public override void _Ready()
    {
        meshNode = GetNode<MeshInstance3D>("Mesh");
        mesh = meshNode.Mesh as ArrayMesh;
        
        vertices = new List<Vector3>();
        colors = new List<Color>();
        segments = new List<int>();

        mesh.ClearSurfaces();
    }

    public override void _Process(double delta)
    {
        if (updated)
        {
            UpdateMesh();
            updated = false;
            OnUpdated?.Invoke();
        }
    }

    public void AddVertex(Vector3 position, Color color)
    {
        vertices.Add(position);
        colors.Add(color);

        updated = true;
    }

    public void JoinVertices(int[] segment)
    {
        segments.AddRange(segment.AsEnumerable());
        
        updated = true;
    }

    public void MoveVertex(int index, Vector3 position)
    {
        vertices[index] = position;

        updated = true;
    }

    public void ColorVertex(int index, Color color)
    {
        colors[index] = color;
        
        updated = true;
    }

    public void ModifyVertex(int index, Vector3 position, Color color) 
    {
        vertices[index] = position;
        colors[index] = color;
        
        updated = true;
    }

    public void DeleteVertex(int index)
    {
        vertices.RemoveAt(index);
        colors.RemoveAt(index);
        
        for (int i = 0; i < segments.Count; i++)
        {
            if (segments[i] == index)
            {
                if (i % 2 == 0)
                {
                    segments.RemoveAt(i);
                    segments.RemoveAt(i);

                    i--;
                    continue;
                }
                if (i % 2 == 1)
                {
                    segments.RemoveAt(i - 1);
                    segments.RemoveAt(i - 1);

                    i--;
                    continue;
                }
            }
        }

        for (int i = 0; i < segments.Count; i++)
        {
            if (segments[i] > index)
            {
                segments[i]--;
            }
        }


        if (segments.Count == 0)
        {
            segments.Add(0);
            segments.Add(0);
        }

        updated = true;
    }

    private void UpdateMesh()
    {
        Godot.Collections.Array surface = new Godot.Collections.Array();
        surface.Resize((int)Mesh.ArrayType.Max);
        surface[(int)Mesh.ArrayType.Vertex] = vertices.ToArray();
        surface[(int)Mesh.ArrayType.Color] = colors.ToArray();

        if (segments.Count == 0)
        {
            surface[(int)Mesh.ArrayType.Index] = new int[] { 0, 0 };
        }
        else
        {
            surface[(int)Mesh.ArrayType.Index] = segments.ToArray();
        }

        mesh.ClearSurfaces();

        if (vertices.Count != 0)
        {
            mesh.AddSurfaceFromArrays(Mesh.PrimitiveType.Lines, surface);
        }
    }
}
