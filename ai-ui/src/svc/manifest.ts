import * as fs from 'fs';

export default async function text(file: string): Promise<string> {
  return new Promise((resolve: (result: string) => void, reject: (err: Error) => void) => {

    return fs.readFile(file, 'utf8', (err: Error, data: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
