import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function BusinessSearchCart({ businesses }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        backgroundColor: "#E6E6FA",
        borderRadius: 15,
        padding: 12,
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={() => router.push('/Businessdetails/' + businesses.id)}
    >
     
      <View style={{ width: 100, alignItems: "center" }}> 
        {/* Business Image */}
        <Image
          source={{ uri: businesses.imageUrl }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            backgroundColor: "#D9D9D9",
          }}
        />
        {/* Business Name Below the Image */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#333",
            marginTop: 8,
            textAlign: "center",
            alignSelf: "flex-start",
            flexWrap: "wrap", 
            width: "100%",
          }}
        >
          {businesses.name}
        </Text>
      </View>

      {/* Business Details on the Right */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 13, color: "#666", marginTop: 2 }}>
          {businesses.about}
        </Text>

        <Text style={{ fontSize: 12, color: "#777", marginTop: 2 }}>
          📍 {businesses.address}
        </Text>

        {businesses.website && (
          <Text style={{ fontSize: 12, color: "#007BFF", marginTop: 2 }}>
            🔗 {businesses.website}
          </Text>
        )}

        {/* Rating Section */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
          <Image
            source={require("./../../assets/images/star.png")}
            style={{ width: 16, height: 16, marginRight: 4 }}
          />
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
            {businesses.rating || "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
