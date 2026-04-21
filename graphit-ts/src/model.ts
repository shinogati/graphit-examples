
type EdgeData = {
  Target: number
  Cost: number
  LBL: string
}
export interface VertexData {
  edgeData: EdgeData[]
  description: string
  url: string
}
