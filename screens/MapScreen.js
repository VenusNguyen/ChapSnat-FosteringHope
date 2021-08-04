import React, { useState, useEffect, useRef } from "react";
import Colors from "../constants/Colors";
import { StyleSheet, View, Text, LogBox } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { ListItem, Avatar } from "react-native-elements";
import db from "../firebase";

const LOS_ANGELES_REGION = {
  latitude: 34.0522,
  longitude: -118.2437,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen({navigation}) {
  const [currLocation, setCurrLocation] = useState(null);
  const mapView = useRef(null);
  const bottomSheet = useRef(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    db.collection("Resources")
      .get()
      .then((querySnapshot) => {
        let newResources = [];
        querySnapshot.forEach((doc) => {
          let newResource = { ...doc.data() };
          newResource.id = doc.id;
          newResources.push(newResource);
          return newResource;
        });
        setResources(newResources);
      });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrLocation(location.coords);
    })();
  }, []);

  //a hacky way to get rid of the 'useNativeDriver' warning
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
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
            image={require("../assets/avatar.png")}
            onPress={() => bottomSheet.current.show()}
          />
        ) : null}

        {resources.map((data) => {
          return (
            <Marker
              key={data.id}
              coordinate={{
                latitude: data.coordinate.latitude,
                longitude: data.coordinate.longitude,
              }}
              image={{ uri: data.icon }}
              onPress={() => bottomSheet.current.show()}
            />
          );
        })}
      </MapView>

      <EditBottomSheet
        bottomSheet={bottomSheet}
        navigation={navigation}
      ></EditBottomSheet>

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

function EditBottomSheet(props) {
  return (
    <BottomSheet
      hasDraggableIcon
      ref={props.bottomSheet}
      height={500}
      sheetBackgroundColor={"white"}
      backgroundColor={"tranparent"}
    >
      <View style={styles.bottomSheetView}>
        <ListItem>
          <Avatar
            source={require("../assets/chat_placeholder.jpg")}
            size="medium"
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              <Text>Kids In The Spotlight</Text>
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              <Text>Arts and Craft Resource</Text>
            </ListItem.Subtitle>
          </ListItem.Content>
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
          <TouchableOpacity
            style={{ ...styles.openButton, ...styles.favoriteButton }}
          >
            <Ionicons
              name={"heart-outline"}
              size={18}
              style={styles.iconMarginLeft}
            />
            <Text style={styles.favoriteText}>Favorite</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.openButton, ...styles.sendButton }}
          >
            <Text style={styles.textStyle}>Send</Text>
            <Ionicons name={"send"} style={styles.iconMarginRight} />
          </TouchableOpacity>
        </ListItem>

        <Text style={styles.bottomSheetText}>Options</Text>

        <View style={styles.centered}>
          <TouchableOpacity
            style={{ ...styles.openButton }}
            onPress={() => {
              props.bottomSheet.current.close();
              props.navigation.navigate("Video");
            }}
          >
            <Text style={styles.textStyle}>About Us</Text>
            <Ionicons
              name={"information-circle-outline"}
              size={18}
              style={styles.iconMarginRight}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.openButton }}>
            <Text style={styles.textStyle}>AI Chat</Text>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              style={styles.iconMarginRight}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.openButton }}>
            <Text style={styles.textStyle}>Bitmoji Direction</Text>
            <Ionicons name={"walk"} size={18} style={styles.iconMarginRight} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
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
  },
  bottomSheetText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 20,
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
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: Colors.snapgray,
    fontSize: 14,
    flex: 1,
    flexDirection: "row",
    maxHeight: 20,
  },
  iconMarginLeft: {
    marginRight: 7,
    color: Colors.snapgray,
  },
  iconMarginRight: {
    marginLeft: 7,
    color: "white",
  },
});
