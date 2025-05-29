'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/submitButton'
import { ExclamationCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Post } from '../../../../lib/types/model.types'
import { deletePost } from '../../../../lib/actions/post.delete'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

type Props = {
  post: Post
}

const DeletePost = ({ post }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const removePostMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      deletePost(post.id).then(() => {
        toast.success('the post has been deleted')
        setOpen(false)
        router.refresh()
      }).catch((err) => {
        toast.error(err.message)
      })
    }
  })

  const onClickDelete = () => {
    console.log("coucou")
    removePostMutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="border bg-white p-2 w-9 h-9 border-yellow-600 rounded-md text-yellow-600 hover:border-yellow-800  hover:text-yellow-800 hover:bg-gray-50 transition-colors"
          onClick={() => setOpen(true)}>
          <TrashIcon className="w-4 bg-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className='text-black'>
        <DialogTitle className="flex justify-center items-center gap-2 font-thin">
          <p className="text-red-500">Delete The Post</p>
          <ExclamationCircleIcon className="w-8 text-red-500" />
        </DialogTitle>
        <div className='flex flex-col'>
          <p>
            This action cannot be undone. This will permanently delete your post
            and remove its data from our servers.
          </p>
          <hr className="m-3" />
          <p className="text-slate-400 font-bold self-center">Title of the Post</p>
          <p>{post.title}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <SubmitButton variant="destructive" onClick={onClickDelete}>Delete</SubmitButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeletePost
