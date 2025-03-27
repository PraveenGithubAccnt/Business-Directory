import { View, Text } from "react-native";
import React from "react";

export default function PopularBusiness() {
  return (
    <View>
   <View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",
            padding: 10,
            marginBottom: 5,}}>
          
          <Text
          style={{
            fontSize: 16,
            fontFamily: "roboto_bold",
            color: "black"
          }}>Popular Businesses</Text>
  
        <Text style={{
            fontSize: 16,
            fontFamily: "roboto_bold",
            color: "#7851A9"
          }}>View All</Text>
        </View>
    </View>
  );
}
