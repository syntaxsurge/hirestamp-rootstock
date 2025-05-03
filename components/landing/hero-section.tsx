// components/landing/hero-section.tsx
'use client'

import Link from 'next/link'
import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  TrendingUp,
  Shuffle,
  ArrowDownCircle,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               H E R O  D A T A                             */
/* -------------------------------------------------------------------------- */

const HERO_FEATURES = [
  { icon: ShieldCheck, label: 'On-Chain Verifications' },
  { icon: TrendingUp, label: 'Oracle-Priced Billing' },
  { icon: Shuffle, label: 'Randomised Quizzes' },
] as const

/* -------------------------------------------------------------------------- */
/*                                 C O M P O N E N T                          */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  return (
    <section
      className='relative isolate -mx-4 overflow-hidden md:-mx-6'
      aria-label='Rootstock-powered hiring'
    >
      {/* BACKGROUND LAYERS */}
      <GradientBackdrop />
      <GlassGrid />
      <SparkleCluster />

      <div className='relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:py-44'>
        {/* Eyebrow ------------------------------------------------------------- */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-primary mb-4 text-sm font-semibold uppercase tracking-widest'
        >
          Built on Rootstock Network
        </motion.span>

        {/* Headline ------------------------------------------------------------ */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'
        >
          <span className='animate-hirestamp-gradient text-hirestamp-gradient'>
            Verifiable&nbsp;Talent&nbsp;
          </span>
          Meets&nbsp;On-Chain&nbsp;Data
        </motion.h1>

        {/* Sub-headline -------------------------------------------------------- */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className='mx-auto mt-6 max-w-3xl text-lg/relaxed text-muted-foreground sm:text-xl md:text-2xl'
        >
          HireStamp turns every proof of skill, employment and payment into an immutable credential
          anchored by Rootstock’s oracle, data connector and randomness protocols.
        </motion.p>

        {/* Feature pills ------------------------------------------------------- */}
        <ul className='mt-10 flex flex-wrap items-center justify-center gap-4 font-medium text-foreground/90'>
          {HERO_FEATURES.map(({ icon: Icon, label }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur md:px-5'
            >
              <Icon className='h-5 w-5 text-orange-400 dark:text-orange-300' />
              <span className='whitespace-nowrap'>{label}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTAs ---------------------------------------------------------------- */}
        <div className='mt-12 flex flex-wrap justify-center gap-4'>
          <GradientButton href='/connect-wallet'>Launch App</GradientButton>
          <GradientButton href='/#pricing' tone='outline'>
            See Pricing
          </GradientButton>
        </div>

        {/* Scroll hint --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mt-20 hidden md:block'
        >
          <ArrowDownCircle className='mx-auto h-8 w-8 animate-bounce' />
        </motion.div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                              H E L P E R S                                 */
/* -------------------------------------------------------------------------- */

function GradientBackdrop() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-20 overflow-hidden'>
      {/* Radial glow */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]' />

      {/* Angled gradient wave (top-left → bottom-right) */}
      <div className='bg-hirestamp-gradient absolute -top-[35rem] -left-[28rem] h-[95rem] w-[95rem] -rotate-45 opacity-20 blur-3xl' />

      {/* Angled gradient wave (bottom-right → top-left) */}
      <div className='bg-hirestamp-gradient absolute -bottom-[35rem] -right-[28rem] h-[95rem] w-[95rem] rotate-45 opacity-20 blur-3xl' />

      {/* Subtle grid overlay */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 dark:opacity-10' />
    </div>
  )
}

/**
 * Frosted-glass grid layer – mimics Rootstock’s clean glassmorphism cards.
 */
function GlassGrid() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-10 grid grid-cols-3 gap-8 opacity-30 md:grid-cols-6'>
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className='bg-background/40 h-40 rounded-3xl border border-white/10 backdrop-blur-lg'
        />
      ))}
    </div>
  )
}

/**
 * Floating sparkle cluster for subtle motion parallax.
 */
function SparkleCluster() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-5 overflow-hidden'>
      {[...Array(24)].map((_, i) => {
        const delay = (Math.random() * 5).toFixed(2)
        const duration = (4 + Math.random() * 4).toFixed(2)
        const size = Math.random() * 8 + 4
        const left = Math.random() * 100
        return (
          <span
            key={i}
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: size,
              height: size,
              left: `${left}%`,
            }}
            className='absolute top-full animate-[float_up_linear_infinite] rounded-full bg-white/80 shadow-xl dark:bg-white/40'
          >
            <Sparkles className='h-full w-full' />
          </span>
        )
      })}
      <style jsx global>{`
        @keyframes float_up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

type GradientButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Button>, 'variant'> & {
  href: string
  tone?: 'solid' | 'outline'
}

function GradientButton({
  href,
  children,
  tone = 'solid',
  className,
  ...props
}: GradientButtonProps) {
  const isSolid = tone === 'solid'

  return (
    <Button
      asChild
      size='lg'
      className={cn(
        'relative isolate overflow-hidden rounded-full px-8 py-3 font-semibold shadow-xl transition-transform duration-200 focus-visible:outline-none',
        isSolid
          ? 'bg-white/10 text-white hover:-translate-y-0.5 hover:shadow-2xl'
          : 'bg-white/30 text-foreground backdrop-blur hover:bg-white/50',
        className,
      )}
      {...props}
    >
      <Link href={href}>
        <span className='relative z-10'>{children}</span>
        <span
          aria-hidden='true'
          className={cn(
            'absolute inset-0 rounded-full transition-opacity duration-300 ease-out',
            isSolid ? 'bg-hirestamp-gradient' : 'bg-hirestamp-gradient/60 opacity-0',
          )}
        />
      </Link>
    </Button>
  )
}