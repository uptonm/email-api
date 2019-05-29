const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUser = async (req, res) => {
  const exists = await User.findById(req.user._id).populate('posts');
  if (exists) {
    res.status(200).send(exists);
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
exports.putUser = async (req, res) => {
  const exists = await User.findOne({ email: req.user.email });
  if (exists) {
    await User.findByIdAndUpdate(exists._id, req.body, error => {
      if (error) return res.send(error);
      return res.send({
        user: exists._id,
        update: req.body
      });
    });
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
exports.deleteUser = async (req, res) => {
  const exists = await User.findOne({ email: req.user.email });
  if (exists) {
    await User.findByIdAndDelete(exists._id, async (error, response) => {
      if (error) throw error;
      await Post.deleteMany({ _id: { $in: response.posts } }, error => {
        if (error) throw error;
      });
      return res.send({
        user: exists._id,
        message: 'Deleted'
      });
    });
  }
};
