export class RsaHelper {
  publicKey!: CryptoKey;

  async importPublicKey(pem: string) {
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';
    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length,
    );
    const binaryDerString = window.atob(pemContents);
    const binaryDer = this.stringToArrayBuffer(binaryDerString);

    this.publicKey = await window.crypto.subtle.importKey(
      'spki',
      binaryDer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      true,
      ['encrypt'],
    );
  }

  async encrypt(content: string) {
    if (!this.publicKey) {
      throw new Error('未配置公钥，请联系管理员');
    }

    const encoder = new TextEncoder();
    const encoded = encoder.encode(content);

    const cipherText = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      this.publicKey,
      encoded,
    );

    const base64String = window.btoa(
      String.fromCharCode(...new Uint8Array(cipherText)),
    );

    return base64String;
  }

  // from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  private stringToArrayBuffer(text: string) {
    const buffer = new ArrayBuffer(text.length);
    const bufferView = new Uint8Array(buffer);
    for (
      let index = 0, stringLength = text.length;
      index < stringLength;
      index++
    ) {
      bufferView[index] = text.charCodeAt(index);
    }
    return buffer;
  }
}
