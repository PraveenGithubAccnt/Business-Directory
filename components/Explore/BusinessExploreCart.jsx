import { View, Text,Image, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
export default function ExploreBusinessCart({ business }) {
//   console.log("Rendering item:", business);
 const router = useRouter();
  return (
    <TouchableOpacity
     onPress={() => router.push(`/Businessdetails/${business?.id}`)}
    style={{ padding: 10, borderBottomWidth: 1, 
        borderColor: '#ddd', backgroundColor:"#E6E6FA",
        borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
         marginTop:10, borderTopLeftRadius: 15, borderTopRightRadius: 15
    }}>
      <Image source={{uri:business?.imageUrl}}
       style={{ width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
       resizeMode="cover"
      /> 
      <View
        style={{ padding: 10}}>
        <Text style={{ fontSize: 15, fontFamily:"roboto_bold"}}>{business?.name}</Text>
        <Text style={{ color: '#888' }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  );
}
