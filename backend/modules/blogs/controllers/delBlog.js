const mongoose = require("mongoose");
const delBlog = async (req, res) => {
  const BlogModel = mongoose.model("Blogs");
  const {} = req.body;
  const { blogId } = req.params;
  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blogs not found",
      });
    }
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    res.satus(201).json({
      status: "success",
      message: "Blogs deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delBlog;
