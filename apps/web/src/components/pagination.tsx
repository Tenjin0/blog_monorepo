"use client"

import React, { MouseEvent } from 'react'
import { calculatePageNumbers } from '../lib/functions/calculatePageNumbers.'
import { cn } from '../lib/utils'
import Link from 'next/link'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid'

export interface IPaginationProps {
  total: number
  current: number
  neighboor?: number
  className: string
  onClick?: (page: number) => void
}
const Pagination = ({ total, current, neighboor = 2, className, onClick}: IPaginationProps) => {

  if (!neighboor) {
    neighboor = 2
  }

  const onClickPage = (page: number) => (e: MouseEvent<HTMLElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick(page)
    }
  }
  const pageNumbers = calculatePageNumbers({current, total, neighboor})
  return (
    <div className={cn('flex items-center text-gray-700 justify-center gap-2', className)}>
      { current !== 1 && <button className={cn('rounded-md bg-slate-200 py-2 px-2')}>
        <Link href={`?page=${current -1 }`} onClick={onClickPage(current -1)}>
          <ChevronLeftIcon className='w-4'/>
        </Link>
        </button>}

          {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn("px-3 py-1 text-gray-700 rounded-md transition hover:text-sky-600", {
            "bg-slate-200": current !== page && page !== "...",
            "bg-blue-500 text-white": current === page,
            "cursor-not-allowed": page === "...",
          })}
        >
          {page === "..." ? "..." : <Link href={`?page=${page}`} onClick={onClickPage(page as unknown as number)}>{page}</Link>}
        </button>
      ))}
      {/* next page button */}
      {current !== total && (
        <button className="rounded-md text-gray-700  bg-slate-200 py-2 px-2">
          <Link href={`?page=${current + 1}`} onClick={onClickPage(current + 1)}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  )
}

export default Pagination
