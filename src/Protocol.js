/**
 * A module for defining the various protocols for the simulation
 */

import Stepper from './Stepper'

class Protocol {
  constructor (name, sender, receiver) {
    this.name = name
    this.sender = sender
    this.receiver = receiver
  }
}

class Sender extends Stepper {
  constructor (startState, steps, tape, emitter) {
    super(startState, steps)
    this.tape = tape.split('')
    this.tape.reverse()
    this.emit = function (msg, colour) {
      emitter({msg: msg, colour: colour, origin: 'sender'})
    }
  }
}

class Receiver extends Stepper {
  constructor (startState, steps, emitter) {
    super(startState, steps)
    this.tape = ''
    this.emit = function (msg, colour) {
      emitter({msg: msg, colour: colour, origin: 'receiver'})
    }
  }
}

export {Protocol, Sender, Receiver}
