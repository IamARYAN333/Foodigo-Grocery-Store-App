import React from "react"
import { View } from 'react-native';

import Video from "react-native-video";


class VideoCom extends React.Component {
  videoBuffer = (isBuffer) => {

    //here you could set the isBuffer value to the state and then do something with it
    //such as show a loading icon
  }
  render() {

    return (
      <View style={{ backgroundColor: 'black' }}>
        <Video
          source={{ uri: 'https://media.istockphoto.com/videos/mother-and-daughter-shopping-in-supermarket-video-id1203263411' }}
          style={{ width: '100%', height: 220 }}
          // controls={true}
          onBuffer={this.videoBuffer}
          repeat={true}
          resizeMode={'contain'}
          playInBackground={true}
          ref={(ref) => {
            this.player = ref
          }} />
      </View>
    )
  }
}
export default VideoCom;