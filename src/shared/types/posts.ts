export interface Post {
    id: number
    title: string
    body: string
    userId: number
  }

export interface PostWithImage extends Post {
  image: string
}