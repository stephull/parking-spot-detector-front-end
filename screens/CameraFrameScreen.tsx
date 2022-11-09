import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { WEBSITE } from '../variables';

import { ScrollView } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

//import { CF } from '../variables';

export default function CameraFrameScreen() {
  const navigation = useNavigation();
  const cameraURL = `https://d16cp3z93gce0k.cloudfront.net/profile/cameras`;
  /* disable when not in use via AWS */

  const [fetchedFrames, setFetchedFrames] = useState([]);

  useEffect(() => {
    const performGetRequest = () => {
      axios.get(`http://${WEBSITE}/frames/`)
        .then(async (res) => {
          const data = res.data;
          const frames = data.map((item: any, index: any) => {
            const {
              camera_id,
              bytes,
              datetime
            } = item;
            return (
              <View
                key={index}
                style={{ padding: '5%', backgroundColor: 'blue' }}
              >
                <Text>{camera_id}</Text>
                <Text>{bytes}</Text>
                <Text>{datetime}</Text>
              </View>
            );
          });
          setFetchedFrames(frames);
        })
        .catch((err) => console.error(err));
    };
    performGetRequest();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          mt='2'
          colorScheme='green'
          onPress={() => {
            navigation.navigate("CustomWebView", {
              url: cameraURL
            });
          }}
        >
          Configure Cameras
        </Button>
        <View style={styles.container}>
          <Text>help me</Text>
        </View>
        <Text>Live Frame Feed</Text>
        <View style={styles.frameScreen}>
          <Text>tets</Text>
          {
            fetchedFrames
          }
        </View>
        <View style={{
          justifyContent: 'space-evenly', alignItems: 'center',
          display: 'flex', flexDirection: 'row'
        }}>
          <Button
            mt='2'
            colorScheme='purple'
          >
            Default
          </Button>
          <Button
            mt='2'
            colorScheme='blue'
          >
            Processed
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    margin: '5%',
    backgroundColor: 'white'
  },
  frameScreen: {
    margin: '5%',
    padding: '5%',
    backgroundColor: 'gray'
  }
});