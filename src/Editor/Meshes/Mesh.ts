import { Color, Vector3 } from "three"

export class Mesh {
  vertexes: Vertex[]
  segments: MeshSegment[]

  constructor(vertexes: Vertex[], segments: MeshSegment[]) {
    this.vertexes = vertexes
    this.segments = segments
  }

  addVertex(position: Vector3, color: Color) {
    this.vertexes.push(new Vertex(position, color))
  }

  createSegment(vertexes: number[]) {
    this.segments.push(new MeshSegment(vertexes))
  }

  deleteSegment(segment: number) {
    this.segments.splice(segment, 1)
  }
}

export class MeshSegment {
  indexes: number[]

  constructor(indexes: number[]) {
    this.indexes = indexes
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
