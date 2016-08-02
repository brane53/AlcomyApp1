/// <reference path="../../../shared/interfaces/generics.ts" />

namespace alcomy {
  export namespace facility {
    export interface IFacility {
      name?: string;
      displayName?: string;
      physicalAddress?: alcomy.generics.IAddress;
      mailingAddress?: alcomy.generics.IAddress;
      facilityNumber?: string;
      capacity?: number;

    }
  }
}