import { Post, PostWithImage } from '../types/posts'


export async function getPost(slug: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
  const post = await res.json()
  const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  const user = await userRes.json()
  return { ...post, author: user }
}
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
const imagesUrl = (id: number) => `https://picsum.photos/seed/${id}/800/600`

export async function getPosts(): Promise<PostWithImage[]> {
  try {
    const postRes = await fetch(postsUrl, { next: { revalidate: 300 }, cache: 'force-cache' })
    const posts = await postRes.json() as Post[]
    const postsWithImages = Promise.all(posts.map(async (post) => {
      try {
        const imageRes = await fetch(imagesUrl(post.id), { next: { revalidate: 300 }, cache: 'force-cache'})
        
        const image = imageRes.url
        return {
          ...post,
          image
        } as unknown as PostWithImage
      } catch (error) {
        console.error('Failed to fetch image:', error)
        return {
          ...post,
          image: ''
        } as unknown as PostWithImage
      }
    }))
    return postsWithImages
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []
  }
}



export async function loadMorePosts(page: number, initialPosts: Post[]) {
  const start = page * 6
  const end = start + 6
  const nextPosts = await new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      resolve(initialPosts.slice(start, end))
    }, Math.random() * 2000)
  })
  return nextPosts
}
