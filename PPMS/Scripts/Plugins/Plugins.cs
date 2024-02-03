using Godot;
using System;
using System.Collections.Generic;

public partial class Plugins : Node
{
	public Action Callbacks;
	public List<PluginRunner> Runners;
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		var rn = new PluginRunner(GetNode<Plugins>("."));
		rn.RunFromString("PPMS.Signals.Process(function() PPMS.Print('Hi!') end)");
		Runners.Add(rn);
	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	public override void _Process(double delta)
	{
		Callbacks();
	}
}
