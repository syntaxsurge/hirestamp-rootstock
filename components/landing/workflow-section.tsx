'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const steps = [
  'Create account & workspace',
  'Mint did:rsk identity',
  'Upload & verify credentials',
  'Pass AI skill quizzes',
  'Get discovered by recruiters',
]

export default function WorkflowSection() {
  return (
    <section id='workflow' className='bg-background py-28'>
      <div className='mx-auto max-w-4xl px-4'>
        <h2 className='text-center text-3xl font-extrabold tracking-tight sm:text-4xl'>
          Journey&nbsp;to&nbsp;Proof
        </h2>

        <ol className='relative mt-16 space-y-12 border-l-2 border-primary/30 pl-6'>
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className='relative'
            >
              <span className='bg-background absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary text-primary shadow-sm'>
                <CheckCircle className='h-4 w-4' />
              </span>
              <h3 className='text-lg font-semibold'>{s}</h3>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}