## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Run app with development builds

Ref: https://docs.expo.dev/workflow/continuous-native-generation/

Use the following commands to generate the development builds. The output of this command will be two directores, one for android and on for ios.

```
npx expo prebuild --platform ios
npx expo prebuild --platform android
```

or

```
npx expo prebuild --platform android --clean
npx expo prebuild --platform ios --clean
```

Run the native builds for each platform accordingly

```
npx expo run:android
npx expo run:ios
```

You will notice, that the app shows app as a stand alone app on the ios/android phone, and is not an expo app.
