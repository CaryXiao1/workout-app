// basically just a button that has a given styling set by a prop 'type' and has prop onClick, id, etc.
import PropTypes from 'prop-types'

/* General button class.
 * props: id - the button's id value.
 *        size - sm = small, m = medium, lg = large, scale = scale based on vmin; increases style for relative padding/text size.
 *        color - can be any CSS color, used to set background-color for the button.
 *        textColor - any CSS color, used to set color for the button
 *        onClick - function defined to be called when specified button is clicked.
 *        text - defines the text displayed within the button.
 */
const Button = ({id, size, color, backColor, onClick, text}) => {
    let className = 'btn ' + (size==='sm' ? 'btn-sm' : '') + (size==='m' ? 'btn-m' : '') + 
                        (size==='lg' ? 'btn-lg' : '') + (size==='scale' ? 'btn-scale' : '')
    let style = {backgroundColor: backColor, 
                 color: color, 
                 border: '1px solid ' + color}
    return (
        <button id={id} className={className} style={style} onClick={onClick}>{text}</button>
    )
}

Button.defaultProps = {
    id: '0',
    text: 'button',
    size: 'm', 
    color: 'white',
    backColor: 'transparent',
}
  
Button.propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
}

export default Button