'use client'

import { useBlogStore } from '@/store/blogStore'
import { useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getDate } from '@/shared/utils/getDate'
import { PostWithImage } from '@/shared/types/posts'
import { use } from 'react'

interface PostListProps {
  initialPostsPromise: Promise<PostWithImage[]>
}

export default function PostList({ initialPostsPromise }: PostListProps) {
  const initialPosts = use(initialPostsPromise)
  const {
    posts,
    setPosts,
    appendPosts,
    searchQuery,
    isLoadingMore,
    setLoadingMore,
    page,
    setPage,
    hasMore,
    setHasMore
  } = useBlogStore()

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return initialPosts.slice(0, 6);
    
    return initialPosts.filter((post) => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  }, [initialPosts, searchQuery]);
  
  useEffect(() => {
      setPosts(filteredPosts.slice(0, 6))
      setHasMore(filteredPosts.length > 6)

  }, [filteredPosts, setHasMore, setPosts])

  const loadMore = useCallback(async () => {
    setLoadingMore(true)
    try {
      const start = page * 6
      const end = start + 6
      const nextPosts = initialPosts.slice(start, end)

      if (nextPosts.length > 0) {
        appendPosts(nextPosts)
        setPage(page + 1)
        setHasMore(end < initialPosts.length)
      } else {
        setHasMore(false)
      }
    } finally {
      setLoadingMore(false)
    }
  }, [page, initialPosts, appendPosts, setPage, setHasMore, setLoadingMore])

  if(posts.length === 0){
    return (
        <div className="space-y-8">
          <p className="size-2.5 text-zinc-500">No any Posts</p>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-4"
        role="feed"
        aria-busy={isLoadingMore}
        aria-label="Список постов"
      >
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            prefetch={false}
            key={post.id}
            className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-labelledby={`post-title-${post.id}`}
          >
            <div className="relative w-full h-48">
              <Image
                src={post.image}
                alt={post.title}
                loading='lazy'
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2
                id={`post-title-${post.id}`}
                className="text-xl font-semibold mb-4 line-clamp-2 text-gray-800 dark:text-gray-100 transition-colors duration-300"
              >
                {post.title}
              </h2>
              <time className="text-gray-400" dateTime={new Date().toISOString()}>
                {getDate()}
              </time>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3 transition-colors duration-300">
                {post.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pb-8">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700
             dark:hover:bg-blue-600 disabled:opacity-50
              transition-all duration-300 focus:outline-none focus:ring-2
               focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label={isLoadingMore ? 'Loading more posts' : 'Load more posts'}
          >
            {isLoadingMore ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
