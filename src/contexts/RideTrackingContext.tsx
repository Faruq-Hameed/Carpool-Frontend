/**
 * RideTrackingContext — manages the /rides socket.io namespace for live tracking.
 *
 * Driver (isOwner + ONGOING): broadcasts location every 5s via update_location
 * Passenger (ONGOING):        receives driver_location events and updates state
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import {
  API_BASE_URL,
  ACCESS_TOKEN_STORAGE_KEY,
} from "@/utils/constants/apiConstants";

interface DriverLocation {
  latitude: number;
  longitude: number;
}

interface RideTrackingContextValue {
  /** Latest known driver location (null if not available) */
  driverLocation: DriverLocation | null;
  /** Call to start broadcasting (driver only) — no-op for passengers */
  startBroadcasting: () => void;
  /** Call to stop broadcasting (driver only) */
  stopBroadcasting: () => void;
}

const RideTrackingContext = createContext<RideTrackingContextValue>({
  driverLocation: null,
  startBroadcasting: () => {},
  stopBroadcasting: () => {},
});

/**
 * Hook for RideDetailScreen. Automatically connects when rideId + isOngoing,
 * starts broadcasting if isOwner.
 */
export function useRideTracking(
  rideId: string,
  isOwner: boolean,
  isOngoing: boolean
): RideTrackingContextValue {
  const socketRef = useRef<Socket | null>(null);
  const broadcastIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);

  const stopBroadcasting = useCallback(() => {
    if (broadcastIntervalRef.current) {
      clearInterval(broadcastIntervalRef.current);
      broadcastIntervalRef.current = null;
    }
  }, []);

  const startBroadcasting = useCallback(() => {
    if (!isOwner || !isOngoing || !socketRef.current) return;

    const socket = socketRef.current;

    const broadcast = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        socket.emit("update_location", {
          rideId,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch {
        // silently ignore location errors
      }
    };

    // Broadcast immediately then every 5s
    broadcast();
    broadcastIntervalRef.current = setInterval(broadcast, 5000);
  }, [isOwner, isOngoing, rideId]);

  useEffect(() => {
    if (!rideId || !isOngoing) return;

    let socket: Socket;

    const connect = async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (!token) return;

      // Strip trailing /api or path — socket.io connects to origin
      const origin = API_BASE_URL.replace(/\/api.*$/, "");

      socket = io(`${origin}/rides`, {
        auth: { token },
        transports: ["websocket"],
        reconnectionAttempts: 5,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("join_ride", { rideId });
      });

      socket.on("ride_joined", () => {
        if (isOwner) {
          startBroadcasting();
        }
      });

      socket.on(
        "driver_location",
        (data: { rideId: string; latitude: number; longitude: number }) => {
          if (data.rideId === rideId) {
            setDriverLocation({
              latitude: data.latitude,
              longitude: data.longitude,
            });
          }
        }
      );
    };

    connect();

    return () => {
      stopBroadcasting();
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [rideId, isOngoing, isOwner]); // eslint-disable-line react-hooks/exhaustive-deps

  return { driverLocation, startBroadcasting, stopBroadcasting };
}

export default RideTrackingContext;
