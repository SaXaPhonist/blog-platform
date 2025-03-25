import { PostWithImage } from '@/shared/types/posts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BlogStore {
  posts: PostWithImage[]
  searchQuery: string
  isInitialLoading: boolean
  isLoadingMore: boolean
  page: number
  hasMore: boolean
  theme: 'light' | 'dark'
  setPosts: (posts: PostWithImage[]) => void
  appendPosts: (posts: PostWithImage[]) => void
  setSearchQuery: (query: string) => void
  setInitialLoading: (loading: boolean) => void
  setLoadingMore: (loading: boolean) => void
  setPage: (page: number) => void
  setHasMore: (hasMore: boolean) => void
  fetchPosts?:  () => void 
  toggleTheme: () => void
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      posts: [],
      searchQuery: '',
      isInitialLoading: true,
      isLoadingMore: false,
      page: 1,
      hasMore: true,
      theme: 'light',
      setPosts: (posts) => set({ posts }),
      appendPosts: (newPosts) => set((state) => ({ 
        posts: [...state.posts, ...newPosts] 
      })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setInitialLoading: (loading) => set({ isInitialLoading: loading }),
      setLoadingMore: (loading) => set({ isLoadingMore: loading }),
      setPage: (page) => set({ page }),
      setHasMore: (hasMore) => set({ hasMore }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'blog-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
) 