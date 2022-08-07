type PostType = {
  _id: string
  title: string
  description: string
  alt: string
  cover: {
    formats: {
      large: { url: string }
      medium: { url: string }
      small: { url: string }
      thumbnail: { url: string }
    }
  }
  createdAt: Date
  created_by: { firstname: string; lastname: string }
  category: { ref: { _id: string; __v: number; [category: string]: boolean } }[]
}
