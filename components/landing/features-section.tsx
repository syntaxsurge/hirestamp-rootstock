'use client'

import { TrendingUp, Shuffle, ShieldCheck, BookOpen } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'Oracle-Priced Billing',
    description:
      'Subscriptions are priced in RBTC but converted to USD on the fly using live on-chain price feeds.',
  },
  {
    icon: ShieldCheck,
    title: 'On-Chain Verifications',
    description: 'Every credential hash is anchored on-chain and viewable on the Rootstock Explorer.',
  },
  {
    icon: Shuffle,
    title: 'Randomised Quizzes',
    description:
      'Secure server-side randomness seeds each quiz attempt ensuring fair, non-predictable assessment for candidates.',
  },
  {
    icon: BookOpen,
    title: 'Open Standards',
    description: 'Verifiable Credentials, ERC-721 tokens and did:rsk identifiers by default.',
  },
]

export default function FeaturesSection() {
  return (
    <section id='features' className='bg-muted/50 py-20'>
      <div className='mx-auto max-w-6xl px-4 text-center'>
        <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
          Key Features
        </h2>

        <div className='mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className='group border-border/60 bg-background/70 relative flex flex-col items-center overflow-hidden rounded-2xl border p-8 backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-2xl'
            >
              <div className='bg-hirestamp-gradient mb-4 inline-flex size-12 items-center justify-center rounded-full text-white shadow-lg'>
                <Icon className='h-6 w-6' />
              </div>

              <h3 className='text-foreground text-lg font-semibold'>{title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>{description}</p>

              <div className='pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-15'>
                <div className='bg-hirestamp-gradient absolute inset-0 blur-3xl' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}