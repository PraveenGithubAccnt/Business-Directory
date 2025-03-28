import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore"; 
import { db } from "../../Backend/FirebaseConfig";
import { useState } from "react";
import CategoryItem from "./CategoryItem";
import {useRouter} from 'expo-router';
export default function Category() {

  const [categoryList, setcategoryList] = useState([]);
  const router=useRouter();
useEffect(()=>{
  GetCategoryList()
},[]);

  const GetCategoryList=async()=>
  { 
    setcategoryList([]);
    const q=query(collection(db,'Category'));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
      // console.log(doc.data());
      setcategoryList((prev) => [...prev, doc.data()]);
    })
  }

  return (
    <View>
      
      <View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",
          padding: 10,
          marginBottom: 5,}}>
        
        <Text
        style={{
          fontSize: 16,
          fontFamily: "roboto_bold",
          color: "black"
        }}>Categories</Text>

      <Text style={{
          fontSize: 16,
          fontFamily: "roboto_bold",
          color: "#7851A9"
        }}>View All</Text>
      </View>
   <FlatList
      data={categoryList}
      horizontal={true}
      renderItem={({item,index})=>(
        <CategoryItem 
        Category={item} 
        key={index}
        onCategoryPress={(Category)=>router.push('/businesslist/'+item.Name)}
        
        />
      )}
   />

    </View>
  );
}
