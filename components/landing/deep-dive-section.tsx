'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Search, ShieldCheck } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ROLES = [
  {
    icon: BadgeCheck,
    title: 'Candidates',
    punch: 'Own your narrative — verified.',
    bullets: [
      'Single profile with signed proofs',
      'AI-graded SkillPass credentials',
      'Shareable wallet & PDF résumé',
    ],
  },
  {
    icon: Search,
    title: 'Recruiters',
    punch: 'Trust at first sight.',
    bullets: [
      'Filter talent by proofs & scores',
      'Visual pipeline & analytics',
      '1-click interview invites',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Issuers',
    punch: 'Verify once — trusted everywhere.',
    bullets: [
      'Self-serve onboarding & domain checks',
      'Batch-sign credentials in minutes',
      'Live revocation & audit logs',
    ],
  },
] as const

export default function DeepDiveSection() {
  return (
    <section id='deep-dive' className='relative isolate overflow-hidden py-24'>
      {/* soft radial background */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--hirestamp-gradient))] opacity-10 dark:opacity-20' />

      <div className='mx-auto max-w-6xl px-4'>
        <header className='text-center'>
          <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
            What You Get
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
            Tailored value for every player in the hiring loop.
          </p>
        </header>

        {/* responsive grid */}
        <ul className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {ROLES.map(({ icon: Icon, title, punch, bullets }) => (
            <motion.li
              key={title}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className='group/card'
            >
              {/* gradient halo wrapper */}
              <div className='bg-hirestamp-gradient rounded-3xl p-[2px]'>
                <Card className='border-border/60 bg-background/70 h-full rounded-[inherit] border backdrop-blur'>
                  <CardHeader className='flex flex-col items-center gap-4 py-10 text-center'>
                    <div className='bg-hirestamp-gradient inline-flex size-16 items-center justify-center rounded-full text-white shadow-lg'>
                      <Icon className='h-8 w-8' />
                    </div>
                    <CardTitle className='text-foreground text-2xl'>{title}</CardTitle>
                    <p className='text-muted-foreground max-w-xs text-sm'>{punch}</p>
                  </CardHeader>

                  <CardContent className='grid gap-3 px-8 pb-10'>
                    {bullets.map((b) => (
                      <div key={b} className='flex gap-2'>
                        <span className='mt-1 size-2 shrink-0 rounded-full bg-pink-500' />
                        <p className='text-muted-foreground text-sm leading-relaxed'>{b}</p>
                      </div>
                    ))}
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
