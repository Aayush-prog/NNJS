const mongoose = require("mongoose");
const editBlog = async (req, res) => {
  const BlogModel = mongoose.model("Blogs");
  const { title, body } = req.body;
  const { blogId } = req.params;
  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blogs not found",
      });
    }
    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {
      title,
      body,
    });
    res.satus(201).json({
      status: "success",
      message: "Blogs updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editBlog;
