import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils'

const blog = {
  title: 'a blog test',
  author: 'myself',
  url: 'myself.com',
  likes: 0,
  user: {
    username: 'deepesh',
  },
  id: 10,
}

const user = {
  name: 'deepesh',
  username: 'deepesh',
}

test('only renders title and author by default', () => {
  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.compact')

  expect(div).toHaveTextContent(blog.title, blog.author)
  expect(div).not.toHaveTextContent(blog.url, blog.likes.toString())
})

test('more details about the blog post such as url and likes are shown when the blog is expanded', async () => {
  render(<Blog blog={blog} user={user} />)

  const viewButton = screen.getByText('View')

  const userSimulation = userEvent.setup()
  await userSimulation.click(viewButton)

  const blogUrl = screen.getByText(blog.url)
  const blogLikes = screen.getByText(`Likes: ${blog.likes}`)

  expect(blogUrl, blogLikes).toBeDefined()
})

test('Likes are clicked twice when clicked twice', async () => {
  const likeBlog = vi.fn()

  render(<Blog blog={blog} user={user} likeBlog={likeBlog} />)

  const viewButton = screen.getByText('View')

  const userSimulation = userEvent.setup()
  await userSimulation.click(viewButton)

  const likeButton = screen.getByText('Like')
  await userSimulation.click(likeButton)
  await userSimulation.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)
})
