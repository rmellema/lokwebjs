/**
 * An implementation for the protocol A
 */
import {Protocol, Sender, Receiver} from './Protocol'

class ProtocolA extends Protocol {
  constructor (tape, emitter) {
    super('Protocol A', new SenderA(tape, emitter), new ReceiverA(emitter))
  }
}

class SenderA extends Sender {
  constructor (tape, emitter) {
    super('Begin', ['Begin', 'Read', 'Send', 'SendK', 'UpI', 'End'], tape, emitter)
    this.helpBegin = 'while true do'
    this.helpRead = '\tRead(Xi)'
    this.helpSend = '\tSend (Xi) until KsKr (Xi)'
    this.helpSendK = '\tSend KsKr (Xi) until KsKrKsKr (Xi)'
    this.helpUpI = '\ti := i + 1'
    this.helpEnd = 'done'
    this.setupDescriptions()
    this.letter = undefined
    this.index = 0
  }

  reset () {
    super.reset()
    this.letter = undefined
    this.index = 0
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
    this.emit(this.letter)
  }

  stateSendK () {
    this.emit('KsKr ' + this.letter)
  }

  stateUpI () {
    this.index += 1
    return 'Read'
  }

  stateEnd () {
  }

  handleMessage (msg) {
    if (this.state === 'Send' && msg.msg === 'Kr ' + this.letter) {
      return 'SendK'
    } else if (this.state === 'SendK' && msg.msg === 'KrKsKr ' + this.letter) {
      return 'UpI'
    }
  }
}

class ReceiverA extends Receiver {
  constructor (emitter) {
    super('Skip', ['Skip', 'Begin', 'Write', 'Send', 'Send2', 'UpI', 'End'], emitter)
    this.helpSkip = 'Skip until Kr (Xi)'
    this.helpBegin = 'while true do'
    this.helpWrite = '\tWrite (Xi)'
    this.helpSend = '\tSend Kr (Xi) until KrKsKr (Xi)'
    this.helpSend2 = '\tSend KrKsKr (Xi) until KrKsKrKsKr (Xi)'
    this.helpUpI = '\ti := i + 1'
    this.helpEnd = 'done'
    this.setupDescriptions()
    this.index = 0
    this.letter = ''
  }

  reset () {
    super.reset()
    this.index = 0
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
    this.emit('Kr ' + this.letter)
  }

  stateSend2 () {
    this.emit('KrKsKr ' + this.letter)
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
    } else if (this.state === 'Send' && msg.msg === 'KsKr ' + this.letter) {
      return 'Send2'
    } else if (this.state === 'Send2' && msg.msg !== 'KsKr ' + this.letter) {
      this.letter = msg.msg
      return 'UpI'
    }
  }
}

export default ProtocolA
export {ProtocolA, SenderA, ReceiverA}
