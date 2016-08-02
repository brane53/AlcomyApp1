/// <reference path="../../user/shared/user.ts" />
namespace alcomy {
  export namespace account {

    export interface ICompany {
      name: string;
    }

    export interface IAccountService {
      createAccount(user: alcomy.user.IUser, company: ICompany);
    }

  }

}