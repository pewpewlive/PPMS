shader_type spatial;
render_mode blend_mix,depth_draw_opaque, unshaded;

uniform vec4 gridColor: source_color;
uniform float fadeStart = 0.0;
uniform float fadeEnd = 10.0;
uniform float unitSize = 1.0;
uniform int subdivisions: hint_range(1, 10) = 5;
uniform float majorLineThickness = 2.0;
uniform float minorLineThickness = 1.0;
uniform float minorLineAlpha: hint_range(0.0, 1.0) = .3;
uniform vec3 centerOffset = vec3(0.0, 0.0, 0.0);

// calculate line mask, usning a bit of fwidth() magic to make line width not affected by perspective
float grid(vec2 pos, float unit, float thickness){
	vec2 threshold = fwidth(pos) * thickness * .5 / unit;
	vec2 posWrapped = pos / unit;
	vec2 line = step(fract(-posWrapped), threshold) + step(fract(posWrapped), threshold);
	return max(line.x, line.y);
}

vec4 straight_line(vec2 pos, float thickness, bool is_x, bool is_y){
	vec2 threshold = fwidth(pos) * thickness * .5;
	float satur = 0.05;
	vec2 p3 = pos;
	
	vec2 p1 = vec2(float(is_x), float(is_y));
    vec2 p2 = vec2(-float(is_x), -float(is_y));
	
    vec2 p12 = p2 - p1;
    vec2 p13 = p3 - p1;

    float d = dot(p12, p13) / length(p12);
    vec2 p4 = p1 + normalize(p12) * d;
    if (length(p4 - p3) < 0.003){
        return vec4(float(is_x) + satur, float(is_y) + satur, 0.0  + satur, 1.0);
    }
	
	return vec4(0.0, 0.0, 0.0, 0.0);
}

void fragment() {
	// ray from camera to fragemnt in wrold space
	vec3 rayWorld = normalize(mat3(INV_VIEW_MATRIX) * VIEW) ;
	
	// calculate fragment position in world space
	vec3 posWorld;
	float t = -(CAMERA_POSITION_WORLD.z - centerOffset.z) / (rayWorld.z);
	posWorld.z = -centerOffset.z;
	posWorld.xy = CAMERA_POSITION_WORLD.xy + t * rayWorld.xy + centerOffset.xy;
	
	// calculate planar distance from camera to fragment (used for fading) 
	float distPlanar = distance(posWorld.xy, CAMERA_POSITION_WORLD.xy);
	float betterFadeEnd = fadeEnd + distPlanar;
	
	float distZ = distance(CAMERA_POSITION_WORLD.z, 0.0);
	float dsad = ceil(distZ / 10.0);
	float unitSizeBetter = unitSize;//dsad * float(subdivisions);
	
	// grid
	float line = grid(posWorld.xy, unitSizeBetter, majorLineThickness);
	line += grid(posWorld.xy, unitSizeBetter / float(subdivisions), minorLineThickness) * minorLineAlpha;
	line = clamp(line, 0.0, 1.0);
	
	// distance fade factor
	float fadeFactor = 1.0 - clamp((distPlanar - fadeStart) / (betterFadeEnd - fadeStart), 0.0, 1.0);
	
	// write ground plane depth into z buffer
	vec4 pp = (PROJECTION_MATRIX * (VIEW_MATRIX * vec4(posWorld, 1.0)));
	DEPTH = pp.z / pp.w;
	
	// final alpha
	//vec4 gridColorBetter = straight_line(posWorld.xy, majorLineThickness, false, true) + straight_line(posWorld.xy, majorLineThickness, true, false);
	float alphaGrid = line * gridColor.a;// + gridColorBetter.a;
	ALPHA = clamp(alphaGrid, 0.0, 1.0) * fadeFactor;
	// eliminate grid above the horizon
	ALPHA *= step(t, 0.0);
	
	//vec3 newColor = gridColorBetter.rgb + gridColor.rgb;
	// final color (premultiplied alpha blend)
	ALBEDO = (1.0 - alphaGrid) + (gridColor.rgb * alphaGrid);// - gridColorBetter.a);
	
}