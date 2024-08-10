import React from "react"
import { Button, ButtonGroup } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { decrement, increment } from "./counterSlice"

const ContactPage = () => {
  const dispatch = useAppDispatch()
  const { data, title } = useAppSelector((state) => state.counter)
  return (
    <>
      <div>{title}</div>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(decrement(1))}
        >
          Decrement
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch(increment(1))}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch(increment(4))}
        >
          Increment By 4
        </Button>
      </ButtonGroup>
      <span>{data}</span>
    </>
  )
}

export default ContactPage
