# Mobile Application of 'Tastie'

> last update : 2020.03.15

## Demonstration 

https://www.youtube.com/watch?v=9-5IoSJVm_w

## How to start

1. Ask `@Jiwoon Won` to give permission of project
2. Clone project

```bash
$ git clone git@gitlab.com:tastie/tastie-client.git
```

3. Import `env.ts` and save on `src/utils` (Ask `@Jiwoon Won`)
4. Download packages

```bash
$ cd tastie-client
$ yarn install
# for xcode
$ cd ios
$ pod install
$ cd ..
```

5. Start emulator

```bash
$ yarn start
# open another bash shell

# if you want to run ios
$ yarn ios
# if you want to run android
$ yarn android
```

### Optional

#### How to debug Firebase Analytics

Set `setAnalyticsCollectionEnabled(true)` on `@navigations/index.ts`

- For iOS

```bash
$ open ios/Tastie.xcworkspace

# Press Run (Make sure schema is in debug mode)
```

- For android

```bash
$ yarn android
$ yarn firebase-debug
# if you want to stop debug
$ yarn firebase-stop
```

## How to deploy

### iOS

https://docs.fastlane.tools/getting-started/ios/appstore-deployment/

> CREATE RELEASE AUTOMATICALLY

### Android

1. Set password on keychain access (for macOS) [Google Docs](https://docs.google.com/document/d/1mx7DgIPbfvOTDKyMyQ2hBDUfcssO3wagtNzMwWqQ7oc/edit#)
2. Download `tastie-release.keystore`, `app-*.json` and place it on `~/android/app` [Google Drive](https://drive.google.com/drive/u/0/folders/1FtT6fO7f0NCUO48vvVGaSEFQhemA1XgJ)
3. Generate Release AAB(Android App Bundle)

https://docs.fastlane.tools/getting-started/android/release-deployment/

> CREATE RELEASE AUTOMATICALLY

```bash
$ cd android
# for generate Android App Bundle
$ ./gradlew bundleRelease
# for generate APK
$ ./gradlew app:assembleRelease
```

> GENERATE FILE MANUALLY

## Notice

1. Project is following `git-flow`, `atomic design` pattern.

2. This project requires 'macOS' to run and deploy iOS & Android project.
