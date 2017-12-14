import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import './PercentageBar.css'

class PercentageBar extends PureComponent {
  static propTypes = {
    green: PropTypes.number,
    yellow: PropTypes.number,
    red: PropTypes.number,
    totalCount: PropTypes.number,
  }
  render(){
    const { green, red, yellow, totalCount } = this.props

    return(
      <div className= "PercentageBar">
        <div className="FlexGreen"  style={{width: green * (100/(totalCount)) + '%'  }}></div>
        <div className="FlexYellow" style={{width: yellow * (100/(totalCount)) + '%'  }}></div>
        <div className="FlexRed" style={{width: red * (100/(totalCount)) + '%'  }}></div>

      </div>

    )
  }
}

export default PercentageBar
