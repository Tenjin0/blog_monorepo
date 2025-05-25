'use client'

import DOMPurify from 'dompurify'
import React from 'react'

type Props = {
  content: string
}
const Content = (props: Props) => {
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.content)}}/> */}
    </>
  )
}

export default Content
