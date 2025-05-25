import { DEFAULT_PAGE_SIZE } from "../constants"
import { IFetchOpt } from "../types/fetch.types"

export function transformPage({ page, pageSize }: IFetchOpt = {page: 1, pageSize: DEFAULT_PAGE_SIZE}) {
  return {
    skip: ((page ?? 1) - 1) * (pageSize ?? DEFAULT_PAGE_SIZE),
    take: pageSize ?? DEFAULT_PAGE_SIZE
}
}
