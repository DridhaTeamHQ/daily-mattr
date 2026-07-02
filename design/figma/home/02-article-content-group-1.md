# Article content — date group 1 — node 1:5455 "Frame 105" (1440x1161)

First date-grouped block inside the Article content section (node 1:5453, 1440x2484).
Layout: date header row ("Today, 28th June, 2026" + horizontal rule filling remaining width), then a 2-column area (left column 895px of featured cards; right column flex-1 of compact cards). Page horizontal padding 32px, gap 8px between columns and between cards.

Local asset map (downloaded to /public/figma/):
- imgLine1 → article-date-divider-line.svg (dashed/solid horizontal rule next to date header)
- imgColor → icon-youtube-color.svg (16x16 YouTube source favicon)
- imgX → icon-x-social.svg (16x16 X favicon)
- imgFacebook → icon-facebook.svg (16x16 Facebook favicon)
- imgColor1 → icon-youtube-color-2.svg (variant of YouTube favicon)

## Figma design context (verbatim)

```jsx
const imgLine1 = "https://www.figma.com/api/mcp/asset/13023626-fcbd-446e-9731-e56c551873f1";
const imgColor = "https://www.figma.com/api/mcp/asset/688b35ed-6d8b-431f-ac12-dfc4ddc8a90c";
const imgX = "https://www.figma.com/api/mcp/asset/8e814a92-4c6c-4888-a5e3-718347934c9c";
const imgFacebook = "https://www.figma.com/api/mcp/asset/7bbc04a1-640b-4aef-87f7-80510871fb17";
const imgColor1 = "https://www.figma.com/api/mcp/asset/73afc3ef-b826-4039-b2ce-08dfd352262a";

export default function Frame105() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative size-full" data-node-id="1:5455">
      <div className="content-stretch flex gap-[670.03px] items-center justify-center px-[32px] relative shrink-0 w-full" data-node-id="1:5456" data-name="Container">
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="1:5457" data-name="Container">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:5458">
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:5459">
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Bold'] font-bold justify-center leading-[0] relative shrink-0 text-[#0f0f11] text-[24px] whitespace-nowrap" data-node-id="1:5460" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[64px]">Today, 28th June, 2026</p>
              </div>
              <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="1:5461">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgLine1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-start px-[32px] relative shrink-0 w-full" data-node-id="1:5469">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-[895px]" data-node-id="1:5470">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:5471" data-name="Featured Story Zone">
            <div className="bg-white border border-[#141417] border-solid content-stretch flex flex-col items-start p-[32px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5472" data-name="Featured Card">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:5473" data-name="Content">
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:5474">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:5475">
                    <div className="bg-[rgba(153,51,255,0.1)] content-stretch flex items-start px-[16px] py-[8px] relative rounded-[34px] shrink-0" data-node-id="1:5476" data-name="Tag">
                      <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#7900d9] text-[12px] uppercase whitespace-nowrap" data-node-id="1:5477" style={{ fontVariationSettings: '"wdth" 100' }}>{`Long story `}</p>
                    </div>
                    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex items-start px-[16px] py-[8px] relative rounded-[34px] shrink-0" data-node-id="1:5478" data-name="Tag">
                      <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[0] relative shrink-0 text-[#141417] text-[12px] uppercase whitespace-nowrap" data-node-id="1:5479" style={{ fontVariationSettings: '"wdth" 100' }}>
                        <span className="leading-[normal]">10</span>
                        <span className="leading-[normal]">{` min read`}</span>
                      </p>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-node-id="1:5480">
                    <div className="flex flex-col font-['Roboto:Bold'] font-bold justify-center relative shrink-0 text-[32px] text-black w-full" data-node-id="1:5481" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="leading-[44px]">An essay on fame, money, desire, and the dangerous ways artists navigate the digital age.</p>
                    </div>
                    <div className="flex flex-col font-['Roboto:Regular'] font-normal justify-center relative shrink-0 text-[#6b6b73] text-[18px] w-full" data-node-id="1:5482" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p>
                        <span className="leading-[30px]">{`Indian equities fell sharply on Friday as a sell-off in technology stocks erased gains from a five-session rally. The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. The Sensex and Nifty also declined, while investors booked profits and tracked global uncertainty. TCS, Infosys, HCLTech and Wipro were among the major laggards... `}</span>
                        <span className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[30px] text-[#1c1c1e]" style={{ fontVariationSettings: '"wdth" 100' }}>
                          Read more
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5483">
                  <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5484">
                    <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5485" data-name="Youtube">
                      <div className="absolute contents inset-0" data-node-id="1:5486" data-name="Layer 2">
                        <div className="absolute contents inset-0" data-node-id="1:5487" data-name="Color">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                        </div>
                      </div>
                    </div>
                    <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5494" data-name="X">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                    </div>
                    <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5498" data-name="Facebook">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                    </div>
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5502" style={{ fontVariationSettings: '"wdth" 100' }}>
                    <p className="leading-[25px]">5 sources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:5503" data-name="Featured Story Zone">
            <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[32px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5504" data-name="Featured Card">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:5505" data-name="Content">
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:5506">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:5507">
                    <div className="bg-[rgba(153,51,255,0.1)] content-stretch flex items-start px-[16px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:5508" data-name="Tag">
                      <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#7900d9] text-[12px] uppercase whitespace-nowrap" data-node-id="1:5509" style={{ fontVariationSettings: '"wdth" 100' }}>
                        Long story
                      </p>
                    </div>
                    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex items-start px-[16px] py-[8px] relative rounded-[34px] shrink-0" data-node-id="1:5510" data-name="Tag">
                      <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[0] relative shrink-0 text-[#141417] text-[12px] uppercase whitespace-nowrap" data-node-id="1:5511" style={{ fontVariationSettings: '"wdth" 100' }}>
                        <span className="leading-[normal]">10</span>
                        <span className="leading-[normal]">{` min read`}</span>
                      </p>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-node-id="1:5512">
                    <div className="flex flex-col font-['Roboto:Bold'] font-bold justify-center relative shrink-0 text-[32px] text-black w-full" data-node-id="1:5513" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="leading-[44px]">An essay on fame, money, desire, and the dangerous ways artists navigate the digital age.</p>
                    </div>
                    <div className="flex flex-col font-['Roboto:Regular'] font-normal justify-center relative shrink-0 text-[#6b6b73] text-[18px] w-full" data-node-id="1:5514" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p>
                        <span className="leading-[30px]">Indian equities fell sharply on Friday as a sell-off in technology stocks erased gains from a five-session rally. The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. The Sensex and Nifty also declined, while investors booked profits and tracked global uncertainty. TCS, Infosys, HCLTech and Wipro were among the major laggards...</span>
                        <span className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[30px] text-[#1c1c1e]" style={{ fontVariationSettings: '"wdth" 100' }}>
                          Read more
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5515">
                  <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5516">
                    <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5517" data-name="Youtube">
                      <div className="absolute contents inset-0" data-node-id="1:5518" data-name="Layer 2">
                        <div className="absolute contents inset-0" data-node-id="1:5519" data-name="Color">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                        </div>
                      </div>
                    </div>
                    <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5526" data-name="X">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                    </div>
                    <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5530" data-name="Facebook">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                    </div>
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5534" style={{ fontVariationSettings: '"wdth" 100' }}>
                    <p className="leading-[25px]">5 sources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:5535">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="1:5536" data-name="Featured Story Zone">
              <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[32px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5537" data-name="Featured Card">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:5538" data-name="Content">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-node-id="1:5539">
                    <div className="flex flex-col font-['Roboto:Bold'] font-bold justify-center relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5540" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="leading-[normal]">An essay on fame, money, desire, ...</p>
                    </div>
                    <div className="flex flex-col font-['Roboto:Regular'] font-normal justify-center relative shrink-0 text-[#6b6b73] text-[0px] w-full" data-node-id="1:5541" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="text-[16px]">
                        <span className="leading-[25px]">{`The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. `}</span>
                        <span className="leading-[25px]">...</span>
                        <span className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[25px] text-[#1c1c1e]" style={{ fontVariationSettings: '"wdth" 100' }}>
                          Read more
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5542">
                    <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5543">
                      <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5544" data-name="Youtube">
                        <div className="absolute contents inset-0" data-node-id="1:5545" data-name="Layer 2">
                          <div className="absolute contents inset-0" data-node-id="1:5546" data-name="Color">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                          </div>
                        </div>
                      </div>
                      <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5553" data-name="X">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                      </div>
                      <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5557" data-name="Facebook">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5561" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="leading-[25px]">5 sources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="1:5562" data-name="Featured Story Zone">
              <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[32px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5563" data-name="Featured Card">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:5564" data-name="Content">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-node-id="1:5565">
                    <div className="flex flex-col font-['Roboto:Bold'] font-bold justify-center relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5566" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="leading-[normal]">An essay on fame, money, desire, ...</p>
                    </div>
                    <div className="flex flex-col font-['Roboto:Regular'] font-normal justify-center relative shrink-0 text-[#6b6b73] text-[0px] w-full" data-node-id="1:5567" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="text-[16px] whitespace-pre-wrap">
                        <span className="leading-[25px]">{`The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. `}</span>
                        <span className="leading-[25px]">{` ...`}</span>
                        <span className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[25px] text-[#1c1c1e]" style={{ fontVariationSettings: '"wdth" 100' }}>
                          Read more
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5568">
                    <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5569">
                      <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5570" data-name="Youtube">
                        <div className="absolute contents inset-0" data-node-id="1:5571" data-name="Layer 2">
                          <div className="absolute contents inset-0" data-node-id="1:5572" data-name="Color">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                          </div>
                        </div>
                      </div>
                      <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5579" data-name="X">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                      </div>
                      <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5583" data-name="Facebook">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                      </div>
                    </div>
                    <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5587" style={{ fontVariationSettings: '"wdth" 100' }}>
                      <p className="leading-[25px]">5 sources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-node-id="1:5588">
          <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5589" data-name="Card">
            <div className="content-stretch flex flex-col gap-[8px] items-start pb-[16px] pt-[8px] px-[12px] relative shrink-0 w-full" data-node-id="1:5590" data-name="Content">
              <div className="[word-break:break-word] flex flex-col font-['Roboto:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5591" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[1.36]">An essay on fame, money, desire, and the dangerous ways artists</p>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] w-full" data-node-id="1:5592" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[25px]">ndian equities fell sharply on Friday as a sell-off in technology stocks erased gains from a five-session rally. The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. The Sensex and Nifty also declined, while investors booked profits and tracked global uncertainty. TCS, Infosys, HCLTech and Wipro were among the major laggards.</p>
              </div>
              <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5593">
                <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5594">
                  <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5595" data-name="Youtube">
                    <div className="absolute contents inset-0" data-node-id="1:5596" data-name="Layer 2">
                      <div className="absolute contents inset-0" data-node-id="1:5597" data-name="Color">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor1} />
                      </div>
                    </div>
                  </div>
                  <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5604" data-name="X">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                  </div>
                  <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5608" data-name="Facebook">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5612" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[25px]">5 sources</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5613" data-name="Card">
            <div className="content-stretch flex flex-col gap-[8px] items-start pb-[16px] pt-[8px] px-[12px] relative shrink-0 w-full" data-node-id="1:5614" data-name="Content">
              <div className="[word-break:break-word] flex flex-col font-['Roboto:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5615" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[1.36]">You wake up, check your phone, and start scrolling through.</p>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] w-full" data-node-id="1:5616" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[25px]">ndian equities fell sharply on Friday as a sell-off in technology stocks erased gains from a five-session rally. The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. The Sensex and Nifty also declined, while investors booked profits and tracked global uncertainty. TCS, Infosys, HCLTech and Wipro were among the major laggards.</p>
              </div>
              <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5617">
                <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5618">
                  <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5619" data-name="Youtube">
                    <div className="absolute contents inset-0" data-node-id="1:5620" data-name="Layer 2">
                      <div className="absolute contents inset-0" data-node-id="1:5621" data-name="Color">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                      </div>
                    </div>
                  </div>
                  <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5628" data-name="X">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                  </div>
                  <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5632" data-name="Facebook">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5636" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[25px]">5 sources</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[rgba(28,28,30,0.1)] border-solid content-stretch flex flex-col items-start p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:5637" data-name="Card">
            <div className="content-stretch flex flex-col gap-[8px] items-start pb-[16px] pt-[8px] px-[12px] relative shrink-0 w-full" data-node-id="1:5638" data-name="Content">
              <div className="[word-break:break-word] flex flex-col font-['Roboto:SemiBold'] font-semibold justify-center leading-[0] relative shrink-0 text-[21px] text-black w-full" data-node-id="1:5639" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[1.36]">If you asked me about AI a year ago, I would have told it is all hype.</p>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] w-full" data-node-id="1:5640" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[25px]">ndian equities fell sharply on Friday as a sell-off in technology stocks erased gains from a five-session rally. The Nifty IT index dropped after Accenture issued a weaker sales outlook, hurting sentiment around Indian software exporters. The Sensex and Nifty also declined, while investors booked profits and tracked global uncertainty. TCS, Infosys, HCLTech and Wipro were among the major laggards.</p>
              </div>
              <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:5641">
                <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:5642">
                  <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5643" data-name="Youtube">
                    <div className="absolute contents inset-0" data-node-id="1:5644" data-name="Layer 2">
                      <div className="absolute contents inset-0" data-node-id="1:5645" data-name="Color">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgColor} />
                      </div>
                    </div>
                  </div>
                  <div className="border border-solid border-white mr-[-4px] overflow-clip relative rounded-[1000px] shrink-0 size-[16px]" data-node-id="1:5652" data-name="X">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
                  </div>
                  <div className="border border-solid border-white overflow-clip relative rounded-[100px] shrink-0 size-[16px]" data-node-id="1:5656" data-name="Facebook">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFacebook} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#6b6b73] text-[16px] whitespace-nowrap" data-node-id="1:5660" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[25px]">5 sources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Design styles noted by Figma: Neutral 900 #0F0F11, Neutral 400 #B8B8C0, Primary 500 (main brand) #7900D9, Neutral 800 #141417.
