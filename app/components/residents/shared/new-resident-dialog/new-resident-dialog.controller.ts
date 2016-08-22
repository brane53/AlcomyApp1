/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../residents.ts" />
import Residents = alcomy.residents;
namespace alcomy {
  export namespace residents {
    export class NewResidentDialogController {
      static $inject: Array<string> = ['$log', '$mdDialog', '$firebaseAuth'];
      resident: Residents.IResident;
      genderOptions: Array<string>;
      constructor(
        private $log: ng.ILogService,
        private $mdDialog: ng.material.IDialogService,
        private $firebaseAuth){
        
        this.resident = {
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: null
        };

        this.genderOptions = ['male', 'female'];

      }


      submitResident(resident) {
        this.$mdDialog.hide(resident);
      }

      cancel(){
        this.$mdDialog.cancel();
      }
    }

  }
}