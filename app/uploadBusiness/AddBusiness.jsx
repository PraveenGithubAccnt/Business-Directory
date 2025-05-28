import { useEffect, useState } from "react";
import {View,Text,Image,TouchableOpacity,TextInput,KeyboardAvoidingView,Platform,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./../../Backend/FirebaseConfig";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result?.assets[0].uri);
      } else {
        console.log("Image picking cancelled");
      }
    } catch (error) {
      console.error("Picker error:", error);
    }
  };

  const GetCategoryList = async () => {
    try {
      const q = query(collection(db, "Category"));
      const snapShot = await getDocs(q);
      const categories = [];
      snapShot.forEach((doc) => {
        categories.push({
          label: doc.data().Name,
          value: doc.id,
          key: doc.id,
        });
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, backgroundColor: "#E6E6FA" }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          style={{
            fontFamily: "roboto_bold",
            fontSize: 14,
            textAlign: "center",
            color: "#7851A9",
            marginBottom: 10,
          }}
        >
          Add the Following Details to add a new business
        </Text>

        <TouchableOpacity onPress={onImageUpload}>
          {!image ? (
            <Image
              source={require("./../../assets/images/imagepic.png")}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                marginTop: 20,
                borderRadius: 90,
                backgroundColor: "#eee",
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                marginTop: 20,
                borderRadius: 90,
                backgroundColor: "#eee",
              }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "roboto_bold",
            fontSize: 14,
            textAlign: "center",
            color: "#A9A9A9",
            marginTop: 5,
          }}
        >
          Upload a business image
        </Text>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#7851A9",
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={categoryList}
              value={category}
              placeholder={{ label: "Select Category", value: null }}
              style={{
                inputIOS: {
                  paddingVertical: 10,
                  fontFamily: "roboto_regular",
                  color: "#7851A9",
                },
                inputAndroid: {
                  paddingVertical: 8,
                  fontFamily: "roboto_regular",
                  color: "#7851A9",
                },
                placeholder: {
                  color: "#A9A9A9",
                },
              }}
            />
          </View>

          <TextInput
            placeholder="Name of the Business"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              borderWidth: 1,
              borderColor: "#7851A9",
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              fontFamily: "roboto_regular",
              color: "#7851A9",
            }}
          />

          <TextInput
            placeholder="Contact Number"
            value={contact}
            onChangeText={(text) => setContact(text)}
            style={{
              borderWidth: 1,
              borderColor: "#7851A9",
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              fontFamily: "roboto_regular",
              color: "#7851A9",
            }}
          />

          <TextInput
            placeholder="Address of the Business"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{
              borderWidth: 1,
              borderColor: "#7851A9",
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              fontFamily: "roboto_regular",
              color: "#7851A9",
            }}
          />

          <TextInput
            placeholder="Website of the Business"
            value={website}
            onChangeText={(text) => setWebsite(text)}
            style={{
              borderWidth: 1,
              borderColor: "#7851A9",
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              fontFamily: "roboto_regular",
              color: "#7851A9",
            }}
          />

          <TextInput
            placeholder="About the Business"
            value={about}
            onChangeText={(text) => setAbout(text)}
            multiline
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: "#7851A9",
              borderRadius: 5,
              padding: 10,
              marginVertical: 10,
              fontFamily: "roboto_regular",
              color: "#7851A9",
              height: 100,
              textAlignVertical: "top",
            }}
          />
          <TouchableOpacity
  style={{
    backgroundColor: "#7851A9",
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  }}
>
  <Text
    style={{
      color: "#fff",
      fontSize: 16,
      fontFamily: "roboto_bold",
    }}
  >
    Add Business
  </Text>
</TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
