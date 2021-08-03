import React, { useState, useEffect, useRef } from "react";
import Colors from "../constants/Colors";
import { StyleSheet, View, Text, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { ListItem, Avatar } from "react-native-elements";
import {Video, AVPlaybackStatus }from "expo-av";
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

      <EditBottomSheet
        bottomSheet={bottomSheet}
        navigation = {navigation}
      >

      </EditBottomSheet>

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
function EditBottomSheet(props){

const video = useRef(null);
const [status, setStatus] =useState({});

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
              <TouchableOpacity style={{ ...styles.openButton}}
              onPress={() => {
                props.navigation.navigate("VideoScreen");
              }}
              >
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
  )
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
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
/////////////////////////////////
// import React, { useRef, useState, useEffect } from "react";
// import Colors from "../constants/Colors";
// import { TouchableOpacity, Text, StyleSheet, View, Button} from "react-native";  //SafeAreaView, 
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps"; 
// import { Ionicons } from "@expo/vector-icons";
// import colors from "../constants/Colors";
// import BottomSheet from "react-native-gesture-bottom-sheet";

// const LOS_ANGELES_REGION = {
//   latitude: 34.0522,
//   longitude: -118.2437,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// };
// const KID_IN_THE_SPOTLIGHT = {
//   latitude: 34.18277,
//   longitude: -118.30566,
// };
//   const Images = [
//     {image: require("../assets/avatar.png")}, 
//     {image: require("../assets/house.jpeg")},
//   ];
// export default function MapScreen()  {
//   const [currLocation, setCurrLocation] = useState(null);
//   const mapView = useRef(null);

//   const bottomSheet = useRef();
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrLocation(location.coords);
//     })();
//   }, []);
//   const goToCurrLocation = () => {
//     mapView?.current.animateToRegion(
//       {
//         latitude: currLocation.latitude,
//         longitude: currLocation.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       },
//       1000
//     );
//   };
//   // const [setIsModalVisible, setIsModalVisible] = React.useState(false); 
//   // const handleModal = () => setIsModalVisible(() => !setIsModalVisible);
//   //add
//   return (
//     <>
//     <MapView
//       ref={mapView}
//       style={styles.map}
//       initialRegion={LOS_ANGELES_REGION}
//     >
//        {currLocation ? (
//           <Marker
//             coordinate={currLocation}
//             title={"Current Location"}
//             description={"You are here!"}
//             image={Images[0].image}
//           />
//         ) : null}
//         <Marker
//         coordinate={KID_IN_THE_SPOTLIGHT}
//         title={"Organization"}
//         description={"Info"}
//         image={Images[1].image}
//           />
//     </MapView> 
//       <BottomSheet 
//         hasDraggableIcon 
//         ref={bottomSheet} 
//         height={500}
//         renderContent={this.renderInner}
//       />
//       {currLocation ? (
//       <View style={styles.locateButtonContainer}>
//         <TouchableOpacity
//           style={styles.locateButton}
//           onPress={() => bottomSheet.current.show()}
//         >
//         <Ionicons
//               name={"navigate"}
//               size={40}
//               color={Colors.snapblue}
//               style={{ marginTop: 5, marginLeft: 3 }}
//             />
//           <Text style={styles.text}>modal??</Text>
//           <Text style={styles.text}>inside</Text>
//         </TouchableOpacity>
//       </View>
//       ) : null}
//    </>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   locateButtonContainer: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//   },
//   locateButton: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: colors.snapyellow,
//   },
//   button: {
//     height: 50,
//     width: 150,
//     backgroundColor: "#140078",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//     shadowColor: "#8559da",
//     shadowOpacity: 0.7,
//     shadowOffset: {
//       height: 4,
//       width: 4,
//     },
//     shadowRadius: 5,
//     elevation: 6,
//   },
//   text: {
//     color: "white",
//     fontWeight: "600",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default Example;
//////////////////////////
// import React, { useState, useEffect, useRef } from "react";
// import Colors from "../constants/Colors";
// import {
//   StyleSheet, 
//   View, 
//   ScrollView, 
//   Text, 
//   Button, 
//   SafeAreaView,
//   Animated, 
//   Dimensions, 
//   Modal,
//   PanResponder,
// } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
// import colors from "../constants/Colors";
// import BottomSheet from "react-native-gesture-handler";
// import { render } from "react-dom";
// // import { render } from "react-dom";
// // const [isVisible, setIsVisible] = useState(false);
// const LOS_ANGELES_REGION = {
//   latitude: 34.0522,
//   longitude: -118.2437,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// };
// const KID_IN_THE_SPOTLIGHT ={ 
//   latitude: 34.18291346983482,
//   longitude: -118.30557022698676,
// };

// export default function MapScreen()  {    //props
//   const [currLocation, setCurrLocation] = useState(null);
//   const mapView = useRef(null);
//   // const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setCurrLocation(location.coords);

//       // resetPositionAnim.start();

//     })();
//   }, []); //resetPositionAnim
//   renderInner = () => (
//     <View style={styles.panel}>
//       <TextInput
//       style={styles.search}
//       onFocus={() => {
//         this.bs.current.snapTo(1)
//       }}
//       placeholder="search"
//       />
//       <Text style={styles.panelTitle}>KID_IN_THE_SPOTLIGHT</Text>
//       <Text style={styles.panelSubtitle}>
//         INFO ON ORGANIZATION
//       </Text>
//       <View style={styles.panelButton}>
//         <Text style={styles.panelButtonTitle}>Directions</Text>
//       </View>
//       <View style={styles.panelButton}>
//         <Text style={styles.panelButtonTitle}>Video</Text>
//       </View>
//       <Image
//         style={styles.photo}
//         source={require('./assets/avatar.png')}
//       />
//     </View>
//   )

//   const goToCurrLocation = () => {
//     mapView?.current.animateToRegion(
//       {
//         latitude: currLocation.latitude,
//         longitude: currLocation.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       },
//       1000
//     );
//   };
 
//   const Images = [
//     {image: require("../assets/house.jpeg")},
//     {image: require("../assets/theatre.jpg")},
//     {image: require("../assets/avatar.png")}, 
//   ];
//   return (
//     <>
//       <MapView
//         ref={mapView}
//         style={styles.map}
//         initialRegion={LOS_ANGELES_REGION}
//       >
//         {currLocation ? (
//           <Marker
//             coordinate={currLocation}
//             title={"Current Location"}
//             description={"You are here!"}
//             image= {Images[0].image}     
//           />
//         ) : null}
//         <Marker 
//           coordinate = {KID_IN_THE_SPOTLIGHT}
//           title={"Kids In The Spotlight"}
//           description ={"Organization"}
//           image={Images[2].image}
//           />
//       </MapView>
//       {currLocation ? (
//         <View style={styles.locateButtonContainer}>
//           <TouchableOpacity
//             style={styles.locateButton}
//             onPress={goToCurrLocation}
//           >
//             <Ionicons
//               name={"navigate"}
//               size={40}
//               color={Colors.snapblue}
//               style={{ marginTop: 5, marginLeft: 3 }}
//             />
//           </TouchableOpacity>
//         </View>
//       ) : null}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   locateButtonContainer: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//   },
//   locateButton: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: colors.snapyellow,
//   },
//   search: {
//     borderColor: 'gray',
//     borderWidth: StyleSheet.hairlineWidth,
//     height: 40,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   box: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//   },
//   panelContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   panel: {
//     height: 600,
//     padding: 20,
//     backgroundColor: '#f7f5eee8',
//   },
//   header: {
//     backgroundColor: '#f7f5eee8',
//     shadowColor: '#000000',
//     paddingTop: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   panelHeader: {
//     alignItems: 'center',
//   },
//   panelHandle: {
//     width: 40,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#00000040',
//     marginBottom: 10,
//   },
//   panelTitle: {
//     fontSize: 27,
//     height: 35,
//   },
//   panelSubtitle: {
//     fontSize: 14,
//     color: 'gray',
//     height: 30,
//     marginBottom: 10,
//   },
//   panelButton: {
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#318bfb',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   photo: {
//     width: '100%',
//     height: 225,
//     marginTop: 30,
//   },
// });
/********************************************************************* */
// import React, { useState, useEffect, useRef } from "react";
// import Colors from "../constants/Colors";
// import { StyleSheet, View, Modal, Text, Pressable, Alert } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
// import colors from "../constants/Colors";
// // import MapViewDirections from 'react-native-maps-directions';
// const LOS_ANGELES_REGION = {
  // latitude: 34.0522,
  // longitude: -118.2437,
  // latitudeDelta: 0.0922,
  // longitudeDelta: 0.0421,
// };

// // const KID_IN_THE_SPOTLIGHT = {
// //   latitude: 34.18277,
// //   longitude: -118.30566,
// // };

// export default function MapScreen() {
//   const [currLocation, setCurrLocation] = useState(null);
//   const mapView = useRef(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrLocation(location.coords);
//     })();
//   }, []);

//   const goToCurrLocation = () => {
//     mapView?.current.animateToRegion(
//       {
//         latitude: currLocation.latitude,
//         longitude: currLocation.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       },
//       1000
//     );
//   };
//   // const goToGivenLocation = () => {
//   //   mapView?.current.animateToRegion({
//   //     latitude: 34.18277,
//   //     longitude: -118.30566,
//   //   },
//   //   1000
//   //   );
//   // };
//   // const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <>
//       <MapView
//         ref={mapView}
//         style={styles.map}
//         initialRegion={LOS_ANGELES_REGION}
//       >
//         {currLocation ? (
//           <Marker>
//             coordinate={currLocation}
//             title={"Current Location"}
//             description={"You are here!"}
//             image={require('../assets/house.jpeg')}
          
//           </Marker>
//         ) : null}
//       </MapView>
//       {currLocation ? (
//         <View style={styles.locateButtonContainer}>
//           <TouchableOpacity
//             style={styles.locateButton}
//             onPress={goToCurrLocation}
//           >
//             <Ionicons
//               name={"navigate"}
//               size={40}
//               color={Colors.snapblue}
//               style={{ marginTop: 5, marginLeft: 3 }}
//             />
//           </TouchableOpacity>
//         </View>
//       ) : null}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   locateButtonContainer: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//   },
//   locateButton: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: colors.snapyellow,
//   },
// });
