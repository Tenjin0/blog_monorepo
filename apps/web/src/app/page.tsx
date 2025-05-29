import Hero from '../components/hero'
import Posts from '../components/posts'
import { fetchPosts } from '../lib/actions/post.get'
// import styles from './page.module.scss';
import { DEFAULT_PAGE_SIZE} from '../lib/constants'
import { TSearchParams } from '../lib/types/fetch.types'

type Props = {
  searchParams: TSearchParams
}
export default async function Home({ searchParams} : Props) {
  const { page } = await searchParams
  const { posts, count } = await fetchPosts({ page: page ? +page : undefined, })

  return (
    <main>
      <Hero />
      <Posts posts={posts} current={page ? +page : 1 } total= {Math.ceil(count /DEFAULT_PAGE_SIZE)}/>
    </main>
  );
}
