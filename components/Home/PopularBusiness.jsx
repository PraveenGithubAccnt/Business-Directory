import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore"; 
import { db } from "../../Backend/FirebaseConfig";
import BusinessCart from "./BusinessCart";

export default function PopularBusiness() {
  const [businessList, setbusinessList] = useState([]);

  useEffect(()=>{
    GetBusinessList()
  },[])
  
    const GetBusinessList=async()=>
    { 
      setbusinessList([]);
      const q=query(collection(db,'BusinessList'),limit(10));
      const querySnapshot=await getDocs(q);
      querySnapshot.forEach((doc)=>{
        // console.log(doc.data());
        setbusinessList((prev) => [...prev, doc.data()]);
      })
    }

  return (
    <View style={{paddingLeft: 10,}}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: "roboto_bold", color: "black" }}>
          Popular Businesses
        </Text>
        <Text style={{ fontSize: 16, fontFamily: "roboto_bold", color: "#7851A9" }}>
          View All
        </Text>
      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
        <BusinessCart business={item} 
        
        />}
      />
    </View>
  );
}
