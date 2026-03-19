import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { RideRoutePoint } from "@/apis/rides/types";
import { Colors, Radius } from "@/theme";

interface Props {
  routePoints: RideRoutePoint[];
  /** Optional live driver location (ONGOING rides) */
  driverLocation?: { latitude: number; longitude: number } | null;
  height?: number;
}

const RouteMap: React.FC<Props> = ({
  routePoints,
  driverLocation,
  height = 220,
}) => {
  const sorted = useMemo(
    () => [...routePoints].sort((a, b) => a.orderIndex - b.orderIndex),
    [routePoints]
  );

  const coords = useMemo(
    () =>
      sorted.map((p) => ({
        latitude: Number(p.latitude),
        longitude: Number(p.longitude),
      })),
    [sorted]
  );

  const origin = sorted.find((p) => p.pointType === "START");
  const destination = sorted.find((p) => p.pointType === "END");
  const stops = sorted.filter((p) => p.pointType === "INTERMEDIATE");

  // Compute an initial region that fits all points
  const region = useMemo(() => {
    if (coords.length === 0) return undefined;
    const lats = coords.map((c) => c.latitude);
    const lngs = coords.map((c) => c.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const padding = 0.01;
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(maxLat - minLat + padding, 0.02),
      longitudeDelta: Math.max(maxLng - minLng + padding, 0.02),
    };
  }, [coords]);

  if (coords.length < 2 || !region) return null;

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
      >
        {/* Route polyline */}
        <Polyline
          coordinates={coords}
          strokeColor={Colors.primary}
          strokeWidth={4}
        />

        {/* Origin marker */}
        {origin && (
          <Marker
            coordinate={{
              latitude: Number(origin.latitude),
              longitude: Number(origin.longitude),
            }}
            pinColor={Colors.primaryMedium}
            title="Start"
            description={origin.label}
          />
        )}

        {/* Intermediate stops */}
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: Number(stop.latitude),
              longitude: Number(stop.longitude),
            }}
            pinColor="#F59E0B"
            title="Stop"
            description={stop.label}
          />
        ))}

        {/* Destination marker */}
        {destination && (
          <Marker
            coordinate={{
              latitude: Number(destination.latitude),
              longitude: Number(destination.longitude),
            }}
            pinColor="#EF4444"
            title="Destination"
            description={destination.label}
          />
        )}

        {/* Live driver location */}
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Driver"
            pinColor="#22C55E"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.md,
    overflow: "hidden",
    marginBottom: 12,
  },
});

export default RouteMap;
