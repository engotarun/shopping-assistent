'use strict';

const sessionMap = {},
  fbIdMap = {};

/**
 * Stores the session information, includes sessionId, facebook userId and session'd context information
 */
class SessionStore {
  /**
   * Given session Id returns the facebook Id
   * @param {*} sid 
   */
  getFbId(sid) {
    return sessionMap[sid].fbid;
  }

/**
 * Creates and returns the session Id for a given facebook user Id
 * @param {*} fbid 
 */
  getSessionId(fbid) {
    if (!fbIdMap[fbid]) {
      let sid = new Date().toISOString();
      let state = {
        sid: sid,
        fbid: fbid,
        context: {}
      };
      fbIdMap[fbid] = state;
      sessionMap[sid] = state;
    }
    return fbIdMap[fbid].sid;
  }

/**
 * Gets the context object for a given Id
 * @param {sessionId/facebook userId} id 
 */
  getState(id) {
    let state = sessionMap[id] || fbIdMap[id];
    return state.context;
  }

/**
 * Sets the context object for a given session/facebook Id
 * @param {*} id 
 * @param {*} context 
 */
  setState(id, context) {
    if (sessionMap[id]) {
      let state = sessionMap[id];
      state.context = context;
      fbIdMap[state.fbid] = state;
    } else if (fbIdMap[id]) {
      let state = fbIdMap[id];
      state.context = context;
      sessionMap[state.sid] = state;
    }
  }

}

module.exports = new SessionStore();