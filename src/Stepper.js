/**
 * A module for working with the various steps of the protocol
 */

function StateNotFoundError (state, mach) {
  this.name = 'StateNotFoundError'
  this.message = "The state '" + state + "' is not found on the state machine '"
  this.message += mach + "'"
  this.stack = (new Error()).stack
}
StateNotFoundError.prototype = new Error()

function StateNotFunctionError (state, mach) {
  this.name = 'StateNotFunctionError'
  this.message = "The state '" + state
  this.message += "' is not a function on the state machine '" + mach + "'"
  this.stack = (new Error()).stack
}
StateNotFunctionError.prototype = new Error()

class Stepper {
  /**
   * A class for keeping track of the steps of a protocol and executing them as
   * a finite state machine.
   *
   * :param: startState The initial state of the Stepper
   */
  constructor (startState, steps) {
    this.startState = startState
    this.state = startState
    this.states = steps
    this._stateSet = {}
    this.descriptions = {}
    this.tape = ''
    this.tapeCallback = function () {}
    for (var state of this.states) {
      this._stateSet[state] = true
      if ((typeof this['state' + state]) !== 'function') {
        throw new StateNotFunctionError(state, this)
      }
    }
    if (!this.isStep(startState)) {
      throw new StateNotFoundError(startState, this)
    }
  }

  reset () {
    this.state = this.startState
    this.tape = ''
  }

  setupDescriptions () {
    // Since this has to happen at the end of the constructor
    for (var state of this.states) {
      if (this['help' + state] !== undefined) {
        this.descriptions[state] = this['help' + state]
      } else {
        this.descriptions[state] = state
      }
    }
  }

  /**
   * A method to see if something is a step
   */
  isStep (name) {
    return !!this._stateSet[name]
  }

  /**
   * Update the step to execute. Does nothing if `step` is `undefined`
   */
  updateStep (step) {
    if (step !== undefined && this.state !== step) {
      this.state = step
    }
  }

  /**
   * Execute the next step in this state
   */
  step () {
    try {
      let newState = this['state' + this.state].apply(this, arguments)
      this.updateStep(newState)
    } catch (e) {
      if (e instanceof TypeError && !this.isStep(this.state)) {
        throw new StateNotFoundError(this.state, this)
      }
    }
  }

  onMessage (msg) {
    let stepNum = this.handleMessage(msg)
    this.updateStep(stepNum)
  }
}

export default Stepper
export {Stepper, StateNotFoundError, StateNotFunctionError}
