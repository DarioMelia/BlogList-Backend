import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

import Button from "./Button"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} text={props.btnLabel} />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} text="Cancel" />
      </div>
    </>
  )
})
Togglable.displayName = "Togglable"
Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

export default Togglable
