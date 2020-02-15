# Mobile Application of 'Tastie'

> last update : 2020.02.15

## How to start

1. Ask `@Jiwoon Won` to give permission of project
2. Clone project

```bash
$ git clone git@gitlab.com:tastie/tastie-client.git
```

3. Download packages

```bash
$ cd tastie-client

# if you use npm
$ npm install
# else if you use yarn
$ yarn install

$ cd ios
$ pod install
$ cd ..
```

4. Start emulator

```bash
$ npm start
# open another bash shell

# if you want to run ios
$ npm run ios
# if you want to run android
$ npm run android
```

## How to deploy

### Android

1. Set password on keychain access (for macOS) [Google Docs](https://docs.google.com/document/d/1mx7DgIPbfvOTDKyMyQ2hBDUfcssO3wagtNzMwWqQ7oc/edit#)
2. Download `tastie-release.keystore` and place it on `~/android/app` [Google Drive](https://drive.google.com/drive/u/0/folders/1FtT6fO7f0NCUO48vvVGaSEFQhemA1XgJ)
3. Generate Release APK

```bash
$ cd android
# for generate Android App Bundle
$ ./gradlew bundleRelease
# for generate APK
$ ./gradlew assembleRelease
```

## Notice

1. Project is following `git-flow`, `atomic design` pattern.

2. This project requires 'macOS' to run and deploy iOS & Android project.