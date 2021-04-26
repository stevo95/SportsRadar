import React from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';

function PostsDashboard({onClick, text}) {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} nestedScrollEnabled>
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
        {/* *********************** start *********************** */}
        <View style={styles.post}>
          <View style={styles.post_container}>
            <Text>
              Thi is a text of a user post. Bla bla bla bla bla fkas lksaf knaflkn
              alfn la sadn akjs
            </Text>
          </View>
          <View style={styles.post_container_options}>
            <Text>Delete</Text>
            <Text>Comments</Text>
            <Text>Likes</Text>
          </View>
        </View>
        {/* *********************** end *********************** */}
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
    borderRadius: 15,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  post_container: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  post_container_options: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
});

export default PostsDashboard;
