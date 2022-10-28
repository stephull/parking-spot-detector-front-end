import { useCallback } from 'react';
import { Text } from "../components/Themed";
import { StyleSheet, SafeAreaView, ScrollView, View, Button, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import FormData from "../components/FormData";
import FormTextField from "../components/FormTextField";
import * as Location from 'expo-location';

const CreateParkingArea = () => {
    const navigation = useNavigation();
    const [formValues, handleFormChange, setFormValues] = FormData({
        name: '',
        address: '',
        spots: 0,
        public: '',
        displayOnMaps: ''
    });
    const fetchCurrentLocation = useCallback(
        async () => {
            let loc = await Location.getCurrentPositionAsync({});
            let place = await Location.reverseGeocodeAsync(loc.coords);
            if (place[0] !== null) {
                const { streetNumber, street, city, region, postalCode } = place[0];
                const addrString = `${streetNumber} ${street}, ${city}, ${region} ${postalCode}`;
                setFormValues({
                    ...formValues,
                    address: addrString
                });
            }
            else {
                Alert.alert("Cannot access current location. Try again.");
                return;
            }
        }, []
    );

    function validateEntries() {
        if (formValues.address.length <= 0) return false;
        if (formValues.address.name <= 0) return false;
        if (formValues.spots <= 0) return false;
        if (formValues.address.public <= 0) return false;
        if (formValues.address.displayOnMaps <= 0) return false;
        return true;
    }

    return (
        <SafeAreaView>
            <ScrollView bounces={false}>
                <Text style={{ 
                    fontStyle: 'italic', color: 'pink' 
                }}>Please note that selecting 'Use Current Location' will reset all other values. {'\n'}</Text>
                <View>
                    <View style={{
                        display: 'flex', flexDirection: 'row'
                    }}>
                        <FormTextField
                            label={'Parking Area Address'}
                            formKey='address'
                            placeholder="Enter address..."
                            handler={handleFormChange}
                        />
                        <View style={styles.currentLocationContainer}>
                            <Button
                                color={'white'}
                                title={'Use Current \n Location'}
                                onPress={fetchCurrentLocation}
                            />
                        </View>
                    </View>
                    <FormTextField
                        label='Parking Area Name'
                        formKey='name'
                        placeholder="Enter name..."
                        handler={handleFormChange}
                    />
                    <FormTextField
                        label={'Number of Spots'}
                        formKey="spots"
                        placeholder="Enter number of spots in area..."
                        handler={handleFormChange}
                    />
                    {/* change to dropdown/buttons */}
                    <FormTextField
                        label={'Type of area (public, private, paid)'}
                        formKey="public"
                        placeholder={'Type in "Public", "Private", or "Paid"'}
                        handler={handleFormChange}
                    />
                    {/* change to toggle */}
                    <FormTextField
                        label={'Display on Google Maps'}
                        formKey="displayOnMaps"
                        placeholder="Type in 'false' or 'true'"
                        handler={handleFormChange}
                    />
                </View>
                <View style={styles.review}>
                    <Text style={styles.reviewTitle}>
                        Review All Information
                    </Text>
                    <Text>Address: {formValues.address}</Text>
                    <Text>Name: {formValues.name}</Text>
                    <Text>Number of spots: {formValues.spots}</Text>
                    <Text>Type of parking: {formValues.public}</Text>
                    <Text>Allow Google Maps view: {formValues.displayOnMaps}</Text>
                </View>
                {/* confirm button */}
                <View style={styles.confirm}>
                    <Button
                        title={'Create Area'}
                        color={'white'}
                        onPress={() => {
                            if (!!!validateEntries()) {
                                Alert.alert("Not all fields are filled in or valid. Try again.");
                                return;
                            };
                            Alert.alert("Created parking area!");
                            navigation.navigate("Root");
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    confirm: {
        backgroundColor: "#49a429",
        borderRadius: 15,
        padding: '1.25%'
    },
    currentLocationContainer: {
        backgroundColor: "#49a429",
        borderRadius: 15,
        margin: '5%',
        marginTop: '10%'
    },
    review: {
        borderRadius: 10,
        backgroundColor: '#50008c',
        margin: '2.5%',
        padding: '2.5%'
    },
    reviewTitle: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default CreateParkingArea;
