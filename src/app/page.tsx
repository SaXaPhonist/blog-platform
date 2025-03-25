import PostList from '@/components/PostList'
import SearchBar from '@/components/SearchBar'
import { getPosts } from '@/shared/api/posts'
import { Suspense } from 'react'
import { PostSkeleton } from '@/components/PostsSkeleton'


export default async function Home() {
  const posts = getPosts()
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Blog Platform</h1>
      <SearchBar />
      <Suspense fallback={<PostSkeleton />}>
        <PostList initialPostsPromise={posts} />
      </Suspense>
    </div>
  )
} 