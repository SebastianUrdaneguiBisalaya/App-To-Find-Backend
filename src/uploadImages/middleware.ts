import { NextFunction, Request, Response } from 'express';
import { upload } from './multerHelper';
import { handleUpload } from './cloudinaryHelper';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const runMiddleware = (req: Request, res: Response, fn: (req: Request, res: Response, next: NextFunction) => void) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
  }

export const handler = async (req: Request, res: Response) => {
  try {
    await runMiddleware(req, res, upload.single('file'));
    
    if (!req.file) {
      res.status(400).send({ message: 'No file uploaded' });
    }

    const cldRes: CloudinaryResponse = await handleUpload(req.file!.buffer);

    const imageUrl = cldRes.secure_url; 

    const userId = req.body.userId; 
    await prisma.user.update({
        where: { user_id: userId },
        data: { user_avatar: imageUrl },
    });

    res.status(200).send({ message: 'File uploaded successfully', result: cldRes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};