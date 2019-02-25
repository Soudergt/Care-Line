import { getManager } from "typeorm";
import { User } from "server/entities/user";

export class UserService {
  public async getUsers() {
    const userRepository = getManager().getRepository(User);

    const users = await userRepository.find();

    return users;
  }

  public async getUser(params: {uid: string}) {
    return {
      name: 'Test'
    }
  }

  public async addUser(data: any) {
    
  }

  public async editUser(data: any) {
    
  }

  public async deleteUser(data: any) {
    
  }
}
