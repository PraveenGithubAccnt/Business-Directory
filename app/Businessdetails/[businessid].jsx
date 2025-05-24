import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../Backend/FirebaseConfig";
import Intro from '../../components/BusinessDetailsCom/Intro';
import ActionButton from '../../components/BusinessDetailsCom/ActionButton';
import About from '../../components/BusinessDetailsCom/About';
import Review from '../../components/BusinessDetailsCom/Review';

export default function BusinessidDetails() {
  const { businessid } = useLocalSearchParams();
  const navigation = useNavigation();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailsById();
  }, []);

  const GetBusinessDetailsById = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'BusinessList', businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const businessData = docSnap.data();
        setBusiness({ id: docSnap.id, ...businessData }); 
        navigation.setOptions({
          headerShown: true,
          headerTitle: businessData.name || 'Business Details',
        });
      } else {
        console.log("No such document found!");
      }
    } catch (error) {
      console.error("Error fetching business details:", error);
    } finally {
      setLoading(false);
    }
  };
   
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#7851A9" />
        </View>
      ) : business ? (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Intro business={business} />
          <ActionButton business={business} />
          <About business={business} />
          <Review business={business} /> 
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No business data found.</Text>
      )}
    </View>
  );    
}
