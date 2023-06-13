import { create } from "zustand"
import { Color, Vector3, Vector4 } from "three"

export class Mesh {
  vertices: Vertex[]
  segments: MeshSegment[]

  constructor(vertices: Vertex[], segments: MeshSegment[]) {
    this.vertices = vertices
    this.segments = segments
  }

  addVertex(position: Vector3, color: Color) {
    this.vertices.push(new Vertex(position, color))
  }

  createSegment(vertices: number[]) {
    this.segments.push(new MeshSegment(...vertices))
  }

  deleteSegment(segment: number) {
    this.segments.splice(segment, 1)
  }
}

export class MeshSegment {
  indices: number[]

  constructor(...indices: number[]) {
    this.indices = indices
  }
}

export class Vertex {
  position: Vector3
  color: Color

  constructor(position: Vector3, color: Color) {
    this.position = position
    this.color = color
  }
}

export class VertexColor {
  color: Vector4

  constructor(color: Vector4 | Vector3 | Color | number) {
    if (typeof color === "number") {
      this.color = this.numToVec4(color)
      return
    }
    if (color.isVector4) {
      this.color = color
      return
    }
    if (color.isVector3 || color.isColor) {
      this.color = new Vector4(...color.toArray(), 1)
      return
    }
    this.color = new Vector4(1, 1, 1, 1)
  }

  private numToVec4(value: number): Vector4 {
    return new Vector4(
      ((value >> 24) & 255) / 255,
      ((value >> 16) & 255) / 255,
      ((value >> 8) & 255) / 255,
      (value & 255) / 255
    )
  }

  public stripAlpha(): Vector3 {
    return new Vector3(this.color.x, this.color.y, this.color.z)
  }

  public toThreeColor(): Color {
    return new Color(this.color.x, this.color.y, this.color.z)
  }
}

// Using zustand to store the mesh

interface MeshStore {
  mesh: Mesh
  setMesh: (mesh: Mesh) => void
  addVertex: (position: Vector3, color: Color) => void
  createSegment: (vertices: number[]) => void
  deleteSegment: (segment: number) => void
  setVertexPosition: (vertex: number, position: Vector3) => void
  setVertexPosX: (vertex: number, x: number) => void
  setVertexPosY: (vertex: number, y: number) => void
  setVertexPosZ: (vertex: number, z: number) => void
}

export const useMeshStore = create<MeshStore>(set => ({
  mesh: new Mesh(
    [
      new Vertex(new Vector3(0, 0, 0), new Color(1, 1, 1)),
      new Vertex(new Vector3(100, 0, 0), new Color(1, 1, 1)),
      new Vertex(new Vector3(100, 100, 0), new Color(1, 1, 1)),
      new Vertex(new Vector3(0, 100, 0), new Color(1, 1, 1)),
    ],
    [
      new MeshSegment(0, 1),
      new MeshSegment(1, 2),
      new MeshSegment(2, 3),
      new MeshSegment(3, 0),
    ]
  ),
  setMesh: (mesh: Mesh) =>
    set({
      mesh: new Mesh(mesh.vertices, mesh.segments),
    }),
  addVertex: (position: Vector3, color: Color) =>
    set(state => {
      state.mesh.addVertex(position, color)
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
  createSegment: (vertices: number[]) =>
    set(state => {
      state.mesh.createSegment(vertices)
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
  deleteSegment: (segment: number) =>
    set(state => {
      state.mesh.deleteSegment(segment)
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
  setVertexPosition: (vertex: number, position: Vector3) =>
    set(state => {
      state.mesh.vertices[vertex].position = position
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
  setVertexPosX: (vertex: number, x: number) =>
    set(state => {
      state.mesh.vertices[vertex].position.x = x
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
  setVertexPosY: (vertex: number, y: number) =>
    set(state => {
      state.mesh.vertices[vertex].position.y = y
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
  setVertexPosZ: (vertex: number, z: number) =>
    set(state => {
      state.mesh.vertices[vertex].position.z = z
      return {
        mesh: new Mesh(state.mesh.vertices, state.mesh.segments),
      }
    }),
}))
