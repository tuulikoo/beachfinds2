// imageProxy.ts
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

import { useAuth } from './types/AuthContext';




const router = express.Router();



router.get('/:filename', async (req: Request, res: Response) => {
  const { token } = useAuth();
  console.log("token from imageProxy = ", token);

  const imageUrl = `${process.env.UPLOAD_URL}/upload/`;
  const options = {
    method: 'GET',
    headers: {

      Authorization: `Bearer ${token}`, // Adjust accordingly
    },
  };

try {
    const imageResponse = await fetch(imageUrl, options);
    if (imageResponse.ok) {
        const contentType = imageResponse.headers.get("content-type");
        if (contentType) {
            res.setHeader("Content-Type", contentType);
        }
        if (imageResponse.body) {
            imageResponse.body.pipe(res);
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(imageResponse.status).json({ message: "Error fetching image" });
    }
} catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
