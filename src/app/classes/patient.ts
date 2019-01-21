export class Patient {
  id: number;
  fn: string;
  mi: string;
  ln: string;
  clinic: string;
  bday: string;
  gender: string;
  bloodtype: string;
  height: string;
  weight: string;
  img: string;
  emergency: {
    fn: string;
    ln: string;
    address: string;
    phone: string;
    email: string;
  }
}
