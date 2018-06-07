import { connect, MqttClient } from 'mqtt'
import { Buffer } from 'buffer'

export default class MqttUtil {
  url: string
  address: string
  conn?: MqttClient
  interval: any

  // peer_address => last_seen
  peers: Map<string, number> = new Map<string, number>()

  readonly broadcastChannel = 'broadcast'
  readonly broadcastInterval = 1000

  constructor (url: string, address: string) {
    this.url = url
    this.address = address
  }

  async connect () {
    if (this.conn!.connected) {
      return
    }

    this.conn = connect(this.url)
    await new Promise((resolve) => this.conn!.on('connect', resolve))

    this.conn!.subscribe(this.broadcastChannel)
    this.conn!.subscribe(this.address)

    this.conn!.on('message', this.handleMessage)

    this.interval = setInterval(this.broadcast, this.broadcastInterval)
  }

  disconnect () {
    clearInterval(this.interval)
    this.conn && this.conn.end()
    this.conn = undefined
  }

  broadcast () {
    this.conn!.publish(this.broadcastChannel, this.address)
  }

  handleMessage (topic: string, data: Buffer) {
    if (topic === this.broadcastChannel) {
      this.addPeer(data.toString())
    }
  }

  addPeer (address: string) {
    this.peers.set(address, Date.now())
  }

  getPeers () {
    const now = Date.now()
    return Array.from(this.peers.keys()).filter((address: string) => now - (this.peers.get(address) || 0) <= this.broadcastInterval * 2)
  }
}