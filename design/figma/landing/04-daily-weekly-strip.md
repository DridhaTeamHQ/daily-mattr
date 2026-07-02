# "The Daily / The Weekly" Strip — node 1:404 (1424x225)

(Node 1:274 is an identical understack copy — ignored.)

No image assets in this section.

Key specs:
- Container: 1424x225, bg #E5E5EA (Neutral 200), rounded 24px, padding px 56 / py 50
- Two columns, each 545px wide, gap between columns 164px
- Column title ("The Daily" / "The Weekly"): Be Vietnam Pro Regular 48px black, line-height normal
- Column body: Be Vietnam Pro Medium 18px #141417, line-height 1.46, gap from title 8px
  - Left: "One case study everyday. Thoughtfully curated."
  - Right: "Five short stories that shaped the week, delivered on the day you pick."

## Full design context (verbatim)

```tsx
export default function Frame250() {
  return (
    <div className="bg-[#e5e5ea] content-stretch flex flex-col items-start px-[56px] py-[50px] relative rounded-[24px] size-full" data-node-id="1:404">
      <div className="[word-break:break-word] content-stretch flex gap-[164px] items-start not-italic relative shrink-0" data-node-id="1:405">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[545px]" data-node-id="1:406">
          <p className="font-['Be_Vietnam_Pro:Regular'] leading-[normal] relative shrink-0 text-[48px] text-black w-full" data-node-id="1:407">
            The Daily
          </p>
          <p className="font-['Be_Vietnam_Pro:Medium'] leading-[1.46] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:408">{`One case study everyday. Thoughtfully curated. `}</p>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[545px]" data-node-id="1:409">
          <p className="font-['Be_Vietnam_Pro:Regular'] leading-[normal] relative shrink-0 text-[48px] text-black w-full" data-node-id="1:410">
            The Weekly
          </p>
          <p className="font-['Be_Vietnam_Pro:Medium'] leading-[1.46] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:411">
            Five short stories that shaped the week, delivered on the day you pick.
          </p>
        </div>
      </div>
    </div>
  );
}
```

Notes from tool output: styles used — Neutral 800 #141417, Neutral 200 #E5E5EA.
