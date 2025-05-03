'use client'

import Link from 'next/link'
import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownCircle,
  CircuitBoard,
  ShieldCheck,
  Link2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               H E R O  D A T A                             */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  { icon: ShieldCheck, label: 'Bitcoin-grade Security' },
  { icon: CircuitBoard, label: 'Smart-Contract Credentials' },
  { icon: Link2, label: 'Merge-Mined Anchors' },
] as const

/* -------------------------------------------------------------------------- */
/*                                   H E R O                                  */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  return (
    <section
      className='relative isolate overflow-hidden -mx-4 md:-mx-6'
      aria-label='Rootstock-powered hiring'
    >
      <BackgroundAura />
      <OrbitalNodes />

      <div className='relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-32 sm:py-40 md:grid-cols-2'>
        {/* ------------------------------------------------------------------ */}
        {/*                              Copy Block                             */}
        {/* ------------------------------------------------------------------ */}
        <div className='text-center md:text-left'>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='text-balance text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl'
          >
            Build&nbsp;Trust&nbsp;on&nbsp;
            <span className='text-hirestamp-gradient animate-hirestamp-gradient'>
              Bitcoin’s&nbsp;Smart&nbsp;Layer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
            className='mx-auto mt-6 max-w-xl text-lg/relaxed text-muted-foreground sm:text-xl'
          >
            HireStamp anchors credentials, payments and skill proofs directly on&nbsp;
            <strong>Rootstock</strong>, inheriting Bitcoin-level security for every hire.
          </motion.p>

          {/* Feature list */}
          <ul className='mt-10 flex flex-wrap items-center justify-center gap-4 font-medium md:justify-start'>
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className='inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-2 backdrop-blur'
              >
                <Icon className='h-5 w-5 text-primary' />
                <span className='whitespace-nowrap'>{label}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTAs */}
          <div className='mt-12 flex flex-wrap justify-center gap-4 md:justify-start'>
            <GradientButton href='/connect-wallet'>Launch App</GradientButton>
            <GradientButton href='/#pricing' tone='outline'>
              View Pricing
            </GradientButton>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*                               Visual                               */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='mx-auto md:mx-0'
        >
          <RotatingCube />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='mt-10 hidden md:block'
      >
        <ArrowDownCircle className='mx-auto h-8 w-8 animate-bounce' />
      </motion.div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                               V I S U A L S                                */
/* -------------------------------------------------------------------------- */

function BackgroundAura() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-20'>
      {/* Radial aura */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,190,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,255,190,0.06)_0%,transparent_75%)]' />

      {/* Gradient waves */}
      <div className='bg-hirestamp-gradient absolute -top-[40%] left-[10%] h-[120%] w-[120%] -rotate-45 opacity-25 blur-3xl' />
      <div className='bg-hirestamp-gradient absolute bottom-[-50%] right-[-20%] h-[120%] w-[120%] rotate-45 opacity-25 blur-3xl' />
    </div>
  )
}

/** Subtle orbital nodes representing Rootstock merge-mined hash satellites */
function OrbitalNodes() {
  return (
    <div className='pointer-events-none absolute inset-0 -z-10'>
      {[...Array(18)].map((_, i) => {
        const delay = (Math.random() * 6).toFixed(2)
        const duration = (10 + Math.random() * 6).toFixed(2)
        const size = Math.random() * 6 + 3
        const x = Math.random() * 100
        const y = Math.random() * 100
        return (
          <span
            key={i}
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: size,
              height: size,
              transformOrigin: 'center',
              left: `${x}%`,
              top: `${y}%`,
            }}
            className='absolute rounded-full bg-primary/80 shadow-lg animate-[orbit_12s_linear_infinite]'
          />
        )
      })}

      {/* Global keyframes for orbit */}
      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(-20px, -20px) rotate(180deg) scale(1.3);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

/** CSS-only rotating cube inspired by Rootstock blocks */
function RotatingCube() {
  return (
    <div className='relative size-64 sm:size-80 md:size-96'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='cube relative size-56 sm:size-72 md:size-80'>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className='absolute inset-0 rounded-3xl border border-white/10'
              style={{
                transform: `rotateY(${i * 90}deg) translateZ(15rem)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D cube styles */}
      <style jsx>{`
        .cube {
          transform-style: preserve-3d;
          animation: cube-spin 16s linear infinite;
        }
        @keyframes cube-spin {
          from {
            transform: rotateX(-20deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-20deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              U T I L I T I E S                             */
/* -------------------------------------------------------------------------- */

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
  const solid = tone === 'solid'
  return (
    <Button
      asChild
      size='lg'
      className={cn(
        'relative isolate overflow-hidden rounded-full px-8 py-3 font-semibold shadow-xl transition-transform duration-200 focus-visible:outline-none',
        solid
          ? 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-2xl'
          : 'bg-white/30 text-foreground backdrop-blur hover:bg-white/50',
        className,
      )}
      {...props}
    >
      <Link href={href}>
        <span className='relative z-10'>{children}</span>
        {solid && (
          <span
            aria-hidden='true'
            className='bg-hirestamp-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          />
        )}
      </Link>
    </Button>
  )
}