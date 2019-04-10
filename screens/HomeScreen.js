const WEBVIEW_REF = 'WEBVIEW_REF';
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
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Vallejo Drive Seventh Day Adventist Church',
      tabBarLabel: 'Home',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
      }
    };
  };

  state = {
    data: [],
    canGoBack: false,
    url: ''
  }

  render() {
    return (

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topbar}>
            <TouchableOpacity
              disabled={!this.state.canGoBack}
              onPress={this.onBack.bind(this)}
            >
              <Text style={(this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled)}>Go back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Bulletin')}
              >
                <Image
                  style={{ width: 249, height: 110 }}
                  source={require('../assets/images/h1-1.jpg')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ url: 'https://www.graceunconditional.com/video-archive/' })}
              >
                <Image
                  style={{ width: 249, height: 110 }}
                  source={require('../assets/images/h2.jpg')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Give')}
              >
                <Image
                  style={{ width: 249, height: 110 }}
                  source={require('../assets/images/h3.jpg')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AboutUs')}
              >
                <Image
                  style={{ width: 249, height: 110 }}
                  source={require('../assets/images/h5.jpg')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ url: 'https://www.graceunconditional.com/contact-us/' })}
              >
                <Image
                  style={{ width: 249, height: 110 }}
                  source={require('../assets/images/h4.jpg')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <WebView
          ref={WEBVIEW_REF}
          style={{ flex: 1 }}
          onNavigationStateChange=
          {this.onNavigationStateChange.bind(this)}
          source={{ uri: this.state.url }}
        />

      </View>
    );

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

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
}
function changeScreenOrientation() {
  Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
}
const styles = StyleSheet.create({
  topbar: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topbarText: {
    color: 'white'
  },
  topbarTextDisabled: {
    color: '#47676d'
  },
  container: {
    //paddingTop: 15, // Padding to push below the navigation bar
    flex: 1,
    backgroundColor: '#47676d',
  },
  body: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
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
