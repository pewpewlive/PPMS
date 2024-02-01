using Godot;

public partial class LuaEdit : CodeEdit
{
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		//DelimiterComments = new Godot.Collections.Array<string>(new string[] { "--" });
		// Colors taken from Dark+ theme in microsoft/vscode
		var ch = new CodeHighlighter
		{
			NumberColor = new Color("#b5cea8"),
			SymbolColor = new Color("#ffffff"),
			FunctionColor = new Color("#dcdcaa"),
			MemberVariableColor = new Color("#9cdcfe")
		};
		// Strings
		ch.AddColorRegion("[[", "]]", new Color("#ce9178"));
		ch.AddColorRegion("'", "'", new Color("#ce9178"));
		ch.AddColorRegion("\"", "\"", new Color("#ce9178"));

		// Comments
		ch.AddColorRegion("--", "", new Color("#6a9955"));
		ch.AddColorRegion("--[[", "]]", new Color("#6a9955"));

		// Keywords
		ch.AddKeywordColor("local", new Color("#c586c0"));
		ch.AddKeywordColor("then", new Color("#c586c0"));
		ch.AddKeywordColor("do", new Color("#c586c0"));
		ch.AddKeywordColor("if", new Color("#c586c0"));
		ch.AddKeywordColor("else", new Color("#c586c0"));
		ch.AddKeywordColor("elseif", new Color("#c586c0"));
		ch.AddKeywordColor("while", new Color("#c586c0"));
		ch.AddKeywordColor("function", new Color("#c586c0"));
		ch.AddKeywordColor("end", new Color("#c586c0"));
		ch.AddKeywordColor("return", new Color("#c586c0"));

		// Booleans
		ch.AddKeywordColor("true", new Color("#569cd6"));
		ch.AddKeywordColor("false", new Color("#569cd6"));

		// Nil
		ch.AddKeywordColor("nil", new Color("#569cd6"));

		SyntaxHighlighter = ch;

		//AddCodeCompletionOption(CodeCompletionKind.Class, "PPMS", "PPMS");

		//CodeCompletionEnabled = true;
	}
	public override void _Input(InputEvent @event)
	{
		base._Input(@event);
		
		// PPMS API
		AddCodeCompletionOption(CodeCompletionKind.Class, "PPMS", "PPMS");
		AddCodeCompletionOption(CodeCompletionKind.Function, "Print", "Print()");

		// Lua string library
		AddCodeCompletionOption(CodeCompletionKind.Class, "string", "string");
		AddCodeCompletionOption(CodeCompletionKind.Function, "byte", "byte()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "char", "char()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "dump", "dump()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "find", "find()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "format", "format()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "gmatch", "gmatch()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "gsub", "gsub()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "len", "len()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "lower", "lower()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "match", "match()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "rep", "reverse()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "sub", "sub()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "upper", "upper()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "pack", "pack()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "packsize", "packsize()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "unpack", "unpack()");
		
		// Lua table library
		AddCodeCompletionOption(CodeCompletionKind.Class, "table", "table");
		AddCodeCompletionOption(CodeCompletionKind.Function, "concat", "concat()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "insert", "insert()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "pack", "pack()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "unpack", "unpack()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "remove", "remove()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "move", "move()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "sort", "sort()");

		// Lua math library
		AddCodeCompletionOption(CodeCompletionKind.Class, "math", "math");
		AddCodeCompletionOption(CodeCompletionKind.Function, "abs", "abs()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "acos", "acos()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "asin", "asin()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "atan", "atan()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "ceil", "ceil()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "cos", "cos()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "deg", "deg()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "exp", "exp()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "tointeger", "tointeger()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "floor", "floor()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "fmod", "fmod()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "ult", "ult()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "log", "log()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "max", "max()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "min", "min()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "modf", "modf()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "rad", "rad()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "random", "random()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "sin", "sincos()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "sqrt", "sqrt()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "tan", "tan()");
		AddCodeCompletionOption(CodeCompletionKind.Function, "type", "type()");

		// Lua math constants
		AddCodeCompletionOption(CodeCompletionKind.Constant, "pi", "pi");
		AddCodeCompletionOption(CodeCompletionKind.Constant, "huge", "huge");
		AddCodeCompletionOption(CodeCompletionKind.Constant, "maxinteger", "maxinteger");
		AddCodeCompletionOption(CodeCompletionKind.Constant, "mininteger", "mininteger");

		UpdateCodeCompletionOptions(true);
	}
}
