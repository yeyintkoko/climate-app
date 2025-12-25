//
//  RCTClimateAppModule.m
//  Climate
//
//  Created by Ye Yint Ko Ko on 25/12/25.
//
#ifdef RCT_NEW_ARCH_ENABLED
#import "RCTClimateAppModule.h"
#import "Climate-Swift.h"

@implementation RCTClimateAppModule

- (void)getCurrentPosition:(RCTPromiseResolveBlock)resolve
                    reject:(RCTPromiseRejectBlock)reject
{
  [[Geolocation sharedInstance] getCurrentPosition:resolve rejecter:reject];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeClimateAppModuleSpecJSI>(params);
}

+ (NSString *)moduleName {
  return @"ClimateAppModule";
}

@end

#else

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Geolocation, NSObject)
  RCT_EXTERN_METHOD(getCurrentPosition:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end

#endif
