import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Image, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";
import * as Location from "expo-location";
import { moderateScale } from "react-native-size-matters";
import { Subscription } from "expo-sensors/build/Pedometer";
import { Motion } from "@legendapp/motion";

export const useQiblaCompass = () => {
  const [subscription, setSubscription] = useState<Subscription | null>();
  const [magnetometer, setMagnetometer] = useState(0);
  const [qiblad, setQiblad] = useState(0);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const initCompass = useCallback(async () => {
    const isAvailable = await Magnetometer.isAvailableAsync();
    if (!isAvailable) {
      setError("Compass is not available on this device");
      setIsLoading(false);
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Location permission not granted");
      setIsLoading(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      calculate(latitude, longitude);
    } finally {
      setIsLoading(false);
      subscribe();
    }
  }, []);

  useEffect(() => {
    initCompass();

    return () => {
      unsubscribe();
    };
  }, []);

  const subscribe = () => {
    Magnetometer.setUpdateInterval(100);
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(angle(data));
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const angle = (magnetometer: MagnetometerMeasurement) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const direction = (degree: number) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "الشمال شرقي";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "شرق";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "الجنوب الشرقي";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "جنوب";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "الجنوب الغربي";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "الغرب";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "الشمال الغربي";
    } else {
      return "الشمال";
    }
  };

  const degree = (magnetometer: number) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const calculate = (latitude: number, longitude: number) => {
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda)
      );
    setQiblad(qiblad);
  };

  const compassDirection = direction(degree(magnetometer));
  const compassDegree = degree(magnetometer);
  const compassRotate = 360 - degree(magnetometer);
  const kabaRotate = 360 - degree(magnetometer) + qiblad;

  return {
    qiblad,
    compassDirection,
    compassDegree,
    compassRotate,
    kabaRotate,
    error,
    isLoading,
    reinitCompass: initCompass,
  };
};

const QiblaCompass = forwardRef<
  void,
  {
    backgroundColor: string;
    color: string;
    textStyles: any;
    compassImage?: string;
  }
>(
  (
    {
      backgroundColor = "transparent",
      color = "#000",
      textStyles = {},
      compassImage,
    },
    ref
  ) => {
    const {
      qiblad,
      compassDirection,
      compassDegree,
      compassRotate,
      kabaRotate,
      error,
      isLoading,
      reinitCompass,
    } = useQiblaCompass();

    useImperativeHandle(
      ref,
      () => {
        return {
          reinitCompass,
        };
      },
      []
    );

    if (isLoading) {
      return (
        <View style={[styles.container, { backgroundColor }]}>
          <ActivityIndicator size={50} color={color} />
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        {error && (
          <Text
            style={{
              color: "#f00",
              fontWeight: "bold",
              textAlign: "center",
              paddingHorizontal: 20,
              fontSize: moderateScale(16, 0.25),
              ...textStyles,
            }}
          >
            Error: {error}
          </Text>
        )}
        <View style={styles.direction}>
          <Text style={[styles.directionText, { color, ...textStyles }]}>
            {compassDirection}
          </Text>
          <Text
            style={[
              styles.directionText,
              {
                color:
                  compassDegree >= Math.round(qiblad - 4) &&
                  compassDegree <= Math.round(qiblad + 4)
                    ? "green"
                    : color,
                ...textStyles,
              },
            ]}
          >
            {compassDegree}°
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: moderateScale(300, 0.25),
            position: "relative",
          }}
        >
          <Motion.Image
            animate={{ rotate: compassRotate + "deg" }}
            source={compassImage || require("@/assets/images/compass.png")}
            style={[styles.image]}
          />
          <Motion.View
            animate={{ rotate: `${kabaRotate}deg` }}
            style={{
              width: moderateScale(300, 0.25),
              height: moderateScale(300, 0.25),
              position: "absolute",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              zIndex: 999,
            }}
          >
            <Image
              source={require("@/assets/images/kaba.png")}
              style={{
                resizeMode: "center",
                height: 100,
                paddingBottom: 150,
                marginTop: 20,
                width: 60,
                zIndex: 999,
              }}
            />
          </Motion.View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: 0,
    width: moderateScale(300, 0.25),
    height: moderateScale(300, 0.25),
  },
  container: {
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "70%",
  },
  direction: {
    textAlign: "center",
    zIndex: 300,
    marginBottom: 10,
  },
  directionText: {
    textAlign: "center",
    fontSize: 30,
    color: "#468773",
  },
  qiblaDirection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default QiblaCompass;
