(function () {
	'use strict';

	angular
		.module('login')
		.component('login', {
			templateUrl: './app/components/login/login.component.html',
			controller: LoginController,
			bindings: {
				$router: '<'
			}
		});

	LoginController.$inject = ['$log', '$location', 'firebaseRoot', '$firebaseAuth', 'userService'];
	/* @ngInject */
	function LoginController($log, $location, firebaseRoot, $firebaseAuth, userService) {
		var vm = this;

		// Firebase Root
		var fbRoot = firebase.database().ref();
		
		// Properties
		vm.newUserObj = {
			firstName: null,
			lastName: null,
			email: null,
			password: null
		};

		// TODO these need to be put into a service
		vm.isRegister = null;  // TODO this needs to be implemented correctly
		vm.isLoggedIn = null; //$firebaseAuth().isLoggedIn;    // TODO this needs to
		// beimplemented correctly
		
		// Functions
		vm.$onInit = $onInit();
		vm.$routerOnActivate = $routerOnActivate;
		vm.$routerCanDeactivate = $routerCanDeactivate;
		vm.login = login;
		vm.registerNewUser = registerNewUser;
		vm.logout = logout;
		vm.goToRegister = goToRegister;
		
		
		function $onInit(){
			console.log('url: ', $location.path());
			if($location.path() === '/login'){
				vm.isRegister = false;
			} else if($location.path() === '/register'){
				vm.isRegister = true;
			}

			console.log('$router: ', vm.$router);
			console.log('isLoggedIn', $firebaseAuth().isLoggedIn);
			vm.isLoggedIn = $firebaseAuth().isLoggedIn;
			
		}
		
		function $routerOnActivate(){
			console.log('Auth State: ', $firebaseAuth().$waitForSignIn());
			return $firebaseAuth().$waitForSignIn().then(function(state){
				console.log('state: ', state);
				vm.isLoggedIn = !!state;
			});
		}

		function $routerCanDeactivate() {
			return vm.isLoggedIn;
		}
		
		// LOGIN
		
		// TODO make this more secure. implement safeguards
		// TODO create route redirect if use is logged in
		// Calls the login function from $firebaseAuth
		function login(email, password) {

			$log.info('Email: ' + email + 'Password' + password);
			
			// $firebaseAuth().$signInWithEmailAndPassword(credentials)
			$firebaseAuth().$signInWithEmailAndPassword(email, password)
				.then(function(authData){
					if(authData){
						console.log('User id: ', authData.uid);
						/*userService.setCurrentUser(authData.uid);*/
						vm.isLoggedIn = true;
						vm.$router.navigate(['Home']);
					}
				})
				.catch(function(err){
					console.warn('Error: ' + err);
				});
		}
		
		// REGISTER
		function registerNewUser(newUserObj){
			
			// Credientials 
			var credentials = {
				email: newUserObj.email,
				password: newUserObj.password
			};

			// Create user with given credentials
			$firebaseAuth().$createUserWithEmailAndPassword(credentials)
				.then(function(userData){
					if(userData){
						return $firebaseAuth().$signInWithEmailAndPassword(credentials);
					}
				})
				.then(function(authData){
					return fbRoot.child('users').child(authData.uid).set({
						firstName: newUserObj.firstName,
						lastName: newUserObj.lastName,
						email: newUserObj.email
					})
					.then(function(data){
						console.log('Data: ', data);
						vm.isLoggedIn = true;
						vm.$router.navigate(['Home']);
					});

				})
				.catch(function(err){
					console.warn("Error: " + err);
				});
		}
		
		// LOGOUT
		/*FIX
		* if you have multiple tabs open and the Home component is already
		* loaded you can continue to navigate through the app once you logout.
		*
		* */
		function logout(){
			$firebaseAuth().$signOut();
			vm.isRegister = true;
			$firebaseAuth().$waitForSignIn()
				.then(function(state){
					vm.isLoggedIn = !!state;
				});
		}

		
		
		function goToRegister(){
			$location.path('/register');
			/*vm.$router.navigate(['Register']);*/
			vm.isRegister = true;
		}


	}

})();