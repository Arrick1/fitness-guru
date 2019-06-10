import React        from 'react'
import SearchBar    from './SearchBar'
import youtube      from './api/youtube'
import VideoList    from './VideoList'
import YouTubeVideo from './YouTubeVideo'
import styled       from 'styled-components'

/* <----------- styled components -----------> */
const VideoContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const VideoResults = styled.div`
  float: right;
  width: 30%;
`
const MainContainer = styled.div`
  height: 73vh;
`
/* <------- end of styled components --------> */

class YoutubeComponent extends React.Component {
  state = {
    videos: [],
    selectedVideo: null
  }
  componentDidMount() {
    this.onTermSubmit('how to bench press')
  }
  onTermSubmit = async (term) => {
    const response = await youtube.get('./search', {
      params: {
        q: term
      }
    })
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[1]
    })
  }
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video })
  }
  render() {
    return (
      <div>
        <MainContainer>

          {/* COMPONENT */}
          <SearchBar
            onTermSubmit={this.onTermSubmit}
          />

          <VideoResults>

            {/* COMPONENT */}
            <VideoList
              onVideoSelect={this.onVideoSelect}
              videos={this.state.videos}
            />

          </VideoResults>
          <VideoContainer>

            {/* COMPONENT */}
            <YouTubeVideo
              video={ this.state.selectedVideo }
            />

          </VideoContainer>
        </MainContainer>
      </div>
    )
  }
}

export default YoutubeComponent