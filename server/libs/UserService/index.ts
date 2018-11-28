export class UserService {
  public getUser(uid: string) {
    if (uid === '1') {
      return {
        fn: 'Taylor',
        ln: 'Williams',
        clinic: 'CareLine Clinic'
      }
    } else {
      return {
        fn: 'Garrett',
        ln: 'Souders',
        clinic: 'CareLine Clinic'
      };
    }
  }
}
