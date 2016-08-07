/// <reference path="../typings/index.d.ts" />
/// <reference path="components/user/shared/user.ts" />


namespace alcomy {
	'use strict';

	angular
		.module('alcomyApp')
		.config(config)
		.value('$routerRootComponent', 'alcomyApp')
		.run(run);

	////////////////// RUN BLOCK FUNCTION //////////////////////////////

	run.$inject = ['$log', '$rootScope', '$rootRouter', '$mdDialog', 'Idle', '$firebaseAuth', 'userService'];
	/* @ngInject */
	function run(
		$log: ng.ILogService, 
		$rootScope: ng.IRootScopeService, 
		$rootRouter, 
		$mdDialog: angular.material.IDialogService, 
		Idle, 
		$firebaseAuth,
		userService: alcomy.user.IUserService): void {

		$log.info('AlcomyApp Module - run block is running')

		var alert: angular.material.IAlertDialog | angular.material.IPromptDialog;

		// User gets redirected to the login screen if they they become unauthenticated
		$firebaseAuth().$onAuthStateChanged(authData => {
			if (!authData) {
				$rootRouter.navigate(['Login']);
				userService.clearCurrentUser();
				Idle.unwatch();
				

			} else {
				Idle.watch();
			}

		});

		// A dialog appears informing the user that they are about to be logged out
		$rootScope.$on('IdleStart', () => {
			$log.warn('You are Idling');
			// Configure the alert
			alert = $mdDialog.alert()
				.title('Session About to Expire')
				.textContent("You have been idle for a long time and your session is" +
				             " about to expire. Do something if you don't want that to happen")
				.ok('Ok');
			// Display the alert and delete it once closed
			$mdDialog.show(alert).finally(() => {
				alert = undefined;
			});
		});

		// Signs user out and alerts them that they were signed out
		$rootScope.$on('IdleTimeout', () => {
			$mdDialog.cancel('Session Expired');
			// Sign out user
			$firebaseAuth().$signOut();
			// Configure alert
			alert = $mdDialog.prompt()
				.title('Session Expired')
				.textContent('Your session has timed out. Please press continue and' +
				             ' log back in')
				.ok('Continue')
				.cancel('Cancel');
			// Display alert and delete alert once closed
			$mdDialog.show(alert).finally(() => {
				alert = undefined;
			});

			$log.warn('You are timed out!');
		});

	}

/////////////////////// CONFIG BLOCK /////////////////////////////


	config.$inject = [
		'$mdThemingProvider',
		'$mdIconProvider',
		'$locationProvider',
		'IdleProvider'
	];
	/* @ngInject */
	function config(
		$mdThemingProvider: angular.material.IThemingProvider, 
		$mdIconProvider: angular.material.IIconProvider, 
		$locationProvider: ng.ILocationProvider,
	  IdleProvider): void {
		// TODO make sure you pre-load and cache the icons
		// see: https://material.angularjs.org/latest/api/service/$mdIconProvider
		$mdIconProvider.defaultIconSet('app/assets/svg/icons.svg', 24);
		/*.icon("photo"                , "./app/assets/svg/ic_add_a_photo_24px.svg", 24)
		 .icon("add"                   , "./app/assets/svg/ic_add_black_24px.svg", 24)
		 .icon("add-circle"   , "./app/assets/svg/ic_add_circle_black_24px.svg", 24)
		 .icon("add-circle-outline"    , "./app/assets/svg/ic_add_circle_outline_black_24px.svg", 24)
		 .icon("arrow"                 , "./app/assets/svg/ic_arrow_back_black_24px.svg", 24)
		 .icon("assessment"            , "./app/assets/svg/ic_assessment_black_24px.svg", 24)
		 .icon("assignment-turned-in"  ,"./app/assets/svg/ic_assignment_turned_in_black_24px.svg", 24)
		 .icon("attach-file"           , "./app/assets/svg/ic_attach_file_black_24px.svg", 24)
		 .icon("attachment"            , "./app/assets/svg/ic_attachment_black_24px.svg", 24)
		 .icon("chat"                  , "./app/assets/svg/ic_chat_black_24px.svg", 24)
		 .icon("chevron-left"          , "./app/assets/svg/ic_chevron_left_black_24px.svg", 24)
		 .icon("chevron-right"         , "./app/assets/svg/ic_chevron_right_black_24px.svg"        , 24)
		 .icon("comment"               , "./app/assets/svg/ic_comment_black_24px.svg"        , 24)
		 .icon("delete"                , "./app/assets/svg/ic_delete_black_24px.svg"        , 24)
		 .icon("description"           , "./app/assets/svg/ic_description_black_24px.svg"        , 24)
		 .icon("edit"                  , "./app/assets/svg/ic_edit_black_24px.svg"        , 24)
		 .icon("error"                 , "./app/assets/svg/ic_error_black_24px.svg"        , 24)
		 .icon("error-outline"         , "./app/assets/svg/ic_error_outline_black_24px.svg"        , 24)
		 .icon("event"                 , "./app/assets/svg/ic_event_black_24px.svg"        , 24)
		 .icon("favorite"              , "./app/assets/svg/ic_favorite_black_24px.svg"        , 24)
		 .icon("favorite-border"       , "./app/assets/svg/ic_favorite_border_black_24px.svg"        , 24)
		 .icon("feedback"              , "./app/assets/svg/ic_feedback_black_24px.svg"        , 24)
		 .icon("flag"                  , "./app/assets/svg/ic_flag_black_24px.svg"        , 24)
		 .icon("get-app"               , "./app/assets/svg/ic_get_app_black_24px.svg"        , 24)
		 .icon("history"               , "./app/assets/svg/ic_history_black_24px.svg"        , 24)
		 .icon("image"                 , "./app/assets/svg/ic_image_black_24px.svg"        , 24)
		 .icon("insert-comment"        , "./app/assets/svg/ic_insert_comment_black_24px.svg"        , 24)
		 .icon("insert-link"           , "./app/assets/svg/ic_insert_link_black_24px.svg"        , 24)
		 .icon("local-hospital"        , "./app/assets/svg/ic_local_hospital_black_24px.svg"        , 24)
		 .icon("menu"                  , "./app/assets/svg/ic_menu_24px.svg"        , 24)
		 .icon("message"               , "./app/assets/svg/ic_message_black_24px.svg"        , 24)
		 .icon("more-horizontal"       , "./app/assets/svg/ic_more_horiz_black_24px.svg"        , 24)
		 .icon("more-vertical"         , "./app/assets/svg/ic_more_vert_black_24px.svg"        , 24)
		 .icon("note-add"              , "./app/assets/svg/ic_note_add_black_24px.svg"        , 24)
		 .icon("people"                , "./app/assets/svg/ic_people_black_24px.svg"        , 24)
		 .icon("person-add"            , "./app/assets/svg/ic_person_add_black_24px.svg"        , 24)
		 .icon("photo-library"         , "./app/assets/svg/ic_photo_library_black_24px.svg"        , 24)
		 .icon("pie-chart"             , "./app/assets/svg/ic_pie_chart_black_24px.svg"        , 24)
		 .icon("print"                 , "./app/assets/svg/ic_print_black_24px.svg"        , 24)
		 .icon("remove-circle"         , "./app/assets/svg/ic_remove_circle_black_24px.svg"        , 24)
		 .icon("remove-circle-outline" , "./app/assets/svg/ic_remove_circle_outline_black_24px.svg"        , 24)
		 .icon("schedule"              , "./app/assets/svg/ic_schedule_black_24px.svg"        , 24)
		 .icon("send"                  , "./app/assets/svg/ic_send_black_24px.svg"        , 24)
		 .icon("settings"              , "./app/assets/svg/ic_settings_black_24px.svg"        , 24)
		 .icon("thumb-down"            , "./app/assets/svg/ic_thumb_down_black_24px.svg"        , 24)
		 .icon("thumb-up"              , "./app/assets/svg/ic_thumb_up_black_24px.svg"        , 24)
		 .icon("visibility"            , "./app/assets/svg/ic_visibility_black_24px.svg"        , 24)
		 .icon("warning"               , "./app/assets/svg/ic_warning_black_24px.svg"        , 24)
		 .icon("watch-later"           , "./app/assets/svg/ic_watch_later_black_24px.svg"        , 24);*/


		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('light-green', {
				'default': '500'
			});

		$mdThemingProvider.theme('neutral')
			.primaryPalette('grey', {
				'default': '500',
				'hue-1': '50',
				'hue-2': '300',
				'hue-3': '800'
			})
			.accentPalette('blue-grey', {
				'default': '500',
				'hue-1': '100',
				'hue-2': '300',
				'hue-3': '800'
			});

		// Sets the number of seconds of inactivity
		// until the idle event is triggered
		IdleProvider.idle(300);

		// Sets the number os sections of inactivity after the idle event is 
		// triggered until the timeout event is triggered
		IdleProvider.timeout(30);

		$locationProvider.html5Mode(true);
	}

};