import bcrypt from 'bcrypt'

export class EncryptHelper {
  private readonly salt: string;
  
  constructor(salt:string) {
    this.salt = salt;
  }
  
  encryptAsync = async ( text: string ): Promise<string> => {
    return await bcrypt.hash(text, parseInt(this.salt))
  }
  
  validateAsync = async (text: any, encryptedText: string): Promise<boolean> => {
    const result = await bcrypt.compare(text, encryptedText);
    return result;
  }
}