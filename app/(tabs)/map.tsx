import {
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold,
} from "@expo-google-fonts/barlow-semi-condensed";
import {
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
} from "@expo-google-fonts/noto-serif";
import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from "@expo-google-fonts/roboto";
import {
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
} from "@expo-google-fonts/source-serif-pro";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Callout, Marker, Polygon } from "react-native-maps";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
// Removed BottomSheet imports:
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

type Coordinate = [number, number];
type floor = [string, string?, string?, string?, string?, string?];
interface MapFeature {
  name: string;
  polygon: Coordinate[];
  marker: Coordinate;
  iconNeed: boolean;
  textNeed?: boolean;
  iconName?: string;
  markerText?: string;
  firstFloor?: floor;
  secondFloor?: floor;
  thirdFloor?: floor;
  layoutNeed?: boolean;
  image?: string;
}
interface MapDataResponse {
  mapData: MapFeature[];
}

const Map = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [intrestPoint, setIntrestPoint] = useState<string>("");

  // State for managing the Modal visibility
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const [mapData, setMapData] = useState<MapDataResponse>(
    require("@/assets/json/mapdata.json"),
  );

  const icons = {
    gym: require("@/assets/images/gym.png"),
    marker: require("@/assets/images/map-marker.png"),
    library: require("@/assets/images/library.png"),
    cafe: require("@/assets/images/cafe.png"),
    band: require("@/assets/images/band.png"),
    whs: require("@/assets/images/whs-icon.png"),
    campusMap: require("@/assets/images/whs-campus-map.png"),
    // add more as needed
  };

  const [location, setLocation] = useState({
    latitude: 21.3888,
    longitude: -157.9923,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    }, []),
  );

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider className="flex-1 justify-center items-center bg-white">
        <SafeAreaView className="flex-row bg-[#0b0b49] h-28 z-30 pt-28 w-full">
          <ActivityIndicator size="large" color="#0b0b49" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider className="flex-col">
      <SafeAreaView className="flex-row bg-[#0b0b49] h-28 z-30 pt-28">
        <Image
          source={require("@/assets/images/whs-logo.png")}
          className="w-32 h-32 relative bottom-28 left-11"
        />
        <SafeAreaView className="w-48 h-28 bottom-36 left-14 items-start">
          <Text className="text-white font-barlow-semibold">MY VOICE</Text>
          <Text className="text-white ml-5 font-barlow-semibold"> MY CHOICE</Text>
          <Text className="text-white ml-12 font-barlow-semibold"> MY FUTURE</Text>
        </SafeAreaView>
      </SafeAreaView>
      <View className="justify-center items-center bg-whs-gold ">
        <TouchableOpacity
          className="w-10 h-10 left self-start pt-3 z-30"
          onPress={() => router.push("/")}
        >
          <Image
            source={require("@/assets/images/back.png")}
            style={{
              tintColor: "#0b0b49",
            }}
            className="size-10 self-center"
          />
        </TouchableOpacity>
        <Text className="z-20 font-barlow-semibold text-white w-full bg-whs-gold text-center relative bottom-5">
          Campus Map 2025-2026
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center ">
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%", zIndex: 20 }}
          region={location}
          initialCamera={{
            center: {
              latitude: 21.38912945,
              longitude: -157.99326913,
            },
            pitch: 80,
            heading: 180,
            altitude: 150,
            zoom: 17,
          }}
          cameraZoomRange={{
            maxCenterCoordinateDistance: 1300,
            minCenterCoordinateDistance: 100,
          }}
          mapType="standard"
          userInterfaceStyle="dark"
        >
          {mapData.mapData.map((feature, index) => (
            <React.Fragment key={index}>
              <Polygon
                fillColor="#00008050"
                strokeColor="#ae8c52"
                strokeWidth={1}
                coordinates={feature.polygon.map((coord) => ({
                  latitude: coord[0],
                  longitude: coord[1],
                }))}
              />
              <Marker
                coordinate={{
                  latitude: feature.marker[0],
                  longitude: feature.marker[1],
                }}
                title={feature.name}
                description=""
                onPress={() => {
                  if (
                    feature.layoutNeed === true &&
                    feature.name != "Waipahu High Campus Map"
                  ) {
                    setIntrestPoint(feature.name);
                    setIsSheetVisible(true);
                  }
                }}
              >
                <View className="items-center ">
                  {feature.iconNeed ? (
                    <>
                      {feature.textNeed && (
                        <Text className="text-center justify-center self-center text-[#ffffff] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-barlow-semibold text-base">
                          {feature.markerText}
                        </Text>
                      )}
                      <Image
                        source={icons[feature.iconName as keyof typeof icons]}
                        style={{ width: 15, height: 15, tintColor: "#ffffff" }}
                        resizeMode="contain"
                      />
                    </>
                  ) : (
                    <Text className="text-center justify-center self-center text-[#ffffff] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-barlow-semibold text-base">
                      {feature.markerText}
                    </Text>
                  )}
                </View>

                <Callout tooltip={true}>
                  <View className="flex flex-col items-center bg-white p-1 rounded-lg shadow-lg border border-gray-300 text-nowrap w-32">
                    <Text className="font-barlow-semibold text-xs mb-1 text-gray-800 w-30">
                      {feature.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            </React.Fragment>
          ))}
        </MapView>
        <TouchableOpacity
          className="w-5 h-5 self-center justify-center absolute bottom-14 z-50"
          onPress={() => {
            setIntrestPoint("Waipahu High Campus Map");
            setIsSheetVisible(true);
          }}
        >
          <Image
            source={require("@/assets/images/whs-icon.png")}
            style={{
              tintColor: "#ffffff",
            }}
            className="size-10 self-center"
          />
        </TouchableOpacity>

        {/* The new Modal-based bottom sheet code */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSheetVisible}
          onRequestClose={() => {
            setIsSheetVisible(!isSheetVisible);
          }}
        >
          {/* Dimmed background area that closes the sheet when tapped */}
          <TouchableOpacity
            className="flex-1 justify-end items-center bg-black/1"
            activeOpacity={1}
            onPressOut={() => setIsSheetVisible(false)}
          >
            {/* The actual bottom sheet content container */}
          </TouchableOpacity>
          <View className="w-full bg-white rounded-t-2xl p-4 shadow-2xl">
            <ScrollView>
              {mapData.mapData
                .filter((feature) => feature.name === intrestPoint) // only render the clicked feature
                .map((feature, index) =>
                  feature.layoutNeed &&
                  feature.name !== "Waipahu High Campus Map" ? (
                    <View key={index} className="mb-4">
                      <Text className="mb-4 text-xl font-bold text-gray-800 text-center font-source-serif-italic">
                        {feature.name}
                      </Text>
                      <View className="self-center items-center w-[80vw]">
                        {feature.thirdFloor && (
                          <View className="flex-row items-center justify-start">
                            {(feature.thirdFloor ?? []).map((room, idx) => (
                              <Text
                                key={idx}
                                className={`
                                                text-gray-700 text-[0.5rem] text-center
                                                text-nowrap border-2 border-black self-center p-2 bg-gray-300
                                                `}
                                style={{
                                  width:
                                    (width * (80 / 100)) /
                                    (feature.thirdFloor?.length ?? 1),
                                }}
                              >
                                {room}
                              </Text>
                            ))}
                          </View>
                        )}

                        {feature.secondFloor && (
                          <View className="flex-row flex-wrap justify-around flex-1">
                            {(feature.secondFloor ?? []).map((room, idx) => (
                              <Text
                                key={idx}
                                className={`
                                                text-gray-700 text-[0.5rem] text-center
                                                text-nowrap border-2 border-black self-center pt-2 pb-2 pl-1 pr-1 bg-gray-200
                                                `}
                                style={{
                                  width:
                                    (width * (80 / 100)) /
                                    (feature.secondFloor?.length ?? 1),
                                }}
                              >
                                {room}
                              </Text>
                            ))}
                          </View>
                        )}

                        {feature.firstFloor && (
                          <View className="flex-row items-center justify-start self-center">
                            {(feature.firstFloor ?? []).map((room, idx) => (
                              <Text
                                key={idx}
                                className={`
                                                text-gray-700 text-[0.5rem] text-center
                                                border-2 border-black self-center pt-2 pb-2 pl-1 pr-1
                                                `}
                                style={{
                                  width:
                                    (width * (80 / 100)) /
                                    (feature.firstFloor?.length ?? 1),
                                }}
                              >
                                {room}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>
                  ) : feature.name === "Waipahu High Campus Map" ? (
                    <View key={index} className="mb-4">
                      <Text className="mb-4 text-xl font-bold text-gray-800 text-center font-source-serif-italic">
                        {feature.name}
                      </Text>
                      <Image
                        source={icons[feature.image as keyof typeof icons]}
                        className="w-[80vw] h-[15vh] self-center"
                      />
                    </View>
                  ) : null,
                )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

export default Map;
