const mongoose = require("mongoose");
const createBlog = async (req, res) => {
  const BlogModel = mongoose.model("Blogs");
  const { title, body } = req.body;
  try {
    const newBlog = await BlogModel.create({ title, body });
    res.satus(201).json({
      status: "success",
      message: "Blogs created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createBlog;
