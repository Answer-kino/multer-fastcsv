import multer, { FileFilterCallback } from "multer";
import { logger } from "../config/logger";
import { Request } from "express";
import { mkdirSync } from "fs";
import { DestinationCallback, FileNameCallback } from "src/interface/IMulter";

const maxSize: number = Number(1024);

/**
 * 정의한 mimetype과 동일한 파일만 필터링합니다.
 * @param fieldname rotue에서 정의한 필드이름입니다.
 * @param mimetype
 * @returns
 */
const fileMimeTypeFileter = (fieldname: string, mimetype: string) => {
  if (fieldname === "nftFile") {
    if (mimetype === "image/gif") return true;
    if (mimetype === "image/png") return true;
    if (mimetype === "image/jpg") return true;
    if (mimetype === "image/jpeg") return true;
  }

  if (fieldname === "documentImg") {
    if (mimetype === "image/png") return true;
    if (mimetype === "image/jpg") return true;
    if (mimetype === "image/jpeg") return true;
  }

  if (fieldname === "capitalCsv") {
    if (mimetype === "text/csv") return true;
  }

  return false;
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (fileMimeTypeFileter(file.fieldname, file.mimetype)) {
    cb(null, true);
  } else {
    logger.error(`[FILE_UPLOAD_ERROR] The file type does not mactch - [${file.mimetype}] ${file.originalname}`);

    cb(null, false);
  }
};

/**
 * @link multer.diskStorage https://github.com/expressjs/multer/blob/master/doc/README-ko.md#diskstorage
 */
const csvStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = "uploadFiles/csv/" as string;
    mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const toSeconds = Math.floor(Date.now() / 1000);
    const customFilename: string = `${toSeconds}_${file.originalname}`;

    cb(null, `${customFilename}`);
  }
});

export const csvUpload = multer({
  storage: csvStorage,
  limits: { fieldSize: maxSize },
  fileFilter
});
