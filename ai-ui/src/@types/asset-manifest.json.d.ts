/// <reference types="node" />

declare interface IManifest {
  "main.css": string;
  "main.js": string;
}

declare module "*/asset-manifest.json" {
  const value: IManifest;
  export default value;
}