export class PatientService {
  public getPatients(params: {uid: number}) {
    return {
      name: 'Betty'
    };
  }

  public getPatient(params: {id: number}) {
    if (params.id === 1) {
      return { id: 1, name: 'Cathy', img: 'url(/src/assets/images/people/cathy.jpg)'};
    } else if (params.id === 2) {
      return { id: 2, name: 'Bobby', img: 'url(/src/assets/images/people/bobby.jpg)' };  
    } else if (params.id === 3) {
      return { id: 3, name: 'Tammy', img: 'url(/src/assets/images/people/brenda.jpg)'};
    } else if (params.id === 4) {
      return { id: 4, name: 'Frank', img: 'url(/src/assets/images/people/frank.jpg)' };
    } else if (params.id === 6) {
      return { id: 6, name: 'George', img: 'url(/src/assets/images/people/george.jpg)'}
    } else if (params.id === 7) {
      return { id: 7, name: 'Patrick', img: 'url(/src/assets/images/people/patrick.jpg)'}
    } else if (params.id === 8) {
      return { id: 8, name: 'Duke', img: 'url(/src/assets/images/people/duke.jpg)'};
    }
  }

}
