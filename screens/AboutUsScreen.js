import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon, Circle } from 'react-native-maps';
import call from 'react-native-phone-call';
export default class AboutUsScreen extends Component {



    Location = [
		{
			coordinate: {
				latitude: 34.1504,
				longitude: -118.2283
			},
			title: 'Vallejo Drive Seventh Day Adventist Church ',
			radius: 4000,
			circlecolor: 'rgba(17, 170, 255, 0.1e0)'
        },
        
    
    ];

    renderMarkers() {
		return this.Location.map((space) => <Marker coordinate={space.coordinate} title={space.title} />);
	}



	static navigationOptions = ({ navigation }) => ({
		title: 'Vallejo Drive Seventh Day Adventist Church',
		tabBarLabel: 'About Us',
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center'
		}
	});


	render() {
		return (
			<View style={styles.root}>
				<View style={styles.contactInformation}>
					<Text style={styles.contactTxt}> Contact Information: </Text>
					<Text style={styles.contactTxt}> Email: vallejo@graceunconditional.com</Text>
					<Text style={styles.contactTxt}> General Phone #: 818-246-2476 </Text>
                    <Text style={styles.contactTxt}> Address: 300 Vallejo Dr Glendale CA </Text>
					
				</View>

				<View style={styles.container}>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: 34.1504,
							longitude: -118.2283,
							latitudeDelta: 0.11 * 0.5, // Controls the scale
							longitudeDelta: 0.105 * 0.5 // Controls the scale
						}}
					>
						{this.renderMarkers()}
					</MapView>
				</View>
                <View style={styles.contactInformation}>
					<Text style={styles.contactTxt}> Services: </Text>
					<Text style={styles.contactTxt}> Sabbath School: 9:45 am - 10:45 am</Text>
					<Text style={styles.contactTxt}> Church: 11:00 am - 12:15 pm </Text>
                    <Text style={styles.contactTxt}> Office Hours: 5 days per week </Text>
					
				</View>
				
			</View>
		);
	}
}

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const args = {
	number: '8088590809', // String value with the number to call
	prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
};
const styles = StyleSheet.create({
	root: {
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center'
	},

	contactInformation: {
		width: window.width,
		backgroundColor: '#3d4756',
		padding: 25,
		paddingLeft: 50
	},
	contactTxt: {
		color: '#fff',
		fontWeight: 'bold'
	},

	map: {
		width: window.width,
		height: window.width
	},

	btnOpacity: {
		backgroundColor: '#2ecc71', // green
		width: 250,
		padding: 15,
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10
	},
	btnText: {
		alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
		fontSize: 20
	}
});
