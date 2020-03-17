fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android increase_build_number
```
fastlane android increase_build_number
```
Increase build_number and version_number
### android test
```
fastlane android test
```
Runs all the tests
### android beta
```
fastlane android beta
```
Relase a new beta version to the Google Play
### android release
```
fastlane android release
```
Relase a new version to the Google Play

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
