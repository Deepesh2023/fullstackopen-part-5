import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h1>blogs</h1>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
