using NLua;
using System;
using Godot;

public static class LuaAPI
{
  #region PPMS
  public static void Print(string what)
  {
    GD.Print(what);
  }
  public static void Error(string what)
  {
    GD.PrintErr(what);
  }
  public static void Warning(string what)
  {
    GD.PushWarning(what);
  }

  /*
  public static LuaTable GetMesh(Lua lua, int index)
  {
    LuaFunction insertFunc = lua.GetFunction("table.insert");
    LuaFunction newTableFunc = lua.GetFunction("PPMS.Internal.NewTable");

    LuaTable meshTable = (LuaTable)newTableFunc.Call()[0];
    LuaTable vertexesTable = (LuaTable)newTableFunc.Call()[0];
    LuaTable colorsTable = (LuaTable)newTableFunc.Call()[0];
    LuaTable segmentsTable = (LuaTable)newTableFunc.Call()[0];

    Mesh mesh = Program.meshes[index];

    int i = 1;
    foreach (var vertex in mesh.vertices)
    {
      LuaTable vertexTable = (LuaTable)newTableFunc.Call()[0];
      vertexTable[1] = vertex.pos.X;
      vertexTable[2] = vertex.pos.Y;
      vertexTable[3] = vertex.pos.Z;

      LuaTable colorTable = (LuaTable)newTableFunc.Call()[0];
      colorTable[1] = vertex.col.X;
      colorTable[2] = vertex.col.Y;
      colorTable[3] = vertex.col.Z;
      colorTable[4] = vertex.col.W;

      vertexesTable[i] = vertexTable;
      colorsTable[i] = colorTable;
      i++;
    }

    foreach (var segment in mesh.segments)
    {
      LuaTable segmentTable = (LuaTable)newTableFunc.Call()[0];
      foreach (uint idx in segment)
      {
        insertFunc.Call(segmentTable, idx);
      }

      insertFunc.Call(segmentsTable, segmentTable);
    }

    meshTable["vertexes"] = vertexesTable;
    meshTable["segments"] = segmentsTable;
    meshTable["colors"] = colorsTable;

    return meshTable;
  }

  public static void SetMesh(Lua lua, int index, LuaTable tableMesh)
  {
    List<Vertex> VertexData = new List<Vertex>();
    List<List<uint>> Segments = new List<List<uint>>();

    Dictionary<object, object> MeshDict = lua.GetTableDict(tableMesh);

    if (!MeshDict.ContainsKey("vertexes"))
      Serilog.Log.Error("(PLUGIN API): Mesh does not contain a valid 'vertexes' table\n{traceback}", lua.GetDebugTraceback());

    Dictionary<object, object> VertexesDict = lua.GetTableDict((LuaTable)MeshDict["vertexes"]);
    Dictionary<object, object> ColorsDict = MeshDict.ContainsKey("colors") ? lua.GetTableDict((LuaTable)MeshDict["colors"]) : new Dictionary<object, object>();

    if (ColorsDict.Count != 0 && ColorsDict.Count != VertexesDict.Count)
    {
      Serilog.Log.Error("(PLUGIN API): The table 'colors' in mesh must be the same size as 'vertexes' table\n{traceback}", lua.GetDebugTraceback());
    }

    foreach (KeyValuePair<object, object> VertexItem in VertexesDict)
    {
      Dictionary<object, object> Item = lua.GetTableDict((LuaTable)VertexItem.Value);

      List<float> Position = new List<float>();

      foreach (KeyValuePair<object, object> Coord in Item)
        Position.Add(Convert.ToSingle(Coord.Value));

      if (Position.Count == 2)
        Position.Add(Convert.ToSingle(0));

      if (Position.Count != 3)
      {
        Serilog.Log.Error("(PLUGIN API): The table 'vertexes' in mesh contains a vertex with an invalid amount of position values, must be exactly 2 or 3\n{traceback}", lua.GetDebugTraceback());
      }

      Vector4 Color = new Vector4(1, 1, 1, 1);

      if (ColorsDict.Count != 0)
      {
        Dictionary<object, object> color = lua.GetTableDict((LuaTable)ColorsDict[VertexItem.Key]);

        if (color.Count != 4)
        {
          Serilog.Log.Error("(PLUGIN API): The table 'colors' in mesh contains a color with an invalid amount of color values, must be exactly 4\n{traceback}", lua.GetDebugTraceback());
        }

        Color = new Vector4(Convert.ToSingle(color.ElementAt(0).Value),
                            Convert.ToSingle(color.ElementAt(1).Value),
                            Convert.ToSingle(color.ElementAt(2).Value),
                            Convert.ToSingle(color.ElementAt(3).Value));
      }

      VertexData.Add(new Vertex(new Vector3(Position[0], Position[1], Position[2]),
                                    new Vector4(Color.X, Color.Y, Color.Z, Color.W)));
    }

    if (!MeshDict.ContainsKey("segments"))
    {
      Serilog.Log.Error("(PLUGIN API): The mesh does not contain a valid 'segments' table\n{traceback}", lua.GetDebugTraceback());
    }

    Dictionary<object, object> SegmentsDict = lua.GetTableDict((LuaTable)MeshDict["segments"]);

    foreach (KeyValuePair<object, object> SegmentItem in SegmentsDict)
    {
      Dictionary<object, object> Item = lua.GetTableDict((LuaTable)SegmentItem.Value);

      List<uint> Segment = new List<uint>();

      foreach (KeyValuePair<object, object> VertexIndex in Item)
      {
        int Index = Convert.ToInt32(VertexIndex.Value);

        if (Index < VertexesDict.Count && Index >= 0)
        {
          Segment.Add(Convert.ToUInt32(Index));
        }
        else
        {
          Serilog.Log.Error("(PLUGIN API): A vertex index used in a segment in mesh must be within the valid range\n{traceback}", lua.GetDebugTraceback());
        }
      }

      if (Segment.Count < 2)
      {
        Serilog.Log.Error("(PLUGIN API): The table 'segments' in mesh at index can not contain a single vertex index segment\n{traceback}", lua.GetDebugTraceback());
      }

      Segments.Add(Segment);
    }

    Program.meshes[index].vertices = VertexData;
    Program.meshes[index].segments = Segments;
    Program.meshes[index].RegenerateMeshSegments();
    Program.meshes[index].SetWasUpdated(true);
  }*/

  #endregion
}
