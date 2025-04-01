import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query } from "firebase/firestore"; 
import { db } from "../../Backend/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = useCallback(async () => {
    try {
      setLoading(true);
      setSliderList([]);
      const q = query(collection(db, "Slider"));
      const querySnapshot = await getDocs(q);
      const sliders = querySnapshot.docs.map(doc => doc.data());
      setSliderList(sliders);
    } catch (error) {
      console.error("Error fetching slider data:", error);
    } finally {
      setLoading(false); 
    }
  }, []);

  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{
        fontSize: 16,
        fontFamily: "roboto_bold",
        color: "black",
        paddingLeft: 10,
        marginBottom: 5
      }}>
        Businesses for You
      </Text>

      {loading ? (
        <ActivityIndicator 
          size="large" 
          color="#7851A9" 
          style={{ marginTop: 100, alignSelf: "center" }} 
        />
      ) : sliderList.length > 0 ? (
        <FlatList
          data={sliderList}
          horizontal={true}
          style={{ paddingLeft: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image 
              source={{ uri: item.ImageUrl }}  
              style={{ width: 300, height: 160, borderRadius: 10, marginRight: 15 }}
            />
          )}
          onRefresh={getSliderList}
          refreshing={loading}
        />
      ) : (
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#7851A9",
          textAlign: "center",
          marginTop: 100, 
        }}>
          No Slider Images Found
        </Text>
      )}
    </View>
  );
}
