import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../../Backend/FirebaseConfig";
import BusinessSearchCart from '../../components/BusinessSearch/BusinessSearchCart';

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, headerTitle: category });
    getBusinessList();
  }, [category, navigation]); 

  const getBusinessList = async () => {     
    try {
      setLoading(true);
      const q = query(collection(db, 'BusinessList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const businesses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // console.log(businesses);
      setBusinessList(businesses); 
    } catch (error) {
      // console.error("Error fetching business list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {businessList.length > 0 && !loading ? (
        <FlatList
          onRefresh={getBusinessList}
          refreshing={loading}
          data={businessList}
          renderItem={({ item }) => (
            <BusinessSearchCart businesses={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: '70%' }}
          size={'large'}
          color={'#7851A9'}
        />
      ) : (
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#7851A9',
          textAlign: 'center',
          marginTop: '50%'
        }}>
          No Business Found Near You
        </Text>
      )}
    </View>
  );
}
