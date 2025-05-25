import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../Backend/FirebaseConfig";
import BusinessCart from "./BusinessCart";
import { useRouter } from "expo-router";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "BusinessList"), limit(10));
      const querySnapshot = await getDocs(q);
      const businesses = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
        <Text style={{ fontSize: 16, fontFamily: "roboto_bold", color: "black" }}>
          Popular Businesses
        </Text>
        <Text style={{ fontSize: 16, fontFamily: "roboto_bold", color: "#7851A9" }}>
          View All
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7851A9" style={{ marginTop: 200, alignSelf: "center" }} />
      ) : businessList.length > 0 ? (
        <FlatList
          data={businessList}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/Businessdetails/${item.id}`)}>
              <BusinessCart business={item} />
            </TouchableOpacity>
          )}
          onRefresh={GetBusinessList}
          refreshing={loading}
        />
      ) : (
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#7851A9",
          textAlign: "center",
          marginTop: 200,
        }}>
          No Popular Businesses Found
        </Text>
      )}
    </View>
  );
}
