/// <reference path="../../account/shared/account.ts" />
/// <reference path="../../../shared/interfaces/generics.ts" />

namespace alcomy {
  export namespace user {

    export interface IUser extends alcomy.generics.IPerson {
      email: string;
      password: string;
      photoUrl?: string;
      accountId?: string;
    }

    export interface IUserService {
			createUser(user: alcomy.user.IUser);
		}
    
  }
}