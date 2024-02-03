using System;
using NLua;
using Godot;

public class PluginRunner : IDisposable
{
  private Lua lua;
  private Plugins belongingNode;
  public PluginRunner(Plugins belongingNode, string path)
  {
    lua = new Lua();
    this.belongingNode = belongingNode;

    //lua.DoString("os = nil debug = nil utf8 = nil");
    LoadAPI();
    RunFromFile(path);
  }

  public PluginRunner(Plugins belongingNode)
  {
    lua = new Lua();
    this.belongingNode = belongingNode;

    //lua.DoString("os = nil debug = nil utf8 = nil");
    LoadAPI();
  }

  public PluginRunner(Plugins belongingNode, Lua lua, string path)
  {
    this.lua = lua;

    //lua.DoString("os = nil debug = nil utf8 = nil");
    LoadAPI();
    RunFromFile(path);
  }

  public PluginRunner(Plugins belongingNode, Lua lua)
  {
    this.lua = lua;

    //lua.DoString("os = nil debug = nil utf8 = nil");
    LoadAPI();
  }

  public void RunFromString(string source)
  {
    GD.Print("Loading plugin from: string");
    GD.PushWarning("Running a plugin. Do not run plugins by people you don't trust!");

    try
    {
      lua.DoString(source);
    }
    catch (Exception e)
    {
      GD.PrintErr("Error occured in the Lua interpreter: ", e.Message);
    }
  }
  public void RunFromFile(string path)
  {
    GD.Print("Loading plugin from: ", path);
    GD.PushWarning("Running a plugin. Do not run plugins by people you don't trust!");

    try
    {
      lua.DoFile(path);
    }
    catch (Exception e)
    {
      GD.PrintErr("Error occured in the Lua interpreter: ", e.Message);
    }
  }

  public void Update()
  {

  }

  private void LoadAPI()
  {
    lua.NewTable("PPMS");
    lua.NewTable("PPMS.Internal");
    lua.NewTable("PPMS.Signals");
    //lua.NewTable("ImGui");

    // Required for `PPMS.GetMesh()` function to work
    lua.DoString("function PPMS.Internal.NewTable() local t = {} return t end");

#pragma warning disable CS8974

    lua["PPMS.Print"] = LuaAPI.Print;
    lua["PPMS.Error"] = LuaAPI.Error;
    lua["PPMS.Warning"] = LuaAPI.Warning;
    /*lua["PPMS.GetMesh"] = (int index) => API.GetMesh(lua, index);
    lua["PPMS.SetMesh"] = (int index, LuaTable mesh) => API.SetMesh(lua, index, mesh);*/

    lua["PPMS.Signals.Process"] = (LuaFunction CallbackFunc) =>
    {
      belongingNode.Callbacks += () => CallbackFunc.Call();
    };
    //lua["PPMS.Actions.OnUpdate"] = API.AddUpdateCallback;

#pragma warning restore CS8974

    // https://gist.github.com/tylerneylon/59f4bcf316be525b30ab
    // Load a minimal json library; Use `local json = require("ppms-utils/json")` to import it
    //lua.DoString(Properties.Resources.JsonLib);
  }

  public void Dispose()
  {
    lua.Dispose();
  }
}
