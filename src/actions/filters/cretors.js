import * as Actions from './'

export const toogleSettings = () => {
  return { type: Actions.TOOGLE_FILTER }
}

export const setFilter = name => {
  return { type: Actions.SET_FILTER, name }
}
export const resetFilters = () => ({ type: Actions.RESET_FILTERS })

export const filterConfirm = (siniesters, actives) => {
  return dispatch => {
  //   try {
  //     let filters = {
  //       siniesters,
  //       actives
  //     }
    dispatch(toogleSettings())
    dispatch(applyFilters())
    // } catch (e) {
    //   console.log(e.messaeg)
    // }
  }
}

const applyFilters = () => ({ type: Actions.APPLYFILTERS })
