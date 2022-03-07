import React from "react"
const Button = ({ onClick, text, type,name }) => {
  let delBtnStyles = {}
  if (name === "del") {
    delBtnStyles = {
      color: "white",
      backgroundColor: "red",
      padding: ".35rem .5rem",
      border: "none",
      cursor: "pointer",
    }
  }

  return (
    <button name={name} style={delBtnStyles} type={type} onClick={onClick}>
      {text}
    </button>
  )
}
export default Button
