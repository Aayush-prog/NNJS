const mongoose = require("mongoose");
const getBlogs = async (req, res) => {
  const BlogModel = mongoose.model("Blogs");
  try {
    const blog = await BlogModel.find();
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
module.exports = getBlogs;
