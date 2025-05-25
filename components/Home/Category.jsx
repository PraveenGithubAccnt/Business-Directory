import { View, Text, FlatList, Image,ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../Backend/FirebaseConfig";
import { useState } from "react";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";
export default function Category({explore=false, onCategorySelect})
{
  const [categoryList, setcategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      setLoading(true);
      setcategoryList([]);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);
      const categories = querySnapshot.docs.map(doc => doc.data());
      setcategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };
   const onCategoryPressHandler = (item) => 
    {
    if (!explore) {
      router.push("/businesslist/" + item.Name);
    } 
    else 
    {
      onCategorySelect(item.Name);
    }
  }
  return (
    <View>
      { !explore && <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "roboto_bold",
            color: "black",
          }}
        >
          Categories
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "roboto_bold",
            color: "#7851A9",
          }}
        >
          View All
        </Text>
      </View>}
      {loading ? (
        <ActivityIndicator size="large" color="#7851A9" style={{ marginTop: '50%'}}/>
      ) : categoryList.length > 0 ? (
        <FlatList
          data={categoryList}
          horizontal={true}
          renderItem={({ item, index }) => (
            <CategoryItem
              Category={item}
              key={index}
              onCategoryPress={(categories) => onCategoryPressHandler(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={GetCategoryList}
          refreshing={loading}
        />
      ) : (
        <Text style={{ fontSize: 18,
          fontWeight: 'bold',
          color: '#ff4d4d', 
          textAlign: 'center',
          marginTop: '50%',}}>No Categories Found</Text>
      )}
    </View>
  );
}
