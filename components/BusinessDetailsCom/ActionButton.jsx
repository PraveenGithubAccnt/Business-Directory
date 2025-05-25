import { View, Text, TouchableOpacity, Share, Alert } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    { id: 1, name: 'Call', icon: 'call', url: 'tel:' + business?.contact },
    { id: 2, name: 'Share', icon: 'share', url: null },
    {id: 3, name: 'Directions', icon: 'directions', url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address,},
    { id: 4, name: 'Website', icon: 'public', url: business?.website },
  ];

  const handlePress = async (item) => {
    if (item.name === 'Share') {
      try {
        const message = `Check out ${business?.name} located at ${business?.address}!`;
        await Share.share({ message });
      } catch (error) {
        console.error("Error sharing:", error);
        Alert.alert("Error", "There was an error sharing the business info.");
      }
    } else if (item.name === 'Website') {
      // Check if there is a valid website URL
      if (!business?.website) {
        Alert.alert("No Website", "This business does not have a website provided.");
        return;
      }
      try {
        // Check if the URL can be handled
        const supported = await Linking.canOpenURL(business.website);
        if (supported) {
          await Linking.openURL(business.website);
        } else {
          Alert.alert("Error", "Can't open this URL: " + business.website);
        }
      } catch (error) {
        console.error('Error opening website:', error);
        Alert.alert("Error", "Could not open the website.");
      }
    } else {
      // For Call and Directions, open the URL directly
      if (!item.url) {
        Alert.alert("Error", "No URL provided for this action.");
        return;
      }
      Linking.openURL(item.url).catch((err) =>
        console.error('Error opening URL:', err)
      );
    }
  };

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#E6E6FA",
        borderRadius: 10,
        marginTop: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {actionButtonMenu.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(item)}
            style={{
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 8,
            }}
          >
            <MaterialIcons name={item.icon} size={28} color="#7851A9" />
            <Text style={{ marginTop: 4 }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
