namespace alcomy {
  
  export namespace account {



    export interface IPerson {
      firstName: string;
      middleName?: string;
      lastName: string;
    }

    export interface IUser extends IPerson {
      email: string;
      password: string;
      photoUrl?: string;
      accountId?: string;
    }

    export interface ICompany {
      name: string;
    }

    export interface IAccountService {
      createAccount(user: IUser, company: ICompany);
    }

  }

}