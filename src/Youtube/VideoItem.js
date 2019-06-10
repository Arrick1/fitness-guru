import React  from 'react'
import styled from 'styled-components'

/* <----------- styled components -----------> */
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  > img {
    max-width: 180px;
  }
`
const Span = styled.span`
  display: inline-block;
  width: 16em;
  padding-left: 1em;
`
const Section = styled.section`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 1.7em;
/* <------- end of styled components --------> */
`

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <Section>
      <Span>{video.snippet.title}</Span>
        <Wrapper
          onClick={() => onVideoSelect(video)}
        >
          <img
            alt={video.snippet.title}
            src={video.snippet.thumbnails.medium.url}
          />
      </Wrapper>
    </Section>
  )
}

export default VideoItem