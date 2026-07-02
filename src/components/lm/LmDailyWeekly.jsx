import React from 'react'
import Reveal from './Reveal'

// "The Daily / The Weekly" strip — Figma node 1:404 (1424x225, #E5E5EA, r24).
export default function LmDailyWeekly() {
  return (
    <section className="px-[8px] pt-[16px]">
      <Reveal className="mx-auto w-full max-w-[1424px] rounded-[24px] bg-lm-200 px-6 py-8 sm:px-[56px] sm:py-[50px]">
        <div className="flex flex-col gap-8 md:flex-row md:gap-[164px]">
          <div className="flex w-full max-w-[545px] flex-col gap-[8px]">
            <p className="font-bevietnam text-[32px] leading-normal text-black sm:text-[clamp(36px,3.33vw,48px)]">The Daily</p>
            <p className="font-bevietnam text-[18px] font-medium leading-[1.46] text-lm-800">
              One case study everyday. Thoughtfully curated.
            </p>
          </div>
          <div className="flex w-full max-w-[545px] flex-col gap-[8px]">
            <p className="font-bevietnam text-[32px] leading-normal text-black sm:text-[clamp(36px,3.33vw,48px)]">The Weekly</p>
            <p className="font-bevietnam text-[18px] font-medium leading-[1.46] text-lm-800">
              Five short stories that shaped the week, delivered on the day you pick.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
