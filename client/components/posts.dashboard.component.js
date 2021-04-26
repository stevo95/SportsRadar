import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';

function PostsDashboard({posts}) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const reversed = [...posts];
    reversed.reverse();
    setContent(reversed);
  }, [posts]);

  function renderPosts() {
    const postList = content.map((post, idx) => {
      return (
        <View key={idx} style={styles.post}>
          <View style={styles.post_container}>
            <Text>{post}</Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
      );
    });
    return postList;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} nestedScrollEnabled>
        {renderPosts()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 500,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  post: {
    backgroundColor: 'rgba(100,100,100,0.1)',
    height: 80,
    borderRadius: 15,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  post_container: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    height: '70%',
  },
  post_container_options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostsDashboard;
