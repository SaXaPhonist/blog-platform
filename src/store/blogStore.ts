import { create } from 'zustand'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface BlogStore {
  posts: Post[]
  searchQuery: string
  isLoading: boolean
  setPosts: (posts: Post[]) => void
  setSearchQuery: (query: string) => void
  setLoading: (loading: boolean) => void
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  searchQuery: '',
  isLoading: false,
  setPosts: (posts) => set({ posts }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
})) 