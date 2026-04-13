import {generateUploadButton} from '@uploadthing/react';
import type {UploadRouter} from '../../server/uploadthing';

export const UploadButton = generateUploadButton<UploadRouter>({
  url: '/api/uploadthing',
});
