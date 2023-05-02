export const encodeString = (inputString : string) => {
    const buffer = Buffer.from(inputString, 'utf8');
    return buffer.toString('base64');
  }
export const decodeString = (encodedString : string) => {
    const buffer = Buffer.from(encodedString, 'base64');
    return buffer.toString('utf8');
  }
  