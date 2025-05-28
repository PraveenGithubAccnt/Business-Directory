import { SafeAreaView, View, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Category from '../../components/Home/Category'; 
import { db } from "../../Backend/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";  
import { useState } from 'react'; 
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function Explore() {
  const [businesslist, setBusinesslist] = useState([]);  

  const GetBusinessByCategory = async (category) => {
    try {
      const q = query(collection(db, 'BusinessList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No businesses found for this category.");
        setBusinesslist([]); 
        return;
      }

      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });
      
      setBusinesslist(businesses); 

    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 20, fontFamily: "roboto_bold" }}>
        Explore More
      </Text>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 3,
          marginVertical: 5,
          borderRadius: 15,
          marginTop: 15,
          borderColor: "#7851A9",
          borderWidth: 1.5,
          shadowColor: "#000",
        }}
      >
        <MaterialCommunityIcons
          name="map-search-outline"
          size={26}
          color="#7851A9"
        />

        <TextInput
          style={{
            fontSize: 14,
            fontFamily: "roboto_medium",
            color: "#7851A9",
            flex: 1,
            marginLeft: 10,
          }}
          placeholder="Search..."
          placeholderTextColor="#7851A9"
        />
      </View>

      {/* Categories */}
      <Category
        onCategorySelect={(category) => {
          GetBusinessByCategory(category);
        }}
        explore={true}
      />
      
      {/* Businesses List */}
      <ExploreBusinessList businesslist={businesslist} />
    </SafeAreaView>
  );
}
