import { getManager } from "typeorm";
import { User } from "server/entities/user";

export class UserService {
  public async getUsers() {
    const userRepository = getManager().getRepository(User);

    const users = await userRepository.find();

    return users;
  }

  public async getUser(params: {uid: number}) {
    return new Promise((resolve, reject) => {
      let user = {
        id: 10,
        fn: 'Taylor',
        ln: 'Williams',
        clinic: 'Careline Clinic',
        img: "url('/assets/images/people/caretakers/taylorwilliams.jpg')"
      };
      resolve(user);
    });
  }

  public getCaretaker(params: {id: number}) {
    return {
      id: 10,
      fn: 'Taylor',
      ln: 'Williams',
      clinic: 'Careline Clinic',
      img: "url('/assets/images/people/caretakers/taylorwilliams.jpg')"
    }
  }

  public async addUser(data: any) {
    
  }

  public async editUser(data: any) {
    
  }

  public async deleteUser(data: any) {
    
  }
}
