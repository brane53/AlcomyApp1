/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../account/shared/account.ts" />
/// <reference path="../../../shared/interfaces/generics.ts" />

namespace alcomy {
  export namespace user {

    export interface IUser extends alcomy.generics.IPerson {
      firstName: string;
      lastName: string;
      email?: string;
      password?: string;
      photoUrl?: string;
      accountId?: string;
    }

    export interface IUserService {
			createUser(user: alcomy.user.IUser): ng.IPromise<IUser>;
      getCurrentUser(): ng.IPromise<IUser>;
      setCurrentUser(id: string);
      clearCurrentUser(): void;

		}
    
  }
}