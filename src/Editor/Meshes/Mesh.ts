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

  setVertex(position: Vector3, color: Color, vertex: number) {
    this.vertices[vertex] = new Vertex(position, color)
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

  public toThreeColor(): Color{
    return new Color(this.color.x, this.color.y, this.color.z)
  }
}
