// import upload cloud 
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// cloudinary config
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});
// end cloudinary config

module.exports.upload = (req, res, next) => {
    try {
        if(req.file){
          let streamUpload = (req) => {
              return new Promise((resolve, reject) => {
                  let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                      if (result) {
                        resolve(result);
                      } else {
                        reject(error);
                      }
                    }
                  );
      
                streamifier.createReadStream(req.file.buffer).pipe(stream);
              });
          };
      
          async function upload(req) {
              try {
                  let result = await streamUpload(req);
                  console.log(result);
                  req.body[req.file.fieldname] = result.url;
                  next();
              } catch (error) {
                  console.log("Upload image error:", error);
                  req.flash("error", "Upload ảnh thất bại");
                  next();
              }
          }
      
          upload(req);
        }
        else{
            next();
        }
    } catch (error) {
        console.log("Upload cloud middleware error:", error);
        req.flash("error", "Upload ảnh thất bại");
        next();
    }
}