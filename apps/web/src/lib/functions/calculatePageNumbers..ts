import { IPaginationProps } from "../../components/pagination"



export function calculatePageNumbers({neighboor, total: totalPages, current}: Required<Omit<IPaginationProps, 'className'| 'onClick'>>) {
  const totalNumbers = neighboor * 2 + 3
  const totalBlocks = totalNumbers + 2

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, current-neighboor)
    const endPage = Math.min(totalPages -1, current + neighboor)

    let pages: Array<string | number> = Array.from({
      length: endPage -startPage + 1
    ,}, (_, i) => startPage + i)

    if (startPage > 2) pages = ["...", ...pages]
    if (endPage < totalPages -1) pages = [...pages, '...']
      return [1, ...pages, totalPages]
  }

  return Array.from({length: totalPages}, (_, i) => i + 1)
}
