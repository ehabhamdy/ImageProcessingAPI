import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import * as fs from 'fs';

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination(_, file, cb) {
    console.log(file.originalname);
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (_, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, name + '-' + Date.now() + '.' + 'png');
  },
});

router.use(
  '/uploadImage',
  multer({ storage: storage }).single('image'),
  async (req: Request, res: Response) => {
    console.log(req.file.filename);
    try {
      // resize the uploaded image and save it
      await sharp(req.file.path)
        .resize(500)
        .toFile(path.join(__dirname, '../images/resized/') + req.file.filename);

      // remove original file image
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.log(err);
    }

    res.status(200).send({ message: 'Success updated' });
  }
);

export default router;
