namespace alcomy {
  export namespace generics {
    
    export interface IPerson {
      firstName: string;
      middleName?: string;
      lastName: string;
    }

    export interface IAddress {
      address1: string;
      address2?: string;
      city: string;
      state: string;
      zip: string;
      country?: string
    }
  }
}