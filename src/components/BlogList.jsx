import Blog from './Blog';

const BlogList = ({ blogs, token }) => {
  return (
    <div>
      <h1>blogs</h1>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} token={token} />
      ))}
    </div>
  );
};

export default BlogList;
