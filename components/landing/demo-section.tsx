'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, PlayCircle, SlidersHorizontal } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

type Embed = {
  key: string
  title: string
  src: string
  link: string
}

const EMBEDS: Embed[] = [
  {
    key: 'deck',
    title: 'Pitch Deck',
    src: 'https://www.canva.com/design/xxxxx/view?embed',
    link: 'https://hirestamp.com/pitch-deck',
  },
  {
    key: 'video',
    title: 'Demo Video',
    src: 'https://www.youtube.com/embed/xxxxx',
    link: 'https://hirestamp.com/demo-video',
  },
]

/* -------------------------------------------------------------------------- */
/*                               D E M O                                      */
/* -------------------------------------------------------------------------- */

export default function DemoSection() {
  const [active, setActive] = useState<Embed>(EMBEDS[0])

  return (
    <section id='demo' className='bg-muted/40 py-32'>
      <div className='mx-auto max-w-6xl px-4'>
        {/* Heading */}
        <header className='mb-12 text-center'>
          <h2 className='text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl'>
            Experience&nbsp;HireStamp&nbsp;First-Hand
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg/relaxed'>
            Browse the investor deck or watch a concise product tour—no sign-in required.
          </p>
        </header>

        {/* Tabs controller */}
        <Tabs defaultValue={active.key} onValueChange={(k) => setActive(EMBEDS.find((e) => e.key === k)!)} className='mx-auto w-full max-w-3xl'>
          <TabsList className='mx-auto mb-8 flex w-fit gap-2 rounded-full bg-background/80 p-1 backdrop-blur'>
            {EMBEDS.map((e) => (
              <TabsTrigger
                key={e.key}
                value={e.key}
                className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors'
              >
                {e.key === 'video' ? <PlayCircle className='h-4 w-4' /> : <SlidersHorizontal className='h-4 w-4' />}
                {e.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {EMBEDS.map((e) => (
            <TabsContent key={e.key} value={e.key} className='focus-visible:outline-none'>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Card className='overflow-hidden rounded-3xl shadow-xl'>
                  <CardHeader className='flex flex-row items-center justify-between gap-4 bg-background/80 p-6 backdrop-blur'>
                    <CardTitle className='text-lg font-semibold'>{e.title}</CardTitle>
                    <Button asChild variant='ghost' size='icon' className='h-8 w-8'>
                      <Link href={e.link} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink className='h-4 w-4' />
                        <span className='sr-only'>Open in new tab</span>
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <div className='relative w-full overflow-hidden' style={{ aspectRatio: '16 / 9' }}>
                      <iframe
                        src={e.src}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        loading='lazy'
                        className='absolute inset-0 h-full w-full border-0'
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}