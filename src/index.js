import {
  K
} from '@nuware/functions'

const Effect = f => ({
  map: g => Effect(x => g(f(x))),
  join: x => f(x),
  chain: g => Effect(f).map(g).join(),
  ap: m => m.map((g) => g(f())),
  inspect: () => `Effect(${f})`
})

Effect.of = x => Effect(K(x))

// export const liftA2 = f => a => b => b.ap(a.map(f))
// export const liftA3 = f => a => b => c => c.ap(b.ap(a.map(f)))

export default Effect
