export class UserService {
  public getUser(uid: string) {
    if (uid === '1') {
      return {
        fn: 'Taylor',
        ln: 'Williams',
        username: 'tay',
        password: '1234'
      }
    } else {
      return {
        fn: 'Garrett',
        ln: 'Souders',
        username: 'tay',
        password: '1234'
      };
    }
  }
}
