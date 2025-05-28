import { View, FlatList, StyleSheet,Text } from 'react-native';
import ExploreBusinessCart from './BusinessExploreCart';

export default function ExploreBusinessList({ businesslist }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={businesslist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ExploreBusinessCart business={item} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#888' }}>No businesses found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 10, 
  },
});
