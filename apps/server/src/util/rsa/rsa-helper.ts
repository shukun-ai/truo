import { constants, privateDecrypt, publicEncrypt } from 'crypto';

export class RsaHelper {
  decrypt(content: string) {
    const privateKey = process.env.RSA_PRIVATE_KEY;

    if (!privateKey) {
      throw new Error('未配置私钥，请联系管理员');
    }

    const decryptedData = privateDecrypt(
      {
        key: privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(content, 'base64'),
    );

    return decryptedData.toString('utf-8');
  }

  encrypt(content: string) {
    const publicKey = process.env.RSA_PUBLIC_KEY;

    if (!publicKey) {
      throw new Error('未配置公钥，请联系管理员');
    }

    const encryptedData = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(content),
    );

    return encryptedData.toString('base64');
  }
}
