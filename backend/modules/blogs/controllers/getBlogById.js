const mongoose = require("mongoose");
const getBlogById = async (req, res) => {
  const BlogModel = mongoose.model("Blogs");
  const { blogId } = req.params;
  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blogs not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Blogs found successfully",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getBlogById;
