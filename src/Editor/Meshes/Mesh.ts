import { Color, Vector3 } from "three"

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
    this.segments.push(new MeshSegment(vertices))
  }

  deleteSegment(segment: number) {
    this.segments.splice(segment, 1)
  }
}

export class MeshSegment {
  indices: number[]

  constructor(indices: number[]) {
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
