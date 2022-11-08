import { StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
//import { CF } from '../variables';

export default function CameraFrameScreen() {
    const navigation = useNavigation();
    const cameraURL = `https://d16cp3z93gce0k.cloudfront.net/profile/cameras`;
    /* disable when not in use via AWS */

    return (
        <>
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

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    cameraButton: {

    }
});