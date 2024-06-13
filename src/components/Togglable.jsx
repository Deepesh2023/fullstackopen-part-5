import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [hideBlogForm, setHideBlogForm] = useState(true)

  const formDisplay = () => {
    setHideBlogForm(!hideBlogForm)
  }

  const hideFormAfterNewPost = () => {
    setHideBlogForm(true)
  }

  useImperativeHandle(refs, () => {
    return { hideFormAfterNewPost }
  })

  const style1 = {
    display: 'none',
  }

  const style2 = {
    display: '',
  }

  return (
    <>
      <div style={hideBlogForm ? style2 : style1}>
        <button onClick={formDisplay}>New Blog</button>
      </div>
      <div style={hideBlogForm ? style1 : style2}>
        {props.children}
        <button onClick={formDisplay}>Cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
