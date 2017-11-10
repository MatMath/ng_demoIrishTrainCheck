# NgDemoIrishTrainCheck

Why always go on the website to know when your specific train will be there... Why not have it say it to you directly on enter.
Based on API Irish Rail API: http://api.irishrail.ie/realtime/

TODO: localStorage to save station preference.
If local preference then fetch on enter.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## AWS Distribution
- Install forever
- Inport the respo
- $ npm install
- ng build --prod
- forever start -o out.log -e err.log bin/www


## Build
Run `ng build --prod`

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
