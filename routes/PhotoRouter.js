const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(400).send({ error: "User not found" });
    }

    const photos = await Photo.find({ user_id: userId });
    const photosWithComments = await Promise.all(
      photos.map(async (p) => {
        const photoObj = p.toObject();
        const commentsWithUser = await Promise.all(
          photoObj.comments.map(async (c) => {
            const commentUser = await User.findById(c.user_id).select("_id first_name last_name");
            return {
              _id: c._id,
              comment: c.comment,
              date_time: c.date_time,
              user: commentUser,
            };
          })
        );
        return {
          _id: photoObj._id,
          user_id: photoObj.user_id,
          file_name: photoObj.file_name,
          date_time: photoObj.date_time,
          comments: commentsWithUser,
        };
      })
    );

    response.status(200).send(photosWithComments);
  } catch (err) {
    response.status(400).send({ error: "Invalid user ID" });
  }
});

router.post("/", async (request, response) => {
  
});

router.get("/", async (request, response) => {
  
});

module.exports = router;
