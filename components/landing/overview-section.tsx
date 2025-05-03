'use client'

import { motion } from 'framer-motion'
import { CircuitBoard, Database, Globe2, Zap } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               F E A T U R E S                              */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: CircuitBoard,
    title: 'Smart-Layer Native',
    text: 'Every credential call runs directly on Rootstock’s EVM—no bridges, no wrappers.',
  },
  {
    icon: Database,
    title: 'Immutable Anchors',
    text: 'Credential hashes are persisted forever in RBTC-backed storage slots.',
  },
  {
    icon: Globe2,
    title: 'Globally Verifiable',
    text: 'Open W3C standards guarantee wallet-agnostic proofs across any marketplace.',
  },
  {
    icon: Zap,
    title: 'Real-Time Feeds',
    text: 'On-chain events stream to the UI via SSE for instant status updates.',
  },
] as const

/* -------------------------------------------------------------------------- */
/*                               C O M P O N E N T                            */
/* -------------------------------------------------------------------------- */

export default function OverviewSection() {
  return (
    <section
      id='overview'
      className='relative isolate overflow-hidden bg-background py-32'
      aria-label='Rootstock technical pillars'
    >
      {/* diffused radial backdrop */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,143,120,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(0,143,120,0.07)_0%,transparent_70%)]' />

      <div className='mx-auto max-w-6xl px-4'>
        {/* Heading */}
        <header className='mb-20 text-center'>
          <h2 className='text-balance text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Built for Provable&nbsp;Trust
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg/relaxed'>
            HireStamp fuses every Rootstock primitive into the credential flow—so integrity is not
            an add-on, it’s the default.
          </p>
        </header>

        {/* Feature grid */}
        <ul className='grid gap-10 md:grid-cols-2'>
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
              className='group/card'
            >
              {/* glowing border wrapper */}
              <div className='bg-gradient-to-br from-primary/40 to-secondary/40 rounded-3xl p-[1px] group-hover/card:shadow-xl transition-shadow'>
                <Card className='border-border/60 bg-background/80 rounded-[inherit] backdrop-blur'>
                  <CardHeader className='flex flex-row items-center gap-4 p-8'>
                    <div className='flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner'>
                      <Icon className='h-7 w-7' />
                    </div>
                    <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
                  </CardHeader>

                  <CardContent className='-mt-4 pb-8 pl-[4.5rem] pr-8'>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{text}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}