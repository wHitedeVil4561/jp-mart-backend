import {Request, Response}  from 'express';
import {promises as fs} from 'fs';
import path ,{dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const langDir = path.join(__dirname, "lang");
const lngMsg: { [key: string]: any } = {};

(async () => {
  try {
    // Await the readdir promise
    const files = await fs.readdir(langDir);

    await Promise.all(
      files
        .filter((file: string) => {
          return (
            !file.startsWith('.')  && file.endsWith('.json')
          );
        })
        .map(async (file: string) => {
          const filename = file.slice(0, -5); // Remove '.json'
          const lng = await import(path.join(langDir, file),{
            assert: {
              type: "json",
            },
          }); // Dynamic import
          lngMsg[filename] = lng.default ?? lng; // Handle the JSON module default export
        })
    );

  } catch (err) {
    console.error(err);
  }
})();


export function success(req:Request, res:Response, result:any, code:number) {
  const lng = req.headers["accept-language"] ?? "en";
  try {
    const response = {
      success: true,
      statusCode: code,
      message:
        (lngMsg[lng]
          ? lngMsg[lng][result.msgCode]
          : lngMsg["en"][result.msgCode]) ||
        result.msgCode,
      result: result.data ? result.data : [],
      time: Date.now(),
    };
    return res.status(code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: true,
      statusCode: 500,
      message: lngMsg[lng]
        ? lngMsg[lng]["SOMETHING_WRONG"]
        : lngMsg["en"]["SOMETHING_WRONG"],
      result: [],
      time: Date.now(),
    });
  }
}

export function error(req:Request, res:Response, error:any, code:number) {
  const lng = req.headers["accept-language"] ?? "en";
  console.log(lng);
  try {
    const response = {
      success: false,
      statusCode: code,
      message:
        (lngMsg[lng]
          ? lngMsg[lng][error.msgCode]
          : lngMsg["en"][error.msgCode]) ||
        error.msgCode,
      result: [],
    };
    return res.status(code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: true,
      statusCode: 500,
      message: lngMsg[lng]
        ? lngMsg[lng]["SOMETHING_WRONG"]
        : lngMsg["en"]["SOMETHING_WRONG"],
      result: [],
      time: Date.now(),
    });
  }
}

