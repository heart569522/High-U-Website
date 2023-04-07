import React, { useEffect, useState } from 'react'
import anime from 'animejs'

type SplashScreenProps = {
  finishLoading: () => void
}

const SplashScreen = ({ finishLoading }: SplashScreenProps) => {
  const [isMounted, setIsMounted] = useState(false)

  const animate = () => {
    const loader = anime.timeline({
      complete: finishLoading,
    })

    loader.add({
      targets: "#logo",
      rotate: {
        value: 360,
        duration: 1500,
        easing: "easeInOutSine",
      },
      delay: 250,
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    animate()

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex h-screen items-center justify-center bg-[#9F9289]">
      <picture>
        <img id="logo" src="https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/asset%2Ficon.png?alt=media&token=8111fcd1-fe59-4514-91f6-103545bedadf" alt="" width={80} height={80} />
      </picture>
    </div>
  )
}

export default SplashScreen
