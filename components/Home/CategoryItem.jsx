import { View, Text, Image, TouchableOpacity } from "react-native";

export default function CategoryItem({ Category, onCategoryPress }) {
  return (
    <View style={{ alignItems: "center", marginHorizontal: 10 }}>
      <TouchableOpacity
        onPress={() => onCategoryPress(Category)}
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginBottom: 5,
          backgroundColor: "#E6E6FA",
          borderRadius: 20,
          width: 85,
          height: 70,
        }}
      >
        <Image
          source={{ uri: Category.icon }}
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            fontFamily: "roboto",
            fontSize: 10,
            textAlign: "center",
            marginTop: 3,
            color: "black",
          }}
        >
          {Category.Name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
