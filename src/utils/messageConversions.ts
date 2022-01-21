export const jsonToBuffer = <T>(json: T): Buffer => Buffer.from(JSON.stringify(json));

export const bufferToJson = <T>(buffer: Buffer): T => JSON.parse(buffer.toString());