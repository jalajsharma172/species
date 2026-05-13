import { useRef } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import RawShowcase from '../components/RawShowcase'
import GrinderSection from '../components/GrinderSection'
import PowderSection from '../components/PowderSection'
import PackagingSection from '../components/PackagingSection'
import FinalReveal from '../components/FinalReveal'

export default function Home(){
  const particleRef = useRef(null)

  return (
    <Layout particleRef={particleRef}>
      <main className="relative">
        <Hero particleRef={particleRef} />
        <RawShowcase particleRef={particleRef} />
        <GrinderSection particleRef={particleRef} />
        <PowderSection particleRef={particleRef} />
        <PackagingSection particleRef={particleRef} />
        <FinalReveal particleRef={particleRef} />
      </main>
    </Layout>
  )
}
