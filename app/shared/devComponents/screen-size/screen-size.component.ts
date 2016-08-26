/// <reference path="../../../../typings/index.d.ts" />


namespace alcomy {
  export namespace shared {
    export namespace devComponents {
      class screenSizeController {
        constructor(){}
      }

      angular
        .module('screenSize')
        .component('screenSize', {
          template: 
          `
          <span hide show-xs>X-SMALL</span>
          <span hide show-sm>SMALL</span>
          <span hide show-md>MEDIUM</span>
          <span hide show-lg>LARGE</span>
          <span hide show-gt-lg>X-LARGE</span>
          `,
          controller: screenSizeController
        });


    }
  }
}