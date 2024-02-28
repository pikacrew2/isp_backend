const {userController, deleteUser, login, loggedData, getUsers, getUserByUsername} = require("../controllers/user.controller");
const express = require('express');


const router = express.Router()


router.post('/register', userController);
router.post('/login', login);
router.get('/logged', loggedData);
router.get('/get-users', getUsers);
router.get('/get-user-by-username/:username', getUserByUsername)
router.delete("/delete-user/:id", deleteUser)






module.exports = router;