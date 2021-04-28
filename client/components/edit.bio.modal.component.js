import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {CHANGE_BIO} from '../GraphQL/mutationDeclarations';
import {useMutation} from '@apollo/client';
import Modal from 'react-native-modal';
import {Icon} from 'native-base';

function EditBioModal({visible, visibleSetter, value, uid, refetchUser}) {

  const [bio, setBio] = useState('');
  const [changeBio] = useMutation(CHANGE_BIO);

  function hideModal() {
    visibleSetter(false);
  }

  function onUserInput(inputValue) {
    setBio(inputValue);
  }

  async function editHandler() {
    try {
      await changeBio({
        variables: {
          userId: uid,
          bio: bio,
        },
      });
      await refetchUser();
      visibleSetter(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Write something about you!'}
          textAlignVertical="top"
          multiline={true}
          value={bio}
          onChangeText={input => onUserInput(input)}
        />
        <TouchableOpacity style={styles.button} onPress={editHandler}>
          <Icon type="FontAwesome" name="save" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  modal: {
    zIndex: 1,
    width: '95%',
    height: 250,
    marginTop: '70%',
    alignSelf: 'center',
    backgroundColor: '#5ce1e6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    width: '100%',
    height: '70%',
    backgroundColor: 'rgba(100,100,100,0.1)',
    borderRadius: 15,
    fontSize: 20,
  },
  button: {
    height: '20%',
    width: '20%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    fontSize: 60,
  },
});

export default EditBioModal;
