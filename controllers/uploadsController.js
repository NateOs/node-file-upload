const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadProductImageLocal = async (req, res) => {
  let productImage = req.files.image;

  // do some validation on the product image
  if (!req.files) {
    throw new CustomError.BadRequestError("No file Uploaded");
  }

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("No file Uploaded");
  }

  const fileSize = 1024 * 1024;
  if (productImage.size > fileSize) {
    throw new CustomError.BadRequestError(
      "File should be less than 100 kbytes",
    );
  }

  console.log(req.files);

  // save image to location on server
  const imagePath = path.join(
    __dirname,
    "../public/uploads/",
    `${productImage.name}`,
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).send({
    image: {
      src: `/uploads/${productImage.name}`,
    },
  });
};

const uploadProductImage = async (req, res) => {
  console.log(req.files.image.tempFilePath); // once tempFiles is turned on, this object value from expressFileUpload populates
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    },
  );

  console.log(result);
  res.status(StatusCodes.OK).send({
    image: {
      src: result.secure_url,
    },
  });
};

module.exports = {
  uploadProductImage,
};
