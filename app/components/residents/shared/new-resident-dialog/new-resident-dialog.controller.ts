/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../residents.ts" />
import Residents = alcomy.residents;
namespace alcomy {
  export namespace residents {
    export class NewResidentDialogController {
      static $inject: Array<string> = ['$log', '$mdDialog', '$firebaseAuth'];
      resident: Residents.IResident;
      residentPhoto: string;
      residentCroppedPhoto: string;
      genderOptions: Array<string>;
      today: Date;


      constructor(
        private $log: ng.ILogService,
        private $mdDialog: ng.material.IDialogService,
        private $firebaseAuth){

        this.residentPhoto = '';
        this.residentCroppedPhoto = '';
        this.today = new Date;

        this.resident = {
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '' // must be a string to save to firebase
        };

        this.genderOptions = ['male', 'female'];

      }


      submitResident(resident) {
        resident.dateOfBirth = resident.dateOfBirth.getTime();
        this.$mdDialog.hide(resident);
      }

      cancel(){
        this.$mdDialog.cancel();
      }
    }

  }
}