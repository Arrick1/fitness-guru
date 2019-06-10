import React from 'react'
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components'

/* <----------- styled components -----------> */
const Container = styled.div`
  position: absolute;
  top: 47.5%;
  left: 18%;
  iframe {
    width: 650px;
    height: 400px;
  }
`
const Loader = styled.div`
  position: absolute;
  top: 71%;
  left: 48%;
`
/* <------- end of styled components --------> */

const YouTubeVideo = ({ video }) => {
  if (!video) {
    return (
      <Loader>
        <ClipLoader></ClipLoader>
      </Loader>
    )
  }
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
  return (
    <Container>
      <iframe
        title="a video"
        src={videoSrc}
      />
    </Container>
  )
}
export default YouTubeVideo