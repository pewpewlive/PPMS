shader_type spatial;
render_mode blend_mix, unshaded;

void vertex() {
	// Called for every vertex the material is visible on.
}

void fragment() {
	// Called for every pixel the material is visible on.
	ALBEDO = COLOR.rgb;
	ALPHA = COLOR.a;
	EMISSION = ALBEDO;
}