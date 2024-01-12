export interface CapiResponse<ResultT> {
  status: string,
  pages: number,
  currentPage: number,
  results: ResultT[]
}

export type WrappedResponse<ResponseT extends CapiResponse<ResultT>, ResultT> = { response: ResponseT }
