import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useState } from "react";
import { Rating } from "react-native-ratings";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Backend/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Review({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");
  const [reviews, setReviews] = useState(business.reviews || []);
  const { user } = useUser();

  const onSubmit = async () => {
    if (!business?.id) {
      Alert.alert("Error", "Business ID not found.");
      return;
    }

    const newReview = {
      rating: rating,
      review: userInput,
      date: new Date().toISOString(),
      userEmail: user?.primaryEmailAddress?.emailAddress || "",
      userImage: user?.imageUrl || "",
      userName: user?.fullName || "",
    };

    try {
      const docRef = doc(db, "BusinessList", business.id);
      await updateDoc(docRef, {
        reviews: [...(business.reviews || []), newReview],
      });

      Alert.alert("Thank you!", "Your review has been submitted.");
      setReviews((prevReviews) => [...prevReviews, newReview]);
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

      {/* Review List */}
      <View>
        {reviews.length > 0 ? (
          reviews
            .slice()
            .reverse() 
            .map((review, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 10,
                  flexDirection: "row",
                }}
              >
                {/* Avatar or Initial */}
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#7851A9",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  {review.userImage ? (
                    <Image
                      source={{ uri: review.userImage }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                    />
                  ) : (
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {review.userName ? review.userName.charAt(0).toUpperCase() : "A"}
                    </Text>
                  )}
                </View>

                {/* Review Content */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    {review.userName || "Anonymous"}
                  </Text>

                  <Rating
                    readonly
                    startingValue={review.rating}
                    imageSize={16}
                    style={{ alignItems: "flex-start", marginVertical: 2 }}
                  />

                  <Text style={{ color: "#333", marginTop: 2 }}>{review.review}</Text>
                </View>
              </View>
            ))
        ) : (
          <Text>No reviews yet.</Text>
        )}
      </View>
    </View>
  );
}
