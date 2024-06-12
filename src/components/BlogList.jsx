import Blog from './Blog';

const BlogList = ({ blogs, token }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>blogs</h1>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} token={token} />
      ))}
    </div>
  );
};

export default BlogList;
