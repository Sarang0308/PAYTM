const express = require("express");
const userRouter = require("./user");
const account = require("./account")
const router = express.Router();

router.use("/user",userRouter);
router.use("/account",account);

module.exports = router;
