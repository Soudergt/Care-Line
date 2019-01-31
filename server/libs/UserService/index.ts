import { getManager } from "typeorm";
import { User } from "server/entities/user";

export class UserService {
  public async getUsers() {
    const userRepository = getManager().getRepository(User);

    const users = await userRepository.find();

    return users;
  }

  public async getUser(uid: string) {    
    return {
      name: 'Test'
    }
  }

  public addUser(data: any) {

  }
}
