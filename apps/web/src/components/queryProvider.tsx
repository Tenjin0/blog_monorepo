'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

type Props = PropsWithChildren
const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  )
}




export default QueryProvider
