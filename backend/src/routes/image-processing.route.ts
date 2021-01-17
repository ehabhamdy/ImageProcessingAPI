import express, { Request, Response, Router } from 'express';
import multer from 'multer';
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

    const url = req.protocol + '://' + req.get('host');
    const imagePath = url + '/images/resized/' + req.file.filename;

    res.status(200).send({ message: imagePath });
  }
);

router.get('/', (req: Request, res: Response) => {
  const url = req.protocol + '://' + req.get('host');

  const images: string[] = [];
  fs.readdirSync(path.join(__dirname, '../images/resized/')).forEach((file) => {
    images.push(url + '/images/resized/' + file);
  });

  res.status(200).send({ message: 'succeeded', images: images });
});

export default router;
