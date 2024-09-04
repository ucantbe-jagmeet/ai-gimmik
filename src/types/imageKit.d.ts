declare module "imagekit" {
  export default class ImageKit {
    constructor(options: {
      publicKey: string;
      privateKey: string;
      urlEndpoint: string;
    });
    getAuthenticationParameters(): {
      token: string;
      expire: number;
      signature: string;
    };
  }
}
