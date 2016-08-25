/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
  export namespace shared {

    class FormDividerController {
      title: string;
      constructor(){

      }
    }

    angular
      .module('formDivider')
      .component('asFormDivider', {
        template: `
        <div>{{$ctrl.title}}</div>
        
        `,
				controller: FormDividerController,
        bindings: {
          title: '@'
        }
      });
  }
}