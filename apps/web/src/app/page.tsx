import Hero from '../components/hero'
import Posts from '../components/posts'
import { fetchPosts } from '../lib/actions/posts.get'
import styles from './page.module.scss';
import { DEFAULT_PAGE_SIZE} from '../lib/constants'

type Props = {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}
export default async function Home({ searchParams} : Props) {
  const { page } = await searchParams
  const { posts, count } = await fetchPosts({ page: page ? +page : undefined, })

  return (
    <main className='toto'>
      <Hero />
      <Posts posts={posts} current={page ? +page : 1 } total= {Math.ceil(count /DEFAULT_PAGE_SIZE)}/>
    </main>
  );
}
