//
//  ClimateAppModule.swift
//  Climate
//
//  Created by Ye Yint Ko Ko on 25/12/25.
//

import Foundation
import CoreLocation
import React

@objc(Geolocation)
class Geolocation: NSObject, CLLocationManagerDelegate {

  // Persistent singleton instance exposed to Objective-C
  private static let _shared: Geolocation = {
    let instance = Geolocation()
    return instance
  }()
  
  @objc(sharedInstance)
  static func sharedInstance() -> Geolocation { return _shared }

  private var locationManager: CLLocationManager!
  private var resolve: RCTPromiseResolveBlock?
  private var reject: RCTPromiseRejectBlock?
  
  private override init() {
    super.init()
    
    DispatchQueue.main.sync {
      self.locationManager = CLLocationManager()
      self.locationManager.delegate = self
      self.locationManager.desiredAccuracy = kCLLocationAccuracyBest
    }
  }

  @objc
  func getCurrentPosition(_ resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
    self.resolve = resolve
    self.reject = reject

    DispatchQueue.main.async {
      let status: CLAuthorizationStatus
      if #available(iOS 14.0, *) {
        status = self.locationManager.authorizationStatus
      } else {
        status = CLLocationManager.authorizationStatus()
      }

      if status == .notDetermined {
        self.locationManager.requestWhenInUseAuthorization()
        return
      }

      if status == .authorizedWhenInUse || status == .authorizedAlways {
        self.locationManager.requestLocation()
      } else {
        self.reject?("E_LOCATION_PERMISSION", "Location permission denied", nil)
        self.clearCallbacks()
      }
    }
  }
  
  func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
    let status = manager.authorizationStatus
    if status == .authorizedWhenInUse || status == .authorizedAlways {
      manager.requestLocation()
    } else if status == .denied || status == .restricted {
      reject?("E_LOCATION_PERMISSION", "Location permission denied", nil)
      clearCallbacks()
    }
  }

  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    guard let location = locations.first else { return }
    let data: [String: Any] = [
      "latitude": location.coordinate.latitude,
      "longitude": location.coordinate.longitude
    ]
    resolve?(data)
    locationManager.stopUpdatingLocation()
    clearCallbacks()
  }

  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    reject?("E_LOCATION_FAILED", "Failed to get location", error)
    clearCallbacks()
  }

  func clearCallbacks() {
    resolve = nil
    reject = nil
  }
}
