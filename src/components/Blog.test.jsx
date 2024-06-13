import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('only renders title and author by default', () => {
  const blog = {
    title: 'a blog test',
    author: 'myself',
    url: 'myself.com',
    likes: 0,
    user: {
      username: 'deepesh',
    },
  }

  const user = {
    name: 'deepesh',
    username: 'deepesh',
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.blog')

  expect(div).not.toHaveTextContent(`${blog.url}`)
  expect(div).not.toHaveTextContent(`${blog.likes}`)
})
