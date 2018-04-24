/**
 * An implementation for the protocol B
 */
import {Protocol, Sender, Receiver} from './Protocol'

function getColour (index) {
  return (index % 2 === 0) ? '*' : '+'
}

class ProtocolB extends Protocol {
  constructor (tape, emitter) {
    super('Protocol B', new SenderB(tape, emitter), new ReceiverB(emitter))
  }
}

class SenderB extends Sender {
  constructor (tape, emitter) {
    super('Begin', ['Begin', 'Read', 'Send', 'UpI', 'End'], tape, emitter)
    this.helpBegin = 'while true do'
    this.helpRead = '\tRead(Xi)'
    this.helpSend = '\tSend (Xi, colour) until KsKr (Xi, colour)'
    this.helpUpI = '\ti := i + 1'
    this.helpEnd = 'done'
    this.setupDescriptions()
    this.letter = undefined
    this.index = 0
    this.colour = getColour(this.index)
  }

  stateBegin () {
    return 'Read'
  }

  stateRead () {
    this.letter = this.tape.pop()
    this.tapeCallback(this.letter)
    return 'Send'
  }

  stateSend () {
    this.emit(this.letter, this.colour)
  }

  stateUpI () {
    this.index += 1
    this.colour = getColour(this.index)
    return 'Read'
  }

  stateEnd () {
  }

  handleMessage (msg) {
    if (this.state === 'Send' && msg.msg === 'Kr ' + this.letter && msg.colour === this.colour) {
      return 'UpI'
    }
  }
}

class ReceiverB extends Receiver {
  constructor (emitter) {
    super('Skip', ['Skip', 'Begin', 'Write', 'Send', 'UpI', 'End'], emitter)
    this.helpSkip = 'Skip until Kr (Xi)'
    this.helpBegin = 'while true do'
    this.helpWrite = '\tWrite (Xi)'
    this.helpSend = '\tSend Kr (Xi, colour) until Kr (Xi + 1, colour)'
    this.helpUpI = '\ti := i + 1'
    this.helpEnd = 'done'
    this.setupDescriptions()
    this.index = 0
    this.colour = getColour(this.index)
    this.letter = ''
  }

  stateBegin () {
    return 'Skip'
  }

  stateSkip () {
  }

  stateWrite () {
    this.tapeCallback(this.letter)
    return 'Send'
  }

  stateSend () {
    this.emit('Kr ' + this.letter, this.colour)
  }

  stateUpI () {
    this.index += 1
    return 'Write'
  }

  stateEnd () {
  }

  handleMessage (msg) {
    if (this.state === 'Skip') {
      this.letter = msg.msg
      return 'Write'
    } else if (this.state === 'Send' && this.colour !== msg.colour) {
      this.letter = msg.msg
      this.colour = msg.colour
      return 'UpI'
    }
  }
}

export default ProtocolB
export {ProtocolB, SenderB, ReceiverB}
