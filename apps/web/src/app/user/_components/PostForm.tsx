"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from "next/image"
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { TPostFormState } from '../../../lib/types/form.state'
import SubmitButton from '../../../components/submitButton'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation' // client component version


type Props = {
  state: TPostFormState,
  formAction: (payload: FormData) => void
}
const PostForm = ({ state, formAction }: Props) => {
  const [thumbnailName, setShumbnailName] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (state?.ok) {
      toast.success(state.message)
      if (state.action === 'UPDATE') {
        setTimeout(() => {
          router.back()
        }, 1000)
      }

    } else if (state?.message) {
      toast.error(state.message)
    }
    if (state?.data?.previousThumbnail) {
      setSelectedImage(state?.data?.previousThumbnail)
    }
  }, [state])

  const OnChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setShumbnailName(e.target.files[0].name)
      setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }
  }
  return (
    <form action={formAction} className='shadow-lg rounded-md mt-10 p-5 flex flex-col gap-6 [&>div>input]:text-black [&>div>input]:bg-white [&>div>label]:text-lg [&>div>label]:font-bold [&>div]:rounded-md [&>div]:flex [&>div]:flex-col [&>div]:gap-3'>

      {
        !state?.ok && !!state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )
      }
      <div>
        <Input type="hidden" id="post-id" name="id" defaultValue={state?.data?.id}></Input>
      </div>

      <div>
        <Label htmlFor='title'>Title</Label>
        <Input id="post-title" name="title" placeholder='Enter the title of your post' defaultValue={state?.data?.title}></Input>
      </div>
      {
        !!state?.errors?.title && (
          <p className="text-red-500 text-sm">{state.errors.title}</p>
        )
      }
      <div>
        <Label htmlFor='content'>Content</Label>
        <Textarea className="bg-white text-black" id='post-content' name="content" placeholder='Enter your post content' rows={6} defaultValue={state?.data?.content} />
      </div>
      {
        !!state?.errors?.content && (
          <p className="text-red-500 text-sm">{state.errors.content}</p>
        )
      }
      <div>
        <Label htmlFor='thumbnail'>Thumbnail</Label>
        <Input id="post-thumbnail" name="thumbnail" type="file" accept="image/*" onChange={OnChangeThumbnail}></Input>
        <Input hidden id="post-thumbnail-name" name="thumbnail-name" type="text" value={thumbnailName}></Input>
        {
          !!selectedImage && <Image className="self-center" id="post-thumbnail-image" src={selectedImage} alt={'post thumbnail'} width={200} height={150} />
        }
      </div>
       {
        !!state?.errors?.thumbnail && (
          <p className="text-red-500 text-sm">{state.errors.thumbnail}</p>
        )
      }
      <div>
        <Label htmlFor='tags'>Tags</Label>
        <Input id="post-tags" name="tags" placeholder='Enter the title of your post' defaultValue={state?.data?.tags}></Input>
      </div>
       {
        !!state?.errors?.tags && (
          <p className="text-red-500 text-sm">{state.errors.tags}</p>
        )
      }
      <div className='flex !flex-row relative'>
        <Label className="absolute whitespace-nowrap p-2.5" htmlFor='published'>Published now</Label>
        <Input id="post-published" name="published" placeholder='Enter the title of your post' type='checkbox' defaultChecked={state?.data?.published === "on" ? true : false} />
      </div>
       {
        !!state?.errors?.published && (
          <p className="text-red-500 text-sm">{state.errors.published}</p>
        )
      }
      <SubmitButton className='text-lg'>{state?.data?.id ? "Update" : "Save"}</SubmitButton>
    </form>
  )
}

export default PostForm
