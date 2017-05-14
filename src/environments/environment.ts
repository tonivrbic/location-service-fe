// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD-R3PbukFn_T4zNSSRkKUaRZyGxYFYRMY',
    authDomain: 'maps-e8b5a.firebaseapp.com',
    databaseURL: 'https://maps-e8b5a.firebaseio.com',
    projectId: 'maps-e8b5a',
    storageBucket: 'maps-e8b5a.appspot.com',
    messagingSenderId: '599497429884'
  }
};
