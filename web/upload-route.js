import dotenv from 'dotenv';
const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');

dotenv.config();
/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
 accessKeyId: process.env.IAM_ACCESS_KEY_ID,
 secretAccessKey: process.env.IAM_SECRET_ACCESS_KEY,
});


 // Single Upload
const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  bucket: process.env.S3_BUCKET_NAME + '/w',
  acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, req.query.userID + path.extname(file.originalname))
  }
 }),
 limits:{ fileSize: 8000000 }, // In bytes: 2000000 bytes = 8 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');

function checkFileType( file, cb ){
 // Allowed ext
 const filetypes = /jpeg|jpg/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
 const mimetype = filetypes.test( file.mimetype );
if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: JPEG Only!' );
 }
}

router.post( '/profile-img-upload', ( req, res ) => {
profileImgUpload( req, res, ( error ) => {
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    const imageName = req.file.key;
    const imageLocation = req.file.location;
// Save the file name into database into profile model
res.json( {
     image: imageName,
     location: imageLocation
    } );
   }
  }
 });
});
// End of single profile upload

// We export the router so that the server.js file can pick it up
module.exports = router;
