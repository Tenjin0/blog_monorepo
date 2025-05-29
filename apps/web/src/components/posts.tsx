import { Post } from "../lib/types/model.types"
import Pagination from "./pagination"
import PostCard from "./postCard"

type Props = {
  posts : Post[]
  current: number
  total: number
}

const Posts = (props: Props) => {
  return (
    <section className="flex flex-col">
      <h2 className="rounded-md shadow-lg py-4 px-20 text-5xl mt-10 font-bold self-center text-center text-white leading-tight mb-4">
        Latests Posts
      </h2>
      <div className="px-10 mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 self-center">
        { props.posts.map((post) => (
          <PostCard key={'post-card' + post.id} post={post}/>
        ))}
      </div>
     <Pagination
        className="mt-4"
        current={props.current}
        total={props.total}
      />
    </section>
  )
}

export default Posts
