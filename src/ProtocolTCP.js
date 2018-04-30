/**
 * An implementation for the protocol TCP
 */
import {Protocol, Sender, Receiver} from './Protocol'

class ProtocolTCP extends Protocol {
  constructor (tape, emitter) {
    super('Protocol TCP', new SenderTCP(tape, emitter), new ReceiverTCP(emitter))
  }
}

class SenderTCP extends Sender {
  constructor (tape, emitter) {
    super('Setup', ['Setup', 'Setup2', 'Begin', 'SetI', 'Inner', 'Read', 'Send', 'UpI', 'Max', 'If', 'IfOffset', 'IfI', 'Fi', 'InnerDone', 'Wait', 'End'], tape, emitter)
    this.helpSetup = 'windowsize := 4'
    this.helpSetup2 = 'offset := 0'
    this.helpBegin = 'while true do'
    this.helpSetI = '\ti := offset'
    this.helpInner = '\twhile (i != offset + windowsize) do'
    this.helpRead = '\t\tRead (Xi)'
    this.helpSend = '\t\tSend (Xi, i)'
    this.helpUpI = '\t\ti := i + 1'
    this.helpMax = '\t\tmax := BestReceived()'
    this.helpIf = '\t\tif (offset <= max) then'
    this.helpIfOffset = '\t\t\toffset := max + 1'
    this.helpIfI = '\t\t\ti := offset'
    this.helpFi = '\t\tend'
    this.helpInnerDone = '\tdone'
    this.helpWait = '\tWait'
    this.helpEnd = 'done'
    this.setupDescriptions()
    this.letter = undefined
    this.index = 0
    this.windowsize = 4
    this.offset = 0
    this.window = []
    this.popped = 0
    this.max = -1
  }

  reset () {
    super.reset()
    this.offset = 0
    this.index = 0
    this.window = []
    this.popped = 0
    this.max = -1
  }

  stateSetup () {
    return 'Setup2'
  }

  stateSetup2 () {
    return 'Begin'
  }

  stateBegin () {
    return 'SetI'
  }

  stateSetI () {
    this.index = this.offset
    return 'Inner'
  }

  stateInner () {
    if (this.index !== this.offset + this.windowsize) {
      return 'Read'
    } else {
      return 'Wait'
    }
  }

  stateRead () {
    if (this.popped <= this.index) {
      var letter = this.tape.pop()
      this.window.push(letter)
      this.popped += 1
      this.tapeCallback(letter)
    }
    this.letter = this.window[this.index - this.offset]
    return 'Send'
  }

  stateSend () {
    this.emit(this.letter, this.index)
    return 'UpI'
  }

  stateUpI () {
    this.index += 1
    return 'Max'
  }

  stateMax () {
    return 'If'
  }

  stateIf () {
    if (this.offset <= this.max) {
      return 'IfOffset'
    } else {
      return 'Fi'
    }
  }

  stateIfOffset () {
    var diff = (this.max + 1) - this.offset
    this.window.splice(0, diff)
    this.offset = this.max + 1
    return 'IfI'
  }

  stateIfI () {
    this.index = this.offset
    return 'Fi'
  }

  stateFi () {
    return 'Inner'
  }

  stateInnerDone () {
    return 'Wait'
  }

  stateWait () {
    return 'Begin'
  }

  stateEnd () {}

  handleMessage (msg) {
    if (msg.msg === '@') {
      if (this.max < msg.colour) {
        this.max = msg.colour
      }
    }
  }
}

class ReceiverTCP extends Receiver {
  constructor (emitter) {
    super('Skip', ['Skip', 'FirstAck', 'Begin', 'Write', 'Inner', 'Wait', 'Send', 'InnerDone', 'UpI', 'End'], emitter)
    this.helpSkip = 'Skip until (X0)'
    this.helpFirstAck = 'i := 0'
    this.helpBegin = 'while true do'
    this.helpWrite = '\tWrite (Xi)'
    this.helpInner = '\twhile !(received(Xi + 1)) do'
    this.helpWait = '\t\tWait'
    this.helpSend = '\t\tSend (Ack, i)'
    this.helpInnerDone = '\tdone'
    this.helpUpI = '\ti := i + 1'
    this.helpEnd = 'done'
    this.setupDescriptions()
    this.index = 0
    this.letter = ''
    this.messages = {}
  }

  reset () {
    super.reset()
    this.index = 0
    this.letter = ''
    this.messages = {}
  }

  stateSkip () {
    if (this.messages[0]) {
      return 'FirstAck'
    }
  }

  stateFirstAck () {
    this.index = 0
    return 'Begin'
  }

  stateBegin () {
    return 'Write'
  }

  stateWrite () {
    this.tapeCallback(this.messages[this.index])
    return 'Inner'
  }

  stateInner () {
    if (this.messages[this.index + 1]) {
      return 'UpI'
    } else {
      return 'Wait'
    }
  }

  stateWait () {
    return 'Send'
  }

  stateSend () {
    this.emit('@', this.index)
    return 'Inner'
  }

  stateInnerDone () {
    return 'UpI'
  }

  stateUpI () {
    this.index += 1
    return 'Begin'
  }

  stateEnd () { }

  handleMessage (msg) {
    this.messages[msg.colour] = msg.msg
  }
}

export default ProtocolTCP
export {ProtocolTCP, SenderTCP, ReceiverTCP}
