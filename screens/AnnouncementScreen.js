import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
		title: 'Announcements',
		tabBarLabel: 'Announcements',
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center'
		}
	});

  state = {
    announcements: []
  }

  componentDidMount() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1Ee3T6NB3PLzueMl7yEROwcgmjSXpKdTBmb42F0TTYZ4/values:batchGet?ranges=Announcements&majorDimension=ROWS&key=AIzaSyD5pPk5iDxftXFtCTWtW8cBKDnv3QW5KQ0')
      .then(response => response.json()).then(data => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        this.setState({ announcements: rows });
      });
  }

  render() {
    const { announcements } = this.state;
    if (announcements.length != 0) {
      const announcementCards = announcements.map(({ date, title, description }) => {
        return (
          <View key={date + title + description} style={styles.card}>
            <CardTitle style={styles.cardTitle}>
              <Text style={styles.title}>{title} - {date}</Text>
            </CardTitle>
            <CardContent style={styles.cardContent}>
              <Text>{description}</Text>
            </CardContent>
          </View>
        );
      });
      return (
      <ScrollView >
          <View style={styles.container}>
            {announcementCards}
          </View>
        </ScrollView>
      );
    } else {
      return (<Text>Loading...</Text>);
    }
  }



  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: .3,
    margin: 8,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },



  },

  title: {
    fontSize: 32,
    backgroundColor: 'transparent'
  },



  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    paddingTop: 50,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
