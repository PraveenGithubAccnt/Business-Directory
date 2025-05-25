import React from 'react';
import { SafeAreaView, FlatList, View, StyleSheet } from 'react-native';
import ExploreBusinessCart from './BusinessExploreCart';

export default function ExploreBusinessList({ businesslist }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={businesslist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ExploreBusinessCart business={item} />}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={{ height: 170 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 10,
    paddingBottom: 170, 
  },
});
