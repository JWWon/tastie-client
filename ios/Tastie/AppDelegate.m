/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
// @react-native-firebase/app
#import <Firebase.h>
// facebook sdk
#import <FBSDKCoreKit/FBSDKCoreKit.h>
// google signin
#import <RNGoogleSignin/RNGoogleSignin.h>
// react-native-maps
#import <GoogleMaps/GoogleMaps.h>

static NSString *const CUSTOM_URL_SCHEME = @"me.tastie.client";

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // react-native-maps
  [GMSServices provideAPIKey:@"AIzaSyDLmOhK6SHdZtgb6X1PW9zAHJUzldi2_7I"];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Tastie"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // @react-native-firebase/app
  [FIROptions defaultOptions].deepLinkURLScheme = CUSTOM_URL_SCHEME;
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  BOOL handled = NO;
  
  FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
  
  if (dynamicLink) {
    if (dynamicLink.url) {
      handled = [RCTLinkingManager application:application openURL:dynamicLink.url options:options];
      // || [[RNFirebaseLinks instance] application:application openURL:dynamicLink.url options:options];
      }
  }
                 
  if (!handled) {
    handled =
      // Facebook
      [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]
      // Google
      || [RNGoogleSignin application:application openURL:url options:options]
      // Firebase Dynamic Links
      || [RCTLinkingManager application:application openURL:url options:options];
  }
  
  return handled;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Univeral Link (Firebase DeepLinks)
- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 BOOL handled = [[FIRDynamicLinks dynamicLinks]
     handleUniversalLink:userActivity.webpageURL
     completion:^(FIRDynamicLink * _Nullable dynamicLink,
     NSError * _Nullable error) {
  if (!error) {
    [RCTLinkingManager application:application openURL:dynamicLink.url options:nil];
    // [[RNFirebaseLinks instance] application:application openURL:dynamicLink.url options:nil];
  }
 }];
  
 if(!handled) {
   handled = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
 }
  
 return handled;
}

@end
