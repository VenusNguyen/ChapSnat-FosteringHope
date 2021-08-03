import React, { useState, useEffect, useRef } from "react";
import Colors from "../constants/Colors";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { ListItem, Avatar } from "react-native-elements";

const LOS_ANGELES_REGION = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const [currLocation, setCurrLocation] = useState(null);
  const mapView = useRef(null);

  const bottomSheet = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrLocation(location.coords);
    })();
  }, []);

  const goToCurrLocation = () => {
    mapView?.current.animateToRegion(
      {
        latitude: currLocation.latitude,
        longitude: currLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  };

  return (
    <>
      <MapView
        ref={mapView}
        style={styles.map}
        initialRegion={LOS_ANGELES_REGION}
      >
        {currLocation ? (
          <Marker
            coordinate={currLocation}
            // title={"Current Location"}
            // description={"You are here!"}
            // <Callout onPress={}></>
            image={require('../assets/avatar.png')}
            onPress={() => bottomSheet.current.show()}
          />
        ) : null}
      </MapView>

      <BottomSheet 
        hasDraggableIcon 
        ref={bottomSheet} 
        height={500}
        sheetBackgroundColor={"white"}
        backgroundColor={"tranparent"}
      >
        <View style={styles.bottomSheetView}>
            <ListItem>
              <Avatar source={require("../assets/chat_placeholder.jpg")} size="medium"/>
              <View>
                <Text>Kids In The Spotlight</Text>
                <Text>Arts and Craft Resource</Text>
              </View>
            </ListItem>
            
            <ListItem>
              <Ionicons name={"location"} size={18} />
              <Text>145 S Glenoaks Blvd UNIT 124, Burbank, CA</Text>
            </ListItem>

            <ListItem>
              <Ionicons name={"call"} size={18} />
              <Text>(818) 441-1513</Text>

              <Ionicons name={"globe"} size={18} />
              <Text>kitsinc.org</Text>
            </ListItem>
          
            <ListItem style={styles.centered}>

              <TouchableOpacity style={{ ...styles.openButton, ...styles.favoriteButton}}>
                <Text style={styles.favoriteText}>Favorite</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ ...styles.openButton, ...styles.sendButton}}>
                <Text style={styles.textStyle}>Send</Text>
              </TouchableOpacity>

            </ListItem>

            <Text style={styles.bottomSheetText}>Options</Text>

            <View style={styles.centered}>
              <TouchableOpacity style={{ ...styles.openButton}}>
                <Text style={styles.textStyle}>Video</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ ...styles.openButton}}>
                <Text style={styles.textStyle}>AI Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ ...styles.openButton}}>
                <Text style={styles.textStyle}>Bitmoji Direction</Text>
              </TouchableOpacity>
            </View>

          </View>
      </BottomSheet>

      {currLocation ? (
        <View style={styles.locateButtonContainer}>
          <TouchableOpacity
            style={styles.locateButton}
            onPress={goToCurrLocation}
          >
            <Ionicons
              name={"navigate"}
              size={40}
              color={Colors.snapblue}
              style={{ marginTop: 5, marginLeft: 3 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locateButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  locateButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.snapyellow,
  },
  bottomSheetView: {
    backgroundColor: "transparent",
    // borderRadius: 20,
    // padding: 50,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  bottomSheetText: {
    marginBottom: 20,
  },
  openButton: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: 300,
    borderRadius: 15,
    backgroundColor: "transparent",
    backgroundColor: Colors.snapblue,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  favoriteButton: {
    width: 160,
    borderRadius: 15,
    backgroundColor: "transparent",
    backgroundColor: Colors.lightgray,
  },
  favoriteText: {
    color: Colors.snapgray,
    fontWeight: "bold",
    textAlign: "center",
  },
  sendButton: {
    width: 190,
    borderRadius: 30,
    backgroundColor: "transparent",
    backgroundColor: Colors.snapblue,
  },
  centered: {
    alignItems: "center",
  }
});
