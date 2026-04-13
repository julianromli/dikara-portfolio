import {createUploadthing, type FileRouter} from 'uploadthing/server';

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '8MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => ({}))
    .onUploadComplete(async ({file}) => {
      return {url: file.url};
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
