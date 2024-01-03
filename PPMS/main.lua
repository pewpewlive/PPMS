--PPMS.Log("Hello world!", PPMS.LogLevel.Info)

PPMS.UI.Button("Amogus1", function()
  PPMS.Print("AMogus1 pressed")
end)
PPMS.UI.Button("Amogus2", function()
  PPMS.Print("AMogus2 pressed")
end)
PPMS.UI.Button("Amogus3", function()
  PPMS.Print("AMogus3 pressed")
end)
PPMS.UI.Button("Amogus4", function()
  PPMS.Print("AMogus4 pressed")
end)


















-- -- Init for polygon generator
-- local pi = math.pi
-- local tau = pi * 2

-- local function add_dot(mesh_vertexes, mesh_segments, mesh_colors, x, y, z, color, detail)
--   local segment_collection = {}

--   for i = 1, detail do
--     table.insert(mesh_vertexes, { x + math.cos(tau / detail * i) / 3, y + math.sin(tau / detail * i) / 3, z })
--     table.insert(segment_collection, #mesh_vertexes - 1)
--     table.insert(mesh_colors, color)
--   end

--   table.insert(segment_collection, #mesh_vertexes - detail)

--   table.insert(mesh_segments, segment_collection)
-- end

-- local blob_config = {
--   detail = 3,
--   initial_radius = 5,
--   points = 52,
--   bump_amount = 5
-- }

-- -- Init for spring generator
-- local spring_config = {
--   radius = 3,
--   depth = 5,
--   length = 8,
--   detail = 16
-- }
-- -- Init for graph generator
-- local graph_config = {
--   range_begin = -10,
--   range_end = 10,
--   range_step = 0.1,
--   source = "x*x"
-- }

-- mesh_one = PPMS.GetMesh(1)
-- PPMS.Actions.OnUpdate(function()
--   ImGui.Begin("Generators")

--   ImGui.Text("Basic")
--   if ImGui.CollapsingHeader("Spring generator") then
--     ImGui.DragFloat("Radius", spring_config.radius, function(value)
--       spring_config.radius = value
--     end)

--     ImGui.DragFloat("Depth", spring_config.depth, function(value)
--       spring_config.depth = value
--     end)

--     ImGui.DragFloat("Length", spring_config.length, function(value)
--       spring_config.length = value
--     end)

--     ImGui.DragFloat("Detail", spring_config.detail, function(value)
--       spring_config.detail = value
--     end)

--     if ImGui.Button("Create") then
--       local mesh_vertexes = {}
--       local mesh_segments = {}

--       local offset = math.pi * 2 / spring_config.detail

--       for i = 0, spring_config.detail * spring_config.length do
--         local x, y = math.cos(i * offset), math.sin(i * offset)
--         table.insert(mesh_vertexes,
--           { x * spring_config.radius, y * spring_config.radius, (i / spring_config.detail) *
--           spring_config.depth })
--         table.insert(mesh_segments, i)
--       end

--       PPMS.SetMesh(1, { vertexes = mesh_vertexes, segments = { mesh_segments } })
--     end
--   end

--   ImGui.Separator()
--   ImGui.Text("Exotic")

--   if ImGui.CollapsingHeader("Polygon blob generator") then
--     ImGui.DragFloat("Detail", blob_config.detail, function(value)
--       blob_config.detail = value
--     end)

--     ImGui.DragFloat("Radius", blob_config.initial_radius, function(value)
--       blob_config.initial_radius = value
--     end)

--     ImGui.DragFloat("Points", blob_config.points, function(value)
--       blob_config.points = value
--     end)

--     if ImGui.Button("Create") then
--       local mesh_vertexes = {}
--       local mesh_segments = {}
--       local mesh_colors = {}

--       for i = 0, tau, tau / blob_config.points * 2 do
--         for j = 0, tau, tau / blob_config.points * 2 do
--           local bump = (math.sin(i * 8) * math.cos(j * 5)) * blob_config.bump_amount
--           local radius = blob_config.initial_radius + bump
--           add_dot(mesh_vertexes, mesh_segments, mesh_colors, math.sin(i) * math.cos(j) * radius,
--             math.cos(i) * radius, math.sin(i) * math.sin(j) * radius,
--             { 0, radius / (blob_config.initial_radius + 10), 1, 1 }, blob_config.detail)
--           --add_dot(math.sin(i) * math.cos(j) * radius, math.cos(i) * radius, math.sin(i) * math.sin(j) * radius, 0xffffffff)
--         end
--       end

--       PPMS.SetMesh(1, { vertexes = mesh_vertexes, segments = mesh_segments, colors = mesh_colors })
--     end
--   end

--   if ImGui.CollapsingHeader("Function graph") then
--     ImGui.DragFloat("Begin", graph_config.range_begin, function(value)
--       graph_config.range_begin = value
--     end)

--     ImGui.DragFloat("End", graph_config.range_end, function(value)
--       graph_config.range_end = value
--     end)

--     ImGui.DragFloat("Step", graph_config.range_step, function(value)
--       graph_config.range_step = value
--     end)

--     ImGui.Text("Write a Lua expression here (input variable is x, return is done automatically)")
--     ImGui.InputText("Function code", graph_config.source, 256, function(value) graph_config.source = value end)

--     if ImGui.Button("Create") then
--       local produced_mesh = {
--         vertexes = {},
--         segments = { {} }
--       }
--       for x = graph_config.range_begin, graph_config.range_end, graph_config.range_step do
--         local f, err = load("return function(x) return " .. graph_config.source .. " end")
--         if f then
--           local ok, get = pcall(f)
--           if ok then
--             table.insert(produced_mesh.vertexes, { x, get(x) })
--           else
--             ImGui.Text("Execution error: " .. get)
--           end
--         else
--           ImGui.Text("Compilation error: " .. err)
--         end
--       end
--       for i = 0, #produced_mesh.vertexes - 1 do
--         table.insert(produced_mesh.segments[1], i)
--       end
--       PPMS.SetMesh(1, produced_mesh)
--     end
--   end
--   ImGui.End()
-- end)
