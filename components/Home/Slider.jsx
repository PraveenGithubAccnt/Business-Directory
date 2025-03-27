import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore"; 
import { db } from "../../Backend/FirebaseConfig";
import { useState } from "react";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    setSliderList([]);
    try {
      const q = query(collection(db, "Slider"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setSliderList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      // console.error("Error fetching slider data:", error);
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "roboto_bold",
          color: "black",
          paddingLeft: 10,
          paddingTop:10,
          marginBottom:5
        }}>
        Businesses for You
        </Text>

    <FlatList
    data={sliderList}
    horizontal={true}
    style={{paddingLeft:10}}
    renderItem={({item,index})=>(
        <Image source={{uri:item.ImageUrl}}  
        style={{width:300,height:160,borderRadius:10,marginRight:15}}/>
    )}/>

    </View>
  );
}
