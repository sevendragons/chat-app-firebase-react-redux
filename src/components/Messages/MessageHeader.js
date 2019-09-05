import React from 'react'
import { Segment, Header, Input, Icon } from 'semantic-ui-react';
import './MessageHeader.css'

const MessageHeader = ({channelName, numUniqueUsers, handleSearchChange, searchLoading}) => {
  return (
    <Segment>

    {/* Channel Title */}
      <Header fluid="true" as="h2" flaoted="left" style={{marginBottom: 0}}>
        <span> 
          <span style={{marginRight: '16px'}}>{channelName}</span>
          <Icon 
                size="large" name={"star outline"} 
                color="violet"
                loading
          /> 
        </span>
        <Header.Subheader>{numUniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header flaoted="right">
        <Input size="mini"
          name="searchTerm"
          icon="search"
          placeholder="Search Messages"
          className="searchTerm"
          onChange={handleSearchChange}
          loading={searchLoading}
        />
      </Header>
    </Segment>
  )
}

export default MessageHeader
