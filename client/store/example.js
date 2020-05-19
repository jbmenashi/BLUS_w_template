/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_EXAMPLE_DATA = 'GOT_EXAMPLE_DATA'

/**
 * INITIAL STATE
 */
const initialState = {
  exampleData: []
}

/**
 * ACTION CREATORS
 */
const gotExampleData = data => ({type: GOT_EXAMPLE_DATA, data})

/**
 * THUNK CREATORS
 */

export const getExampleData = optionalArg => async dispatch => {
  try {
    const {data} = await axios.get(`/some_route/${optionalArg}`)
    dispatch(gotExampleData(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_EXAMPLE_DATA:
      return {...state, data: action.data}
    default:
      return state
  }
}
