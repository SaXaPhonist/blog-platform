'use client'

import { useBlogStore } from '@/store/blogStore'
import debounce from 'debounce'

export default function SearchBar() {
  const setSearchQuery = useBlogStore((state) => state.setSearchQuery)

  const debouncedSearch = debounce((value: string) => {
      setSearchQuery(value)
    }, 300)
  

  return (
    <input
      type="text"
      placeholder="Search posts..."
      onChange={(e) => debouncedSearch(e.target.value)}
      className="w-full text-gray-800 p-2 border  rounded-md dark:text-gray-300"
    />
  )
} 