import express, { Request, Response, Router } from 'express';
import multer from 'multer';
// import sharp from 'sharp';
import path from 'path';
import * as fs from 'fs';
import {
  getMulterStorageConfiguration,
  resizeImage,
} from './utilities/image-processing.utils';

const router: Router = express.Router();

const storage = getMulterStorageConfiguration();

router.use(
  '/uploadImage',
  multer({ storage: storage }).single('image'),
  async (req: Request, res: Response) => {
    await resizeImage(
      req.file.path,
      path.join(__dirname, '../images/resized/') + req.file.filename
    );

    // remove original file image
    fs.unlinkSync(req.file.path);

    res.status(200).send({ message: 'Success updated' });
  }
);

export default router;
