const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('../../config/index');
const {JWT_SECRET} = config;

// Model
const User = require('../../models/user')

const router = express.Router();

// @route   POST  api/auth
// @desc    Auth  user
// @access  Public
router.post('/', (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({msg: "모든 필드를 채워주세요"});
    }

    // Check for existing user
    User.findOne({email}).then((user) => {
        if (!user) {
            return res.status(400).json({msg: "유저가 존재하지 않습니다."});
        }
        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                res.status(400).json({msg: "비밀번호가 일치하지 않습니다."});
            }
            jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "2 days"}, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                })
            })
        })
    })
});

router.post('/logout', (req, res) => {
   res.json("로그아웃 성공");
});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            throw Error("유저가 존재하지 않습니다.");
        }
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(400).json({msg: e.message});
    }
})


module.exports = router;