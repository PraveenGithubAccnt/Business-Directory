import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
  <Tabs screenOptions={{headerShown:false}}>
    <Tabs.Screen name='home' options={{tabBarLabel:"Home", tabBarIcon:({color})=><MaterialCommunityIcons name="home" size={24} color={color} />}}/>
    <Tabs.Screen name='explore' options={{tabBarLabel:"Explore", tabBarIcon:({color})=><MaterialIcons name="travel-explore" size={24} color={color}/>}}/>
    <Tabs.Screen name='profile' options={{tabBarLabel:"Profile", tabBarIcon:({color})=><Ionicons name="people" size={24} color={color} />}}/>
  </Tabs>
  )
}