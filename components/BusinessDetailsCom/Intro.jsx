import { View, Image, TouchableOpacity, Animated, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Intro({ business }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleFavorite = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFavorited((prev) => !prev);
  };

  return (
    <View style={{ position: 'relative' }}>
      {/* Top Right Favorite Icon */}
      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={toggleFavorite}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialIcons
              name={isFavorited ? 'favorite' : 'favorite-border'}
              size={32}
              color={isFavorited ? 'red' : 'black'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Business Image with rounded corners */}
      <View style={{ borderRadius: 20, overflow: 'hidden' }}>
        <Image
          source={{ uri: business?.imageUrl }}
          style={{ width: '100%', height: 300 }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: '#E6E6FA',
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#7851A9',
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'roboto',
          }}
        >
          📍 {business?.address ?? 'Address not available'}
        </Text>
      </View>
    </View>
  );
}
