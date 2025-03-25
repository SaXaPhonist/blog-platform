import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PostList from '../PostList'
import { useBlogStore } from '@/store/blogStore'
import Image from 'next/image'

jest.mock('@/store/blogStore')
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }) => <Image src={src} alt={alt} />
}))

const mockPosts = [
  { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Content 2', userId: 1 },
  { id: 3, title: 'Post 3', body: 'Content 3', userId: 2 },
  { id: 4, title: 'Post 4', body: 'Content 4', userId: 2 },
  { id: 5, title: 'Post 5', body: 'Content 5', userId: 3 },
  { id: 6, title: 'Post 6', body: 'Content 6', userId: 3 },
  { id: 7, title: 'Post 7', body: 'Content 7', userId: 4 },
]

describe('PostList', () => {
  const mockStore = {
    posts: [],
    setPosts: jest.fn(),
    appendPosts: jest.fn(),
    searchQuery: '',
    isInitialLoading: false,
    isLoadingMore: false,
    setInitialLoading: jest.fn(),
    setLoadingMore: jest.fn(),
    page: 1,
    setPage: jest.fn(),
    hasMore: true,
    setHasMore: jest.fn(),
  }

  beforeEach(() => {
   useBlogStore.mockImplementation(() => mockStore)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading skeleton initially', () => {
    mockStore.isInitialLoading = true
    render(<PostList initialPosts={mockPosts} />)
    const skeletons = screen.getAllByTestId('post-skeleton')
    expect(skeletons).toHaveLength(6)
  })

  it('renders initial posts', async () => {
    mockStore.posts = mockPosts.slice()
    render(<PostList initialPosts={mockPosts} />)
    
    const posts = screen.getAllByRole('link')
    expect(posts).toHaveLength(6)
    expect(screen.getByText('Post 1')).toBeInTheDocument()
  })

  it('loads more posts when clicking load more button', async () => {
    mockStore.posts = mockPosts.slice()
    render(<PostList initialPosts={mockPosts} />)

    const loadMoreButton = screen.getByRole('button', { name: /загрузить еще/i })
    fireEvent.click(loadMoreButton)

    expect(mockStore.setLoadingMore).toHaveBeenCalledWith(true)
    await waitFor(() => {
      expect(mockStore.appendPosts).toHaveBeenCalled()
    })
  })

  it('filters posts based on search query', () => {
    mockStore.posts = mockPosts.slice()
    mockStore.searchQuery = 'Post 1'
    render(<PostList initialPosts={mockPosts} />)

    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.queryByText('Post 2')).not.toBeInTheDocument()
  })

  it('hides load more button when no more posts', () => {
    mockStore.hasMore = false
    mockStore.posts = []
    render(<PostList initialPosts={mockPosts} />)

    expect(screen.queryByRole('button', { name: /загрузить еще/i })).not.toBeInTheDocument()
  })
}) 