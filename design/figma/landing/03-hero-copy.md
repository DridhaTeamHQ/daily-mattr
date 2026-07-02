# Hero Copy Overlay — node 1:64 (905x373)

Overlaid on top of the hero media (1:60). White text over dark video.

Assets (downloaded to /public/figma/):
- imgArrowUpRight → hero-arrow-up-right.svg — https://www.figma.com/api/mcp/asset/5e35bf7a-9249-4326-827f-2856abf92bab

Key specs:
- Column flex, gap 56, items centered
- Headline "LONG MATTR" (rendered uppercase): Be Vietnam Pro Bold, 166px, line-height 1.2, letter-spacing -13.28px (-0.08em), white, uppercase, nowrap
- Subcopy: Be Vietnam Pro Regular 18px, line-height 1.55, white, centered, manual break: "Get the stories worth knowing, shaped around the topics you follow. From markets and / AI to sports, culture and everything in between."
- Subscribe button ("Btn"): white bg, height 50, rounded 35px, padding-left 24 / padding-right 8 / py 15, gap 15
  - Label "Subscribe": Be Vietnam Pro SemiBold 18px, color #1b1810
  - Icon circle ("Square"): 34x34 black circle (rounded 100px) with centered 20x20 white arrow-up-right icon

## Full design context (verbatim)

```tsx
const imgArrowUpRight = "https://www.figma.com/api/mcp/asset/5e35bf7a-9249-4326-827f-2856abf92bab";

export default function Frame140() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-center relative size-full" data-node-id="1:64">
      <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="1:65">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 text-center text-white w-full" data-node-id="1:70">
          <p className="font-['Be_Vietnam_Pro:Bold'] leading-[1.2] relative shrink-0 text-[166px] tracking-[-13.28px] uppercase whitespace-nowrap" data-node-id="1:71">
            Long Mattr
          </p>
          <p className="font-['Be_Vietnam_Pro:Regular'] leading-[1.55] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap" data-node-id="1:72">
            {`Get the stories worth knowing, shaped around the topics you follow. From markets and `}
            <br aria-hidden />
            AI to sports, culture and everything in between.
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex gap-[15px] h-[50px] items-center justify-center pl-[24px] pr-[8px] py-[15px] relative rounded-[35px] shrink-0" data-node-id="1:73" data-name="Btn">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#1b1810] text-[18px] whitespace-nowrap" data-node-id="1:74">
          Subscribe
        </p>
        <div className="bg-black relative rounded-[100px] shrink-0 size-[34px]" data-node-id="1:75" data-name="Square">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="1:76" data-name="ArrowUpRight">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowUpRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
```
