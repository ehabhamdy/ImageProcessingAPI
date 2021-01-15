import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

export function getMulterStorageConfiguration(): multer.StorageEngine {
  return multer.diskStorage({
    destination(_, file, cb) {
      console.log(file.originalname);
      cb(null, path.join(__dirname, '../../images'));
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
}

export async function resizeImage(
  filePath: string,
  destination: string
): Promise<void> {
  try {
    // resize the uploaded image and save it
    await sharp(filePath).resize(500).toFile(destination);

    // remove original file image
    // fs.unlinkSync(req.file.path);
  } catch (err) {
    console.log(err);
  }
}
