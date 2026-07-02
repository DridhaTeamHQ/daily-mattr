# Categories Section — node 1:282 (1440x2389)

(Node 1:80 is an identical understack copy — ignored.)

Heading "Choose the categories that matter to you" + 3x3 grid of category cards.

## Asset URLs from get_design_context (downloaded to /public/figma/)
- imgIconsansLinearTick1 → cat-icon-tick.svg — https://www.figma.com/api/mcp/asset/f617979e-e1d2-4e82-b65a-b81042191055
- img...18FreshVisionBoard...1 (Sports card image) → category-sports.png — https://www.figma.com/api/mcp/asset/0d359b07-8f1e-433e-bc4c-76197958f8eb
- img...10FreshHomeOfficeDecor...2 (Entertainment card image) → category-entertainment.png — https://www.figma.com/api/mcp/asset/c9126325-766e-4c6c-926d-8668228a6929
- img...WeddingCake...1 (National + Politics & Power card image) → category-national-politics.png — https://www.figma.com/api/mcp/asset/78aedb28-6df4-41eb-9b6f-5284a8bc0e9f
- img...WeddingCake...2 (International base layer image) → category-international-base.png — https://www.figma.com/api/mcp/asset/1481911a-efa4-4fb9-acc4-da39a0f32ac4
- img...WeekendGetaway...1551 (International top layer image — globe in hand) → category-international.png — https://www.figma.com/api/mcp/asset/ed7e758e-52e4-4c8e-ae98-0b14129c592c
- img...WeekendGetaway...1300 (Real Estate card image) → category-real-estate.png — https://www.figma.com/api/mcp/asset/2be2f338-033d-42f9-bf75-3e51743eed11
- imgEllipse3 (button glow) → cat-button-glow.svg — https://www.figma.com/api/mcp/asset/d5184e00-1f5e-4aaa-be91-93127472f341
- imgAdd (plus icon) → cat-icon-add.svg — https://www.figma.com/api/mcp/asset/b516515c-ce90-40d3-bf25-229892f8da87

NOTE: Three card image fills were NOT exported as URL constants by get_design_context (nodes 1:295 Technology & AI, 1:308 Money & Stock Markets, 1:371 Wellness Daily). They were recovered via download_assets on 1:282 (raw source images) — see the raw-images list at the bottom.

## Key specs
- Section: 1440x2389, bg white
- Header row (node 1:283): centered 1326px wide, top 71; left column 611px, right blurb 539px right-aligned
  - Eyebrow: "EXPLORE CATEGORIES" — Be Vietnam Pro SemiBold 18px, letter-spacing 2.7px, line-height 1.26; the word "CATEGORIES" sits on a black rectangle (144x17 at ml 111 / mt 3) and renders white — highlight-marker effect
  - H2: "Choose the categories / that matter to you" — Be Vietnam Pro Medium 56px, tracking -2.8px, line-height 1.26, #141417, gap from eyebrow 24
  - Right blurb: Be Vietnam Pro Medium 18px, line-height 1.46, #141417, text-right, width 539
- Grid (node 1:290): centered 1329px wide, top 329; 3 rows x 3 cards, gap 24 both axes; each card flex 1 (~426px)
- Card anatomy:
  - rounded 24px, overflow hidden, pastel bg
  - image area: 263px tall, full width (images positioned/cropped absolutely, over a #d9d9d9 placeholder rect 589x297)
  - content: padding 16, gap 12 from image; title→desc gap 8; desc→button gap 32
  - Title: Be Vietnam Pro Medium 32px, tracking -1.6px, black, line-height 1.46
  - Description: Be Vietnam Pro Regular 18px, #141417, line-height 1.46
  - Button (unselected "Subscribe"): bg white, border 1px rgba(0,0,0,0.1), rounded 50px, px 24 / py 16, gap 8, 16px add icon, label Roboto SemiBold 15px #141417
  - Button (selected "Selected"): bg #1c1c1e, rounded 50px, px 24 / py 16, gap 8, 20px tick icon, label Roboto SemiBold 15px white; first card variant also has shadow 0 6 25 rgba(0,0,0,0.15); decorative glow ellipse (251x8 at left -70/-71, top 62/63)
- Card bg colors:
  | Card | bg |
  |---|---|
  | Technology and AI | #EBF3FF (selected state) |
  | Money & Stock Markets | #F5F0FF (selected state) |
  | Sports | #EDF7F1 |
  | Entertainment | #F4F4F6 |
  | National | #EFF0E6 |
  | International | #FFF2EB |
  | Wellness Daily | #E9F4EB |
  | Politics & Power | #ECE6F0 |
  | Real Estate | #EBF4FF |
- Card copy:
  - Technology and AI — "Stay ahead with AI breakthroughs, startup launches, and emerging technologies." (Selected)
  - Money & Stock Markets — "Get market updates, business trends, investing insights, IPOs, personal finance." (Selected)
  - Sports — "Match highlights, player stories, tournaments, transfers."
  - Entertainment — "Movies, OTT releases, celebrities, music, pop culture, and viral entertainment stories."
  - National — "India's biggest stories, government policies, infrastructure,everything shaping the nation."
  - International — "Match highlights, player stories, tournaments, transfers." (placeholder copy in design)
  - Wellness Daily — "Movies, OTT releases, celebrities, music, pop culture, and viral entertainment stories." (placeholder copy in design)
  - Politics & Power — "India's biggest stories, government policies, infrastructure,everything shaping the nation."
  - Real Estate — "Match highlights, player stories, tournaments, transfers." (placeholder copy in design)
- Card image visuals (from section screenshot): tech = neon/psychedelic hand+screen; money = stock-chart candles; sports = soccer player; entertainment = film projector; national = Indian newspaper/Ashoka-wheel collage; international = hand holding globe collage; wellness = sunrise silhouette; politics = same India collage as National; real estate = 3D modern house render.

## Full design context (verbatim)

```tsx
const imgIconsansLinearTick1 = "https://www.figma.com/api/mcp/asset/f617979e-e1d2-4e82-b65a-b81042191055";
const imgFromKlickpinCom18FreshVisionBoardIdeasThatMakeEverydayMomentsLookMoreIntentionalMemorableAndBeautifullyStyledForAnyonePlanni1 = "https://www.figma.com/api/mcp/asset/0d359b07-8f1e-433e-bc4c-76197958f8eb";
const imgFromKlickpinCom10FreshHomeOfficeDecorIdeasThatMakeEverydayMomentsLookMoreIntentionalMemorableAndBeautifullyStyledForAnyoneW2 = "https://www.figma.com/api/mcp/asset/c9126325-766e-4c6c-926d-8668228a6929";
const imgFromKlickpinComExploreDreamySimpleWeddingCakeIdeasForYourNextInspirationBoardWithSimpleDetailsThatElevateTheFinalLookPinId1 = "https://www.figma.com/api/mcp/asset/78aedb28-6df4-41eb-9b6f-5284a8bc0e9f";
const imgFromKlickpinComExploreDreamySimpleWeddingCakeIdeasForYourNextInspirationBoardWithSimpleDetailsThatElevateTheFinalLookPinId2 = "https://www.figma.com/api/mcp/asset/1481911a-efa4-4fb9-acc4-da39a0f32ac4";
const imgFromKlickpinComWeekendGetawayIdeasThatFeelSoPutTogetherPinId2402389613699831551 = "https://www.figma.com/api/mcp/asset/ed7e758e-52e4-4c8e-ae98-0b14129c592c";
const imgFromKlickpinComWeekendGetawayIdeasThatFeelSoPutTogetherPinId2402389613699831300 = "https://www.figma.com/api/mcp/asset/2be2f338-033d-42f9-bf75-3e51743eed11";
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/d5184e00-1f5e-4aaa-be91-93127472f341";
const imgAdd = "https://www.figma.com/api/mcp/asset/b516515c-ce90-40d3-bf25-229892f8da87";

function IconsansLinearTick1({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-node-id="1:5" data-name="Iconsans/Linear/Tick-1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTick1} />
    </div>
  );
}

export default function Frame249() {
  return (
    <div className="bg-white relative size-full" data-node-id="1:282">
      <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-between left-[calc(50%-2px)] top-[71px] w-[1326px]" data-node-id="1:283">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[611px]" data-node-id="1:284">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:285" data-name="Eyebrow">
            <div className="bg-black col-1 h-[17px] ml-[111px] mt-[3px] relative row-1 w-[144px]" data-node-id="1:286" />
            <p className="[word-break:break-word] col-1 font-['Be_Vietnam_Pro:SemiBold'] ml-0 mt-0 not-italic relative row-1 text-[18px] text-black text-center tracking-[2.7px] whitespace-nowrap" data-node-id="1:287">
              <span className="leading-[1.26]">{`EXPLORE `}</span>
              <span className="leading-[1.26] text-white">CATEGORIES</span>
            </p>
          </div>
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[1.26] min-w-full not-italic relative shrink-0 text-[#141417] text-[56px] tracking-[-2.8px] w-[min-content]" data-node-id="1:288">
            Choose the categories
            <br aria-hidden />
            that matter to you
          </p>
        </div>
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[1.46] not-italic relative shrink-0 text-[#141417] text-[18px] text-right w-[539px]" data-node-id="1:289">
          From markets and technology to sports and culture, personalize your newsletter with the topics you care about.
        </p>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-start left-[calc(50%-0.5px)] top-[329px] w-[1329px]" data-node-id="1:290">
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-[1327px]" data-node-id="1:291">
          <div className="bg-[#ebf3ff] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:292">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:293">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:294" />
              <div className="absolute h-[533px] left-0 top-[-135px] w-[426px]" data-node-id="1:295" data-name="From Klickpin.com- Explore Dreamy simple wedding cake ideas ... 1" />
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:296">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:297">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:298">
                  Technology and AI
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:299">
                  Stay ahead with AI breakthroughs, startup launches, and emerging technologies.
                </p>
              </div>
              <div className="bg-[#1c1c1e] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.15)] shrink-0" data-node-id="1:300">
                <div className="absolute h-[8px] left-[-70px] top-[63px] w-[251px]" data-node-id="1:301">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <IconsansLinearTick1 className="relative shrink-0 size-[20px]" />
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:303" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Selected
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f0ff] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:304">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:305">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:306" />
              <div className="absolute h-[832px] left-[-8.33px] top-[-125px] w-[464px]" data-node-id="1:308" data-name="From Klickpin.com- Short morning sayings ... 1" />
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:309">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:310">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:311">{`Money & Stock Markets`}</p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:312">
                  Get market updates, business trends, investing insights, IPOs, personal finance.
                </p>
              </div>
              <div className="bg-[#1c1c1e] border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:313">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:314">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <IconsansLinearTick1 className="relative shrink-0 size-[20px]" />
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:316" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Selected
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#edf7f1] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:317">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:318">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:319" />
              <div className="absolute h-[261px] left-[-70.67px] top-0 w-[630px]" data-node-id="1:320" data-name="From Klickpin.com- 18 Fresh vision board ideas ... 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFromKlickpinCom18FreshVisionBoardIdeasThatMakeEverydayMomentsLookMoreIntentionalMemorableAndBeautifullyStyledForAnyonePlanni1} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:321">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:322">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:323">
                  Sports
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:324">
                  Match highlights, player stories, tournaments, transfers.
                </p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:325">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:326">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:327" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:327;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:328" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:329">
          <div className="bg-[#f4f4f6] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px] self-stretch" data-node-id="1:330">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:331">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:332" />
              <div className="absolute h-[290px] left-[-37px] top-[-13px] w-[500px]" data-node-id="1:333" data-name="From Klickpin.com- 10 Fresh home office decor ideas ... 2">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFromKlickpinCom10FreshHomeOfficeDecorIdeasThatMakeEverydayMomentsLookMoreIntentionalMemorableAndBeautifullyStyledForAnyoneW2} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px p-[16px] relative w-full" data-node-id="1:334">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:335">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:336">
                  Entertainment
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:337">
                  Movies, OTT releases, celebrities, music, pop culture, and viral entertainment stories.
                </p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:338">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:339">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:340" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:340;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:341" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#eff0e6] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:342">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:343">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:344" />
              <div className="absolute h-[737px] left-0 top-[-62px] w-[589px]" data-node-id="1:345" data-name="From Klickpin.com- Explore Dreamy simple wedding cake ideas ... 1">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[142.08%] left-0 max-w-none top-[-25.64%] w-full" src={imgFromKlickpinComExploreDreamySimpleWeddingCakeIdeasForYourNextInspirationBoardWithSimpleDetailsThatElevateTheFinalLookPinId1} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:346">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:347">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:348">
                  National
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:349">{`India's biggest stories, government policies, infrastructure,everything shaping the nation.`}</p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:350">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:351">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:352" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:352;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:353" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#fff2eb] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:354">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:355">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:356" />
              <div className="absolute h-[737px] left-0 top-[-247px] w-[589px]" data-node-id="1:357" data-name="From Klickpin.com- Explore Dreamy simple wedding cake ideas ... 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFromKlickpinComExploreDreamySimpleWeddingCakeIdeasForYourNextInspirationBoardWithSimpleDetailsThatElevateTheFinalLookPinId2} />
              </div>
              <div className="absolute h-[564px] left-[-61px] top-[-123px] w-[735px]" data-node-id="1:358" data-name="From Klickpin.com- Weekend Getaway Ideas ... 1">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[79.52%] left-[6.44%] max-w-none top-[20.48%] w-[86.32%]" src={imgFromKlickpinComWeekendGetawayIdeasThatFeelSoPutTogetherPinId2402389613699831551} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:359">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:360">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:361">
                  International
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:362">
                  Match highlights, player stories, tournaments, transfers.
                </p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:363">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:364">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:365" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:365;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:366" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:367">
          <div className="bg-[#e9f4eb] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px] self-stretch" data-node-id="1:368">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:369">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:370" />
              <div className="absolute h-[782px] left-[-12px] top-[-221px] w-[470px]" data-node-id="1:371" data-name="From Klickpin.com- 10 Fresh home office decor ideas ... 1" />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px p-[16px] relative w-full" data-node-id="1:372">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:373">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:374">
                  Wellness Daily
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:375">
                  Movies, OTT releases, celebrities, music, pop culture, and viral entertainment stories.
                </p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:376">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:377">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:378" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:378;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:379" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#ece6f0] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:380">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:381">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:382" />
              <div className="absolute h-[737px] left-0 top-[-62px] w-[589px]" data-node-id="1:383" data-name="From Klickpin.com- Explore Dreamy simple wedding cake ideas ... 1">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[142.08%] left-0 max-w-none top-[-25.64%] w-full" src={imgFromKlickpinComExploreDreamySimpleWeddingCakeIdeasForYourNextInspirationBoardWithSimpleDetailsThatElevateTheFinalLookPinId1} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:384">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:385">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:386">{`Politics & Power`}</p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:387">{`India's biggest stories, government policies, infrastructure,everything shaping the nation.`}</p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:388">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:389">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:390" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:390;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:391" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#ebf4ff] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip relative rounded-[24px]" data-node-id="1:392">
            <div className="h-[263px] overflow-clip relative shrink-0 w-full" data-node-id="1:393">
              <div className="absolute bg-[#d9d9d9] h-[297px] left-0 top-0 w-[589px]" data-node-id="1:394" />
              <div className="absolute h-[362px] left-[-11px] top-[-11px] w-[470px]" data-node-id="1:395" data-name="From Klickpin.com- Weekend Getaway Ideas ... 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFromKlickpinComWeekendGetawayIdeasThatFeelSoPutTogetherPinId2402389613699831300} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[32px] items-start p-[16px] relative shrink-0 w-full" data-node-id="1:396">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[1.46] not-italic relative shrink-0 w-full" data-node-id="1:397">
                <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[32px] text-black tracking-[-1.6px] w-full" data-node-id="1:398">
                  Real Estate
                </p>
                <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:399">
                  Match highlights, player stories, tournaments, transfers.
                </p>
              </div>
              <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shrink-0" data-node-id="1:400">
                <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:401">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:402" data-name="Hicon / Linear / Add">
                  <div className="absolute inset-[16.67%]" data-node-id="I1:402;108:629" data-name="Add">
                    <div className="absolute inset-[-9.37%]">
                      <img alt="" className="block max-w-none size-full" src={imgAdd} />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:403" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Notes from tool output: styles used — Neutral 800 #141417, Neutral 0 #FFFFFF, Neutral 700 #1C1C1E.

## Raw source images from download_assets on 1:282 (saved to /public/figma/)

IMPORTANT FORMAT NOTE: the Sports and Entertainment card fills are ANIMATED GIFs (Figma served them under the misleading "Klickpin" layer names). Downloaded with correct extensions:
- category-sports.gif — animated soccer clip (card node 1:320)
- category-entertainment.gif — animated film-projector clip (card node 1:333)
- category-sports-still.png / category-entertainment-still.png — PNG poster frames of the same clips

Recovered fills that get_design_context did NOT expose as URLs:
- category-tech-ai.png (900w, neon "REALITY CHECK" hands) — Technology & AI card (node 1:295)
- category-money-markets.png (832w, dark stock-chart candles) — Money & Stock Markets card (node 1:308)
- category-wellness.png (1200w, meditation sunrise) — Wellness Daily card (node 1:371)

Other card images:
- category-national-politics.png (2048w India collage) — National (1:345) and Politics & Power (1:383) cards
- category-international.png (520w globe-in-hands collage) — International card top layer (1:358)
- category-international-base.png (1024w) — International card base layer (1:357)
- category-real-estate.png (981w 3D house render) — Real Estate card (1:395)
- category-real-estate-alt.png / category-money-bull-alt.png — alternate source variants found in the subtree
- categories-section-export.png — flattened PNG export of the entire 1:282 section (visual reference)
