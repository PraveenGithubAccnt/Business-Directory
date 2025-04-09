import { View, Image, TouchableOpacity, Animated } from 'react-native';
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
    // Optionally: handle backend update here
  };

  const imageUrl = business?.imageUrl || 'https://via.placeholder.com/300';

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
      <View style={{ borderRadius: 30, overflow: 'hidden' }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 300 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
