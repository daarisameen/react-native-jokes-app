import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Animated
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
      fadeValue: new Animated.Value(0)
    };
  }

  fetchJoke() {
    fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    })
      .then(res => res.json())
      .then(jsonResponse => {
        this.setJoke(jsonResponse.joke);
        this.showAnimation();
      })
      .catch(err => console.log(err));
  }

  setJoke(joke) {
    this.setState({ joke });
  }

  showAnimation = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000,
      delay: 2000
    }).start();
  };

  componentDidMount() {
    this.fetchJoke();
  }
  render() {
    let pic = {
      uri: './assets/troll.jpg'
    };
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.joke}</Text>
        <Animated.View
          style={[styles.animationView, { opacity: this.state.fadeValue }]}
        >
          <Image source={require('./assets/troll.jpg')} style={styles.image} />
          <Button title='One more!' onPress={this.fetchJoke.bind(this)} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundImage: 'linear-gradient(151deg, #000000 0%, #106ad2 100%)',
    backgroundColor: '#779ecb',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    marginTop: 100,
    color: 'white',
    textAlign: 'center',
    fontSize: 12
  },
  animationView: {
    marginBottom: 100
  },
  image: {
    width: 200,
    height: 200
  }
});
