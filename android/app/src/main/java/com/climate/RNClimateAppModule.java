package com.climate;

import android.Manifest;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

import java.util.Objects;

public class RNClimateAppModule extends NativeClimateAppModuleSpec {
    public static final String NAME = "ClimateAppModule";
    private final FusedLocationProviderClient fusedClient;

    public RNClimateAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        fusedClient = LocationServices.getFusedLocationProviderClient(reactContext);
    }

    @Override
    public void getCurrentPosition(Promise promise) {
        try {

            if (ActivityCompat.checkSelfPermission(this.getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this.getReactApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                Objects.requireNonNull(this.getReactApplicationContext().getCurrentActivity()).requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 1);
                promise.reject("LOCATION_ERROR", "Location permission not granted");
                return;
            }

            fusedClient
                    .getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY,
                            null
                    )
                    .addOnSuccessListener(location -> {
                        if (location != null) {
                            WritableMap map = Arguments.createMap();
                            map.putDouble("latitude", location.getLatitude());
                            map.putDouble("longitude", location.getLongitude());
                            promise.resolve(map);
                        } else {
                            promise.reject("LOCATION_ERROR", "Location is null");
                        }
                    })
                    .addOnFailureListener(e ->
                            promise.reject("LOCATION_ERROR", e.getMessage())
                    );
        } catch (Exception e) {
            promise.reject("LOCATION_ERROR", e.getMessage());
        }
    }
}
