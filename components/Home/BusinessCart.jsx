import { View, Text, Image } from "react-native";
import React from "react";

export default function BusinessCart({ business }) {
  return (
    <View
      style={{
        marginRight: 15,
        backgroundColor: "#E6E6FA",
        borderRadius: 20,
        padding: 10,
        marginLeft:15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, 
        width: 300,
      }}
    >
      {/* Business Image */}
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderRadius: 15, 
          backgroundColor: "#D8BFD8", 
        }}
      />

      {/* Business Details */}
      <View style={{ paddingVertical: 8 }}>
        <Text
          style={{
            fontFamily: "roboto_bold",
            fontSize: 18,
            color: "#333",
          }}
        >
          {business.name}
        </Text>

        <Text
          style={{
            fontFamily: "roboto_medium",
            fontSize: 13,
            color: "#666",
          }}
        >
          {business.category}
        </Text>

        {/* Address with 📍 icon */}
        <Text
          style={{
            fontFamily: "roboto_medium",
            fontSize: 12,
            color: "#444", 
            marginTop: 2,
          }}
        >
          📍 {business.address}
        </Text>

        {/* Rating Section */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Image
            source={require("./../../assets/images/star.png")}
            style={{
              width: 18,
              height: 18,
              marginRight: 4,
            }}
          />
          <Text
            style={{
              fontFamily: "roboto_medium",
              fontSize: 14,
              color: "#333",
            }}
          >
            {business.rating}
          </Text>
        </View>
      </View>
    </View>
  );
}
