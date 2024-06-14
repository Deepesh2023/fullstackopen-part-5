import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('new blog creation form input test', async () => {
  const addNewBlog = vi.fn()
  const { container } = render(<BlogForm addNewBlog={addNewBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const addNewBlogButton = container.querySelector('#addNewBlogButton')

  const user = userEvent.setup()

  await user.type(titleInput, 'testing title')
  await user.type(authorInput, 'testing author')
  await user.type(urlInput, 'testing url')

  await user.click(addNewBlogButton)

  expect(addNewBlog.mock.calls).toHaveLength(1)
  expect(addNewBlog.mock.calls[0][0]).toStrictEqual({
    title: 'testing title',
    author: 'testing author',
    url: 'testing url',
  })
})
