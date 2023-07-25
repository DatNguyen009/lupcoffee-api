const express = require("express");
const { messaging } = require("firebase-admin");
const admin = require("./firebase-config");

const router = express.Router();

const users = [
  {
    email: "test",
    password: "abc",
  },
];

router
  .route("/user")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    const { user } = req.body;
    users.push({ username: user.username, password: user.password });

    console.log(users);

    res.json({ loggedIn: true, status: "Everything went well!" });
  })
  .delete((req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(
      (u) => u.username === username && u.password === password
    );
    console.log(existingUser);

    if (!existingUser) {
      res.statusCode(401).json({ errorStatus: "Credentials did not match" });
    }

    users.splice(users.indexOf(existingUser), 1);
    res.json(users);
  });

router.route("/sendMessageFcm").post((req, res) => {
  const registrationToken = req.body.token;
  const message = req.body.message;

  if (!registrationToken) {
    throw new Error("Token not found");
  }

  messaging()
    .sendToDevice(registrationToken, message)
    .then((response) => {
      console.log("response", response);
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
});

module.exports = router;
