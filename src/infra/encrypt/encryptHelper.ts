import bcrypt from 'bcrypt'

export class EncryptHelper {
  private readonly salt: string;
  
  constructor(salt:string) {
    this.salt = salt;
  }
  
  encrypt = async ( text: string ): Promise<string> => {
    return await bcrypt.hash(text, parseInt(this.salt))
  }
  
  validate = async (encryptedText: string, text: any): Promise<boolean> => {
    return await bcrypt.compare(text, encryptedText);
  }
}