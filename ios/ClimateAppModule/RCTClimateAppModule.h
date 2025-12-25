//
//  RCTClimateAppModule.h
//  Climate
//
//  Created by Ye Yint Ko Ko on 25/12/25.
//

#import <CoreLocation/CLLocationManagerDelegate.h>
#import "ClimateAppModuleSpec/ClimateAppModuleSpec.h"

@interface RCTClimateAppModule : NSObject <NativeClimateAppModuleSpec, CLLocationManagerDelegate>

@end
