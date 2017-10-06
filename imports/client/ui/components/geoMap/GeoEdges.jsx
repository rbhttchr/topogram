import React, { PropTypes } from 'react'
import { FeatureGroup, Polyline } from 'react-leaflet'
import ui from 'redux-ui'

@ui()
export default class GeoEdges extends React.Component {
  static propTypes = {
    edges : PropTypes.array.isRequired,
    filterPanelIsOpen : PropTypes.bool,
    onClickElement : PropTypes.func.isRequired,
    selectElement : PropTypes.func.isRequired,
    unselectElement : PropTypes.func.isRequired,
    unselectAllElements : PropTypes.func.isRequired
  }

  render() {
    const { filterPanelIsOpen } = this.props
    const edges = this.props.edges.map( (e,i) => {
      return (
        <Polyline
          key={`edge-${i}`}
          color={e.selected ? 'yellow' : 'purple'}
          positions={e.coords}
          onClick={() => filterPanelIsOpen ?
            this.props.onClickElement(e)
            :
            null
          }
          onMouseDown={() => !filterPanelIsOpen ?
            this.props.selectElement(e)
            :
            null
          }
          onMouseUp={()=> !filterPanelIsOpen ?
            this.props.unselectAllElements()
            :
            null
          }
        />
      )
    }
    )

    return (
      <FeatureGroup name="GeoEdges"
        ref="edgesGroup">
        {edges}
      </FeatureGroup>
    )
  }
}
