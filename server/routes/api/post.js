const express = require('express');

// Model
const Post = require('../../models/post');
const auth = require('../../middleware/auth');

const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
})

const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: "trustu",
        region: 'ap-northeast-2',
        key(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: {fileSize: 100 * 1024 * 1024},
})

// @route   POST api/post/image
// @desc    Create a Post
// @access  Private

router.post('/image', uploadS3.array('upload', 5), async (req, res, next) => {
    try {
        console.log(req.files.map(v => v.location));
        res.json({uploaded: true, url: req.files.map(v => v.location)})
    } catch (e) {
        console.error(e);
        res.json({uploaded: false, url: null});
    }
})

router.get('/', async (req, res) => {
    // api /post
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
});

router.post('/', auth, async (req, res) => {
    try {
        console.log(req, "req");
        const {title, contents, fileUrl, creator} = req.body;
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator
        });
        res.json(newPost);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;