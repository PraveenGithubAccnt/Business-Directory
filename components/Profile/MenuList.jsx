import { useAuth } from "@clerk/clerk-expo";
import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function MenuList() {
  const router = useRouter();
  const { signOut } = useAuth();

  const OnMenuClick = async (item) => {
    if (item.path === "logout") {
      await signOut();
       router.replace("/");  
    } else {
      router.push(item.path);
    }
  };

  const menulist = [
    {
      id: 1,
      title: "Add Business",
      description: "Add your business",
      icon: require("./../../assets/images/addbus.png"),
      path:'/uploadBusiness/AddBusiness',
    },
    {
      id: 2,
      title: "My Businesses",
      description: "Manage your list",
      icon: require("./../../assets/images/mybus.png"),
      path: "/",
    },
    {
      id: 3,
      title: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={menulist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer} onPress={() => OnMenuClick(item)}>
            <Image source={item.icon} style={styles.icon} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 30,
    backgroundColor: "#E6E6FA",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    gap: 10,
    padding: 12,
    borderRadius: 35,
    borderWidth: 1,
    backgroundColor: "#AAAACC",
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    fontFamily: "roboto_medium",
  },
  description: {
    color: "#666",
  },
});
