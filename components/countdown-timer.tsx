"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6">
        {[
          { value: timeLeft.days, label: "Días" },
          { value: timeLeft.hours, label: "Horas" },
          { value: timeLeft.minutes, label: "Minutos" },
          { value: timeLeft.seconds, label: "Segundos" },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 rounded-lg p-5 flex flex-col items-center">
              <span className="font-cartoon text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue min-w-[2.5rem] text-center">
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
              {index === 0 && <span className="absolute top-2 right-2 text-lg animate-float-fast">✨</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
