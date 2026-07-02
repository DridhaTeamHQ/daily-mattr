# Footer — node 1:202 (1440x799)

No image assets — all text.

## Key specs
- Section: 1440x799, bg #E5E5EA (Neutral 200)
- Top content block: centered 1253px wide, top 69, height 228, column flex gap 32, items-end
  - Left brand block (343px):
    - Wordmark line: "theMattr'." (Playfair — "the" ExtraBold 24px tracking -1.2px; "Mattr." Black 32px, tracking -1.6px/-2.56px, apostrophe #6b6b73) + " your deeper read." (Roboto SemiBold 32px, lh 1.26, #141417), gap 4
    - Blurb: Roboto Regular 18px #4A4A52, lh 1.46: "Long Matters brings you the story behind the headline — with context, clarity, and perspective that help you understand what really matters." (gap 16 below wordmark)
  - Right link columns, gap 63:
    - Column heading: Roboto Regular 14px, uppercase, tracking 0.7px, #6b6b73; gap to links 16
    - Links: Roboto Medium 14px #141417, lh 1.46, vertical gap 12
    - "PRODUCT": Home, What is Mattr, Contact Us, Download APP (col width 133)
    - "LONG MATTR": What is LONG MATTR, Categories, Subscribe
  - Copyright (right-aligned, below, gap 32): Roboto Regular 18px #4A4A52, lh 1.46 — "© 2026 Dridhatechnologies. All rights reserved."
- Giant wordmark "DailyMattr'.": absolute left 44 / top 494.22, #141417
  - "Daily": Playfair ExtraBold 251.347px, tracking -12.5674px
  - "Ma": Playfair Black 335.129px, tracking -16.7565px
  - "tt": Playfair Black 335.129px, tracking -26.8103px
  - "r": Playfair Black 335.129px
  - "'": Playfair Black 335.129px, color #6b6b73
  - ".": Playfair Black 335.129px
  - fontVariationSettings: "opsz" 12, "wdth" 100 (Playfair variable font)
  - Wordmark bleeds off the bottom of the section (crop with overflow hidden)

## Full design context (verbatim)

```tsx
export default function Frame144() {
  return (
    <div className="[word-break:break-word] bg-[#e5e5ea] relative size-full" data-node-id="1:202">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[32px] h-[228px] items-end left-[calc(50%-0.5px)] top-[69px] w-[1253px]" data-node-id="1:203">
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="1:204">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[343px]" data-node-id="1:205">
            <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 text-[#141417] whitespace-nowrap" data-node-id="1:206">
              <p className="font-['Be_Vietnam_Pro:Bold'] leading-[0] not-italic relative shrink-0 text-[0px]" data-node-id="1:207">
                <span className="font-['Playfair:ExtraBold'] font-extrabold leading-[normal] text-[24px] tracking-[-1.2px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
                  the
                </span>
                <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px] tracking-[-1.6px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
                  Ma
                </span>
                <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px] tracking-[-2.56px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
                  tt
                </span>
                <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
                  r
                </span>
                <span className="font-['Playfair:Black'] font-black leading-[normal] text-[#6b6b73] text-[32px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
                  ’
                </span>
                <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
                  .
                </span>
              </p>
              <p className="font-['Roboto:SemiBold'] font-semibold leading-[1.26] relative shrink-0 text-[32px] text-center" data-node-id="1:208" style={{ fontVariationSettings: '"wdth" 100' }}>
                your deeper read.
              </p>
            </div>
            <p className="font-['Roboto:Regular'] font-normal leading-[1.46] min-w-full relative shrink-0 text-[#4a4a52] text-[18px] w-[min-content]" data-node-id="1:209" style={{ fontVariationSettings: '"wdth" 100' }}>
              Long Matters brings you the story behind the headline — with context, clarity, and perspective that help you understand what really matters.
            </p>
          </div>
          <div className="content-stretch flex gap-[63px] items-start relative shrink-0 text-[14px]" data-node-id="1:210">
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[133px]" data-node-id="1:211">
              <p className="font-['Roboto:Regular'] font-normal leading-[1.26] relative shrink-0 text-[#6b6b73] tracking-[0.7px] uppercase w-full" data-node-id="1:212" style={{ fontVariationSettings: '"wdth" 100' }}>
                Product
              </p>
              <div className="content-stretch flex flex-col font-['Roboto:Medium'] font-medium gap-[12px] items-start leading-[1.46] relative shrink-0 text-[#141417] w-full" data-node-id="1:213">
                <p className="relative shrink-0 w-full" data-node-id="1:214" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Home
                </p>
                <p className="relative shrink-0 w-full" data-node-id="1:215" style={{ fontVariationSettings: '"wdth" 100' }}>
                  What is Mattr
                </p>
                <p className="relative shrink-0 w-full" data-node-id="1:216" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Contact Us
                </p>
                <p className="relative shrink-0 w-full" data-node-id="1:217" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Download APP
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-node-id="1:218">
              <p className="font-['Roboto:Regular'] font-normal leading-[1.26] relative shrink-0 text-[#6b6b73] tracking-[0.7px] uppercase w-full" data-node-id="1:219" style={{ fontVariationSettings: '"wdth" 100' }}>
                LONG MATTR
              </p>
              <div className="content-stretch flex flex-col font-['Roboto:Medium'] font-medium gap-[12px] items-start leading-[1.46] relative shrink-0 text-[#141417] w-full" data-node-id="1:220">
                <p className="relative shrink-0 whitespace-nowrap" data-node-id="1:221" style={{ fontVariationSettings: '"wdth" 100' }}>
                  What is LONG MATTR
                </p>
                <p className="min-w-full relative shrink-0 w-[min-content]" data-node-id="1:222" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Categories
                </p>
                <p className="min-w-full relative shrink-0 w-[min-content]" data-node-id="1:223" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Roboto:Regular'] font-normal leading-[1.46] relative shrink-0 text-[#4a4a52] text-[18px] text-right whitespace-nowrap" data-node-id="1:224" style={{ fontVariationSettings: '"wdth" 100' }}>
          © 2026 Dridhatechnologies. All rights reserved.
        </p>
      </div>
      <p className="absolute font-['Be_Vietnam_Pro:Bold'] leading-[0] left-[44px] not-italic text-[#141417] text-[0px] top-[494.22px] whitespace-nowrap" data-node-id="1:225">
        <span className="font-['Playfair:ExtraBold'] font-extrabold leading-[normal] text-[251.347px] tracking-[-12.5674px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          Daily
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[335.129px] tracking-[-16.7565px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          Ma
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[335.129px] tracking-[-26.8103px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          tt
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[335.129px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          r
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[#6b6b73] text-[335.129px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          ’
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[335.129px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          .
        </span>
      </p>
    </div>
  );
}
```

Notes from tool output: styles used — Neutral 800 #141417, Neutral 600 #4A4A52, Neutral 500 #6B6B73, Neutral 200 #E5E5EA.
