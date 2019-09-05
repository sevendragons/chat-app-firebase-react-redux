import React from 'react'
import { Sidebar, Button, Divider, Menu, Icon } from 'semantic-ui-react';


const ColorPanel = props => {
  return (
    <Sidebar as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider/>
      <Button icon="plus" size='small' color="blue"/>
      {/* <Button animated='vertical' color="blue" size="mini">
        <Button.Content visible>Add</Button.Content>
        <Button.Content hidden>
          <Icon name="add"></Icon>
        </Button.Content>
      </Button> */}
    </Sidebar>
  )
}


export default ColorPanel
