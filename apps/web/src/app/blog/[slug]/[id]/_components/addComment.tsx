'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/submitButton'
import { createComment } from '@/lib/actions/comment.add'
import { IUserSession } from '@/lib/types/user.types'
import { toast } from 'sonner'

type Props = {
  user: IUserSession
  postId: number
}

const AddComment = ({ user, postId }: Props) => {
  const [state, action] = useActionState(createComment, undefined)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (state?.ok) {
      toast.success(state.message ?? 'Ok', )
      setOpen(false)
    } else if (state?.message) {
      toast.error(state.message)
    }
  }, [state])

  // console.log('addComment')
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent className='text-black'>
        <DialogTitle>Write a comment</DialogTitle>
        <form action={action} className="flex flex-col gap-2 items-start">
          <input name="postId" type="hidden" defaultValue={postId} />
          <Textarea name="content" rows={3}className='border active:outline:none focus-visible:ring-0 shadow'></Textarea>
          { state?.errors?.content && <p className='text-red-500 shake-animation' >{state.errors.content}</p> }
          <p className='p-2 self-end'>
            <span className='pr-2 text-slate-400'>Write as</span>
            <span className='text-slate-700'>{user.name}</span>
          </p>
          <SubmitButton className='text-center self-center'>Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddComment
