//
//  ClimateAppModuleProvider.m
//  Climate
//
//  Created by Ye Yint Ko Ko on 25/12/25.
//

#import <Foundation/Foundation.h>
#import <ClimateAppModuleSpec/ClimateAppModuleSpec.h>
#import <React/RCTBridgeModule.h>
#import <ReactCommon/RCTTurboModule.h>
#import "Climate-Swift.h"

@interface ClimateAppModuleProvider : NSObject <RCTModuleProvider>
@end

@implementation ClimateAppModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  facebook::react::ObjCTurboModule::InitParams initParams = params;
  initParams.instance = [ClimateAppModule new];
  initParams.isSyncModule = false;
  initParams.shouldVoidMethodsExecuteSync = false;

  return std::make_shared<facebook::react::ObjCTurboModule>(initParams);
}

@end
