import { P2P, fakeStorage } from 'go-network-framework'
import { Observable } from 'rxjs'

import { config } from './config'

export const checkP2PRaw = (mqttUrl: string) => {
  const msg = 'TEST-MESSAGE-' + Date.now()
  const add2 = 'TEST-2-' + Date.now()

  const p1 = new P2P({
    address: 'TEST_1',
    mqttUrl,
    storage: fakeStorage() // todo: make storage optional and use fakeStorage as default
  })

  const p2 = new P2P({
    address: add2,
    mqttUrl,
    storage: fakeStorage() // todo: make storage optional and use fakeStorage as default
  })

  return Observable.merge(
    Observable.fromEvent(p2, 'message-received')
      .filter(m => m === msg)
      .mapTo(true)
      .take(1),
    Observable.defer(() => {
      p1.send(add2, msg)
      return Observable.empty()
    })
  )
    .timeout(500)
    .retryWhen(errs => errs.delay(1500))
    .finally(() => {
      p1.dispose()
      p2.dispose()
    }) as Observable<boolean>
}

export const checkP2P = config.switchMap(c => !c
  ? Observable.of(false) :
  checkP2PRaw(c.urls.mqtt).startWith(false)
)
