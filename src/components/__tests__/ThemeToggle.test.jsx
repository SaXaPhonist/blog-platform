import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'
import { useBlogStore } from '@/store/blogStore'

jest.mock('@/store/blogStore')

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn()

  beforeEach(() => {
    useBlogStore.mockImplementation(() => ({
      theme: 'light',
      toggleTheme: mockToggleTheme
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /переключить тему/i })
    expect(button).toBeInTheDocument()
  })

  it('shows moon icon in light mode', () => {
    render(<ThemeToggle />)
    const moonPath = screen.getByRole('button').querySelector('path')
    expect(moonPath).toHaveAttribute('d', expect.stringContaining('M20.354 15.354'))
  })

  it('shows sun icon in dark mode', () => {
    useBlogStore.mockImplementation(() => ({
      theme: 'dark',
      toggleTheme: mockToggleTheme
    }))
    render(<ThemeToggle />)
    const sunPath = screen.getByRole('button').querySelector('path')
    expect(sunPath).toHaveAttribute('d', expect.stringContaining('M12 3v1m0 16v1m9-9h-1M4'))
  })

  it('calls toggleTheme when clicked', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })
}) 