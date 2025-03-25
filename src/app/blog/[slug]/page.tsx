import { getPost } from '@/shared/api/posts'
import { getDate } from '@/shared/utils/getDate'
import Image from 'next/image'
import Link from 'next/link'


export default async function BlogPost({ params }:{ params: Promise<{slug: string}> }) {
  const id = (await params).slug
  const post = await getPost(id)
  const publishDate = getDate()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 -ml-2"
        aria-label="Back to posts"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back</span>
      </Link>
      
      <article>
        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${post.id}/1200/800`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
          <span>{post.author.name}</span>
          <span>•</span>
          <time dateTime={new Date().toISOString()}>{publishDate}</time>
        </div>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{post.body}</p>
      </article>
    </div>
  )
} 