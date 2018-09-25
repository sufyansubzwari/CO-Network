import { EVENT_UPDATE_USER } from "../types";

/**
 * @namespace Actions
 * @summary Client side reusable actions (redux).
 */
const Actions = {};

//------------------------------------------------------------------------------
Actions.setUser = status => ({
  type: EVENT_UPDATE_USER,
  status
});

//------------------------------------------------------------------------------

export default Actions;
