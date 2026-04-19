const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  try {
    const users = await User.find({}).select("_id first_name last_name");
    response.status(200).send(users);
  } catch (err) {
    response.status(500).send({ error: err.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id).select("_id first_name last_name location description occupation");
    if (!user) {
      return response.status(400).send({ error: "User not found" });
    }
    response.status(200).send(user);
  } catch (err) {
    response.status(400).send({ error: "Invalid user ID" });
  }
});

router.post("/", async (request, response) => {
  
});

router.get("/", async (request, response) => {
  
});

module.exports = router;