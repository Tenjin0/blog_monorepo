export interface IFetchOpt {
  page?: number
  pageSize?: number
}

export type TSearchParams =  Promise<{[key: string]: string | string[] | undefined}>
