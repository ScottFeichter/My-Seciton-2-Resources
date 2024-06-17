

// Getter methods => Database record instance method
Router.get('/"userId/likes', async (req, res) => {
  const user = await user.findByPk(req.params.userId, {
    attributes: ["id", "username"]
  })

  const likes = await user.getLikes();
  const comments = await user.getComments({
    attributes: ["body"],
  });

  console.log(user);
  const jsonUser = await user.toJSON();
  const jsonLikes = likes.map((like) => like.toJSON());
  const jsonComments = comments.map((comment) => comment.toJSON());

  jsonUser.Likes = jsonLikes;
  jsonUser.comments = jsonComments;

  res.json(user);
});
