using Godot;
using System;

public partial class plugin_slot : Node
{
    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        var button = new Button();
        button.Text = "Click me";
        button.Pressed += ButtonPressed;
        AddChild(button);
        
        var label = new Label();
        label.Text = "Hello World!";
        AddChild(label);
    }

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(double delta)
    {
        var dfloat = (float)delta;

    }

    public void ButtonPressed()
    {
        GD.Print("I was pressed!");
    }
}
