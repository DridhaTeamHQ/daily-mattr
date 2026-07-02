# Article content — date group 2 — node 1:5661 "Frame 108" (1440x1161)

Second date-grouped block. Identical component system to date group 1 (see 02-article-content-group-1.md) with these differences:

1. Date header text is PAST-day style: "Monday, 27th June, 2026", colored Neutral 500 `#6B6B73` (vs `#0F0F11` for "Today"). Same Roboto Bold 24px, line-height 64px, with the same horizontal divider line filling the remaining row width.
2. The header row also contains a HIDDEN (visible:false in Figma) container 1:5668 with two 48x48 prev/next buttons: transparent fill, 1px stroke rgba(0,0,0,0.1), corner radius 12, chevron glyph 7x12 inside. Do not render by default; kept here in case pagination arrows are needed.
3. Left column bottom row (Frame 170, node 1:5736) = two half-width Featured Cards, same design as nodes 1:5536/1:5562 of group 1 (border rgba(28,28,30,0.1), radius 16, padding 32, title Roboto Bold 21px black, body Roboto Regular 16px/25px #6B6B73 with Roboto Medium "Read more" in #1C1C1E, source favicons 16px overlapped -4px + "5 sources").
4. Right column = same three compact Cards (473px wide, p-16px, radius 16) as group 1.

## Date header design context (node 1:5662, verbatim)

```jsx
const imgLine1 = "https://www.figma.com/api/mcp/asset/f5238a5d-53de-4525-a0cf-7a2d3037bd72"; // same divider line as article-date-divider-line.svg

export default function Container() {
  return (
    <div className="content-stretch flex gap-[670.03px] items-center justify-center px-[32px] relative size-full" data-node-id="1:5662" data-name="Container">
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="1:5663" data-name="Container">
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:5664">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="1:5665">
            <div className="[word-break:break-word] flex flex-col font-['Roboto:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[24px] whitespace-nowrap" data-node-id="1:5666" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[64px]">Monday, 27th June, 2026</p>
            </div>
            <div className="h-0 relative shrink-0 w-[1069px]" data-node-id="1:5667">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Half-width Featured Card row design context (node 1:5736 "Frame 170", verbatim)

```jsx
const imgColor = "https://www.figma.com/api/mcp/asset/68205087-413e-4715-94ae-b0e8251df2ef"; // = icon-youtube-color.svg
const imgX = "https://www.figma.com/api/mcp/asset/0da2096b-a3d6-4722-96da-d6ee1d68e465"; // = icon-x-social.svg
const imgFacebook = "https://www.figma.com/api/mcp/asset/18666023-e945-45d7-8ccb-61c1e8da0ae7"; // = icon-facebook.svg

export default function Frame170() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative size-full" data-node-id="1:5736">
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="1:5737" data-name="Featured Story Zone">
        <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[32px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5738" data-name="Featured Card">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:5739" data-name="Content">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-node-id="1:5740">
              <div className="flex flex-col font-['Roboto:Bold'] font-bold justify-center relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5741" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[normal]">An essay on fame, money, desire, ...</p>
              </div>
              <div className="flex flex-col font-['Roboto:Regular'] font-normal justify-center relative shrink-0 text-[#6b6b73] text-[0px] w-full" data-node-id="1:5742" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="text-[16px]">
                  <span className="leading-[25px]">{`The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. `}</span>
                  <span className="leading-[25px]">...</span>
                  <span className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[25px] text-[#1c1c1e]" style={{ fontVariationSettings: '"wdth" 100' }}>
                    Read more
                  </span>
                </p>
              </div>
            </div>
            <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5743">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5744">
                <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5745" data-name="Youtube">
                  <div className="absolute contents inset-0" data-node-id="1:5746" data-name="Layer 2">
                    <div className="absolute contents inset-0" data-node-id="1:5747" data-name="Color">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                    </div>
                  </div>
                </div>
                <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5754" data-name="X">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                </div>
                <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5758" data-name="Facebook">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5762" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[25px]">5 sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="1:5763" data-name="Featured Story Zone">
        <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[32px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5764" data-name="Featured Card">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:5765" data-name="Content">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-node-id="1:5766">
              <div className="flex flex-col font-['Roboto:Bold'] font-bold justify-center relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5767" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[normal]">An essay on fame, money, desire, ...</p>
              </div>
              <div className="flex flex-col font-['Roboto:Regular'] font-normal justify-center relative shrink-0 text-[#6b6b73] text-[0px] w-full" data-node-id="1:5768" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="text-[16px] whitespace-pre-wrap">
                  <span className="leading-[25px]">{`The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. `}</span>
                  <span className="leading-[25px]">{` ...`}</span>
                  <span className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[25px] text-[#1c1c1e]" style={{ fontVariationSettings: '"wdth" 100' }}>
                    Read more
                  </span>
                </p>
              </div>
            </div>
            <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5769">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5770">
                <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5771" data-name="Youtube">
                  <div className="absolute contents inset-0" data-node-id="1:5772" data-name="Layer 2">
                    <div className="absolute contents inset-0" data-node-id="1:5773" data-name="Color">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                    </div>
                  </div>
                </div>
                <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5780" data-name="X">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                </div>
                <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5784" data-name="Facebook">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5788" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[25px]">5 sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```
