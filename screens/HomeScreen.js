import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
//import PDFReader from 'rn-pdf-reader-js ';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: []
  }

  componentDidMount() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1Ee3T6NB3PLzueMl7yEROwcgmjSXpKdTBmb42F0TTYZ4/values:batchGet?ranges=Output&majorDimension=ROWS&key=AIzaSyD5pPk5iDxftXFtCTWtW8cBKDnv3QW5KQ0').then(response => response.json()).then(data => {
      let batchRowValues = data.valueRanges[0].values;

      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }

      this.setState({ data: rows });
      //console.log(this.state.data);
    });
  }

  render() {
    const { data } = this.state;
    if (data.length != 0) {
      let i = 0;
      dataItems = data.map(({ date, preacher, bulletin, video }) => {
        return (
          <View key={date+i++}>
            <Text>{date}</Text>
            <Text>{preacher}</Text>
            <Text>Bulletin: {bulletin}</Text>
            <Text>Video: {video}</Text>
            <Text></Text>
          </View>
        );
      });
      return (
        <ScrollView>{dataItems}</ScrollView>
        /*<WebView
          source={{ uri: this.state.data[0].bulletin }}
          style={{ marginTop: 50 }}
        />*/
      );
    } else {
      return (
        <Text>Loading...</Text>
      );
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
function changeScreenOrientation() {
  Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
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
