const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const uploadProductImage = async (req, res) => {
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

module.exports = {
  uploadProductImage,
};
