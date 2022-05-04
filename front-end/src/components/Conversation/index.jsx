import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import {getUserAccount} from '../../service/accountService'
import { styles } from './styles.js';

export default function Conversation (props) {
  const [secundUser, setSecundUser] = useState(null);
  const [secundId, setSecundId] = useState(null);
  // const [friend,  setFriend] = useState(null);
  useEffect(()=>{
    setSecundId(props.conversation.members.find((m) => m != `${props.currentUser._id}`))
  })

  useEffect(() => {
    const getSecundUser = async () => {
      try {
        const list = await getUserAccount({userId:secundId});
        setSecundUser(list);
      } catch (err) {
        console.log(err);
      }
    };
    getSecundUser();
  }, [secundId]);

  return (
    <TouchableHighlight 
          onPress={() => {console.log('teste de click');}}
          style={styles.card}>
          <View style = {styles.conversation}>
          <Image
          style={styles.conversationImg}
          source={{
          uri: secundUser ? secundUser.avatarUrl : 'https://reactnative.dev/img/tiny_logo.png',
        }}
        />
          <View style={styles.title}>
          <Text style = {styles.conversationName}>{secundUser?.name}</Text>
          </View>
          </View>
      </TouchableHighlight>

  );
}