const express = require('express');
const router = express.Router();
const path = require("path");

const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/aws-config.json"); // 인증
const s3 = new AWS.S3();
const multer = require("multer");
const multerS3 = require('multer-s3');
const stream = require('stream');

const upload = multer({

    storage: multerS3({
        s3: s3,
        bucket: "bucket-ghpark",
        key: function (req, file, cb) {
             cb(null, req.body.name)
        },
        acl: 'public-read-write',
    })
})


router.post('/upload', upload.single("file"), function(req, res, next){
    console.log(req.file)
})

router.get("/download/:key", function(req, res, next){
    let buff = Buffer.from(req.params.key, 'base64');
    let key = buff.toString('utf-8');
    let params = {
        Bucket: 'bucket-ghpark',
        Key: key
    }
    let file = s3.getObject(params)
		.createReadStream()
			.on('error', function(err){
				res.status(500).json({error:"Error -> " + err});
		}).pipe(res);
    return res
})

module.exports = router
