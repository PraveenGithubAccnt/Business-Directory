import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Backend/FirebaseConfig";

export default function Review({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");

  const onSubmit = async () => {
    if (!business?.id) {
      Alert.alert("Error", "Business ID not found.");
      return;
    }

    try {
      const docRef = doc(db, "BusinessList", business.id);
      await updateDoc(docRef, {
        reviews: [
          ...(business.reviews || []),
          {
            rating: rating,
            review: userInput,
            date: new Date().toISOString(),
          },
        ],
      });

      Alert.alert("Thank you!", "Your review has been submitted.");
      setUserInput("");
      setRating(4);
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Could not submit your review. Please try again.");
    }
  };

  return (
    <View style={{ padding: 10, backgroundColor: "#E6E6FA" }}>
      <Text style={{ fontFamily: "roboto_bold", fontSize: 20, color: "#7851A9" }}>
        Review
      </Text>

      <View style={{ backgroundColor: "#E6E6FA", padding: 10, borderRadius: 5 }}>
        <Rating
          startingValue={rating}
          showRating
          onFinishRating={setRating}
          style={{ paddingVertical: 10 }}
        />
      </View>

      <TextInput
        placeholder="Write a review"
        value={userInput}
        onChangeText={setUserInput}
        style={{
          borderWidth: 1,
          borderColor: "#7851A9",
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
          minHeight: 70,
          textAlignVertical: "top",
          backgroundColor: "#fff",
        }}
        multiline
      />

      <TouchableOpacity
        onPress={onSubmit}
        disabled={userInput.trim() === ""}
        style={{
          backgroundColor: userInput.trim() === "" ? "#ccc" : "#7851A9",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontFamily: "roboto_bold" }}>
          Submit Review
        </Text>
      </TouchableOpacity>
    </View>
  );
}
