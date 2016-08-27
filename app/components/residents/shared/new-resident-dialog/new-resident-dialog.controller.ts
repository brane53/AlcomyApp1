/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../residents.ts" />
import Residents = alcomy.residents;
namespace alcomy {
  export namespace residents {
    export class NewResidentDialogController {
      static $inject: Array<string> = ['$log', '$mdDialog', '$firebaseAuth', 'addressService'];
      resident: Residents.IResident;
      residentPhoto: string;
      residentCroppedPhoto: string;
      genderOptions: Array<string>;

      insurance: Object;

      today: Date;
      states: Array<Object>;

      whiteframe: number;


      constructor(
        private $log: ng.ILogService,
        private $mdDialog: ng.material.IDialogService,
        private $firebaseAuth,
        private addressService){
          


        this.resident = {
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '' // must be a string to save to firebase
        };
        this.residentPhoto = '';
        this.residentCroppedPhoto = '';
        this.genderOptions = ['male', 'female'];

        this.insurance = {
          policyholderName: '',
          policyIdNumber: '',
          groupNumber: '',
          provider: {
            name: '',
            address: {
              street: '',
              city: '',
              state: '',
              zipcode: ''
            },
            phone: ''
          }
        }

        this.whiteframe = 3;
        this.today = new Date();
        this.states = this.addressService.states;       

      }


      submitResident(resident) {
        resident.dateOfBirth = resident.dateOfBirth.getTime();
        this.$mdDialog.hide(resident);
      }

      deletePhoto() {
        this.residentPhoto = '';
        //this.residentCroppedPhoto = '';
      }

      cancel(){
        this.$mdDialog.cancel();
      }

      setWhiteframe(number){
        this.whiteframe = number;
      }
    }

  }
}