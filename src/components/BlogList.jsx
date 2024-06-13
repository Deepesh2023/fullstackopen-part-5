import Blog from './Blog';

const BlogList = ({ blogs, user, deleteButtonAction }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>blogs</h1>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteButtonAction={deleteButtonAction}
        />
      ))}
    </div>
  );
};

export default BlogList;
