# NgDemoIrishTrainCheck
This started as a job test... and was built while taking the train itself...
Why always go on the website to know when your specific train will be there... Why not have it say it to you directly on enter.
Based on API Irish Rail API: http://api.irishrail.ie/realtime/

## TODO:
- localStorage to save station preference -> Station data don't change often (reduce API call).
- If local preference then fetch on enter.
- Multiple station: Click to add or remove station from the local list.
- Secure HTTPS to be able to use GEO cash data instead of clicking/typing in the item it can tell us directly.
- Add a auto complete form selector.

## Development server
To run it we need a Server to do the API call & the frontend.
run $ npm run server -> will get the node API on port 3002.
Run $ ng serve -> for a dev server. Navigate to `http://localhost:4200/`.

## Build
Run `ng build --prod`

## AWS Distribution
- Install forever
- Import the respository
- $ npm install
- $ ng build --prod
- $ forever start -o out.log -e err.log bin/www

## Test
Well The UI still change a lot... but I should.
