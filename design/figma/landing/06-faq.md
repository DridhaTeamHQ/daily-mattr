# FAQ Section — node 1:226 (1440x749)

Assets (downloaded to /public/figma/):
- imgEllipse3 → faq-button-glow.svg — https://www.figma.com/api/mcp/asset/5c396ebe-4ba5-4ff5-b56b-4dd081fdfd2e
- imgVuesaxLinearDirectInbox → faq-icon-direct-inbox.svg — https://www.figma.com/api/mcp/asset/31d34f51-e4f3-4c44-9520-e785dc13f4ab
- imgAdd (open item — renders as minus) → faq-icon-minus.svg — https://www.figma.com/api/mcp/asset/9ec879c1-0045-406c-b65e-24cb7386de78
- imgAdd1 (closed item — plus) → faq-icon-plus.svg — https://www.figma.com/api/mcp/asset/0dae8f96-d3d8-4c4f-b1c7-f3e9dd94b866

## Key specs
- Section: 1440x749, bg white; two-column layout
- LEFT column (starts ~x 115, top 84, width 471):
  - Eyebrow "QUESTIONS, ANSWERED": Be Vietnam Pro SemiBold 18px, tracking 2.7px, lh 1.26; "QUESTIONS," is white on a black 144x17 rect (marker highlight), "ANSWERED" plain black
  - H2 "Frequently asked / questions": Be Vietnam Pro Medium 56px, tracking -2.8px, lh 1.26, #141417; gap 24 from eyebrow
  - Body: Be Vietnam Pro Regular 18px, lh 1.46, #4A4A52, width 453: "Learn how Long Mattr work, what you'll receive, how to choose categories, and how to manage your editions anytime."
  - Buttons row at left 115 / top 569: "Subscribe" pill — bg #1c1c1e, border 1px rgba(255,255,255,0.1), rounded 50px, px 24 / py 16, Roboto SemiBold 15px white, shadow 0 6 25 rgba(0,0,0,0.25); beside it an icon-only pill (p 16) with 18px direct-inbox icon; same glow ellipse decoration
- RIGHT chips row (left 720, top 81, gap 8): filter pills "General" (active: bg #141417, white text), "Subscription", "Personalization", "Delivery" (inactive: border 1px #D1D1D6, text #6b6b73) — Be Vietnam Pro Medium 13px, px 12 / py 8, rounded 100px
- ACCORDION (left 720, top 137, width 609): bg #FAFAFB, border 1px #E5E5EA, rounded 24px, py 16, internal gap 5
  - Item: px 24 / py 15.5, dashed bottom border #B8B8C0 (last item no border)
  - Question: Roboto Medium 21px #141417; 16px plus/minus icon right-aligned
  - Open answer: Roboto Regular 21px #4A4A52, lh 1.46, width 588, py 15.5
  - Questions: "What is Long Mattr?" (open, answer: "Long Mattr is Mattr's premium newsletter experience for deeper stories, useful context, and curated perspectives."), "What will I receive?", "Do I need an account to subscribe?", "How often will I get newsletters?", "Can I choose my categories?"

## Full design context (verbatim)

```tsx
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/5c396ebe-4ba5-4ff5-b56b-4dd081fdfd2e";
const imgVuesaxLinearDirectInbox = "https://www.figma.com/api/mcp/asset/31d34f51-e4f3-4c44-9520-e785dc13f4ab";
const imgAdd = "https://www.figma.com/api/mcp/asset/9ec879c1-0045-406c-b65e-24cb7386de78";
const imgAdd1 = "https://www.figma.com/api/mcp/asset/0dae8f96-d3d8-4c4f-b1c7-f3e9dd94b866";

export default function Frame159() {
  return (
    <div className="bg-white relative size-full" data-node-id="1:226">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-start justify-center left-[calc(50%-369.5px)] top-[84px]" data-node-id="1:227">
        <div className="content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 w-[471px]" data-node-id="1:228">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:229" data-name="Eyebrow">
            <div className="bg-black col-1 h-[17px] ml-0 mt-[3px] relative row-1 w-[144px]" data-node-id="1:230" />
            <p className="[word-break:break-word] col-1 font-['Be_Vietnam_Pro:SemiBold'] ml-0 mt-0 not-italic relative row-1 text-[18px] text-black text-center tracking-[2.7px] whitespace-nowrap" data-node-id="1:231">
              <span className="leading-[1.26] text-white">{`QUESTIONS, `}</span>
              <span className="leading-[1.26]">ANSWERED</span>
            </p>
          </div>
          <div className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] min-w-full not-italic relative shrink-0 text-[#141417] text-[56px] tracking-[-2.8px] w-[min-content]" data-node-id="1:232">
            <p className="leading-[1.26] mb-0">Frequently asked</p>
            <p className="leading-[1.26]">questions</p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[1.46] not-italic relative shrink-0 text-[#4a4a52] text-[18px] w-[453px]" data-node-id="1:233">
          Learn how Long Mattr work, what you’ll receive, how to choose categories, and how to manage your editions anytime.
        </p>
      </div>
      <div className="absolute content-stretch flex items-start left-[115px] top-[569px]" data-node-id="1:234">
        <div className="bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] shrink-0" data-node-id="1:235">
          <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:236">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
          </div>
          <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:237" style={{ fontVariationSettings: '"wdth" 100' }}>
            Subscribe
          </p>
        </div>
        <div className="bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[16px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] shrink-0" data-node-id="1:238">
          <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:239">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
          </div>
          <div className="relative shrink-0 size-[18px]" data-node-id="1:240" data-name="vuesax/linear/direct-inbox">
            <div className="absolute contents inset-0" data-node-id="1:241" data-name="vuesax/linear/direct-inbox">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVuesaxLinearDirectInbox} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#fafafb] border border-[#e5e5ea] border-solid content-stretch flex flex-col gap-[5px] items-start left-[720px] py-[16px] rounded-[24px] top-[137px] w-[609px]" data-node-id="1:248">
        <div className="border-[#b8b8c0] border-b border-dashed content-stretch flex flex-col gap-[4px] items-start px-[24px] py-[15.5px] relative shrink-0 w-full" data-node-id="1:249">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-[561px]" data-node-id="1:250">
            <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#141417] text-[21px] whitespace-nowrap" data-node-id="1:251" style={{ fontVariationSettings: '"wdth" 100' }}>
              What is Long Mattr?
            </p>
            <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:252" data-name="Hicon / Linear / Add">
              <div className="absolute bottom-1/2 left-[16.67%] right-[16.66%] top-1/2" data-node-id="1:253" data-name="Add">
                <div className="absolute inset-[-1px_-9.37%]">
                  <img alt="" className="block max-w-none size-full" src={imgAdd} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center py-[15.5px] relative shrink-0 w-full" data-node-id="1:255">
            <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[1.46] relative shrink-0 text-[#4a4a52] text-[21px] w-[588px]" data-node-id="1:256" style={{ fontVariationSettings: '"wdth" 100' }}>
              Long Mattr is Mattr’s premium newsletter experience for deeper stories, useful context, and curated perspectives.
            </p>
          </div>
        </div>
        <div className="border-[#b8b8c0] border-b border-dashed content-stretch flex items-center justify-between px-[24px] py-[15.5px] relative shrink-0 w-full" data-node-id="1:257">
          <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#141417] text-[21px] whitespace-nowrap" data-node-id="1:258" style={{ fontVariationSettings: '"wdth" 100' }}>
            What will I receive?
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:259" data-name="Hicon / Linear / Add">
            <div className="absolute inset-[16.67%]" data-node-id="I1:259;108:629" data-name="Add">
              <div className="absolute inset-[-9.37%]">
                <img alt="" className="block max-w-none size-full" src={imgAdd1} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-[#b8b8c0] border-b border-dashed content-stretch flex items-center justify-between px-[24px] py-[15.5px] relative shrink-0 w-full" data-node-id="1:260">
          <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#141417] text-[21px] whitespace-nowrap" data-node-id="1:261" style={{ fontVariationSettings: '"wdth" 100' }}>
            Do I need an account to subscribe?
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:262" data-name="Hicon / Linear / Add">
            <div className="absolute inset-[16.67%]" data-node-id="I1:262;108:629" data-name="Add">
              <div className="absolute inset-[-9.37%]">
                <img alt="" className="block max-w-none size-full" src={imgAdd1} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-[#b8b8c0] border-b border-dashed content-stretch flex items-center justify-between px-[24px] py-[15.5px] relative shrink-0 w-full" data-node-id="1:263">
          <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#141417] text-[21px] whitespace-nowrap" data-node-id="1:264" style={{ fontVariationSettings: '"wdth" 100' }}>
            How often will I get newsletters?
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:265" data-name="Hicon / Linear / Add">
            <div className="absolute inset-[16.67%]" data-node-id="I1:265;108:629" data-name="Add">
              <div className="absolute inset-[-9.37%]">
                <img alt="" className="block max-w-none size-full" src={imgAdd1} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-between px-[24px] py-[15.5px] relative shrink-0 w-full" data-node-id="1:266">
          <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#141417] text-[21px] whitespace-nowrap" data-node-id="1:267" style={{ fontVariationSettings: '"wdth" 100' }}>
            Can I choose my categories?
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="1:268" data-name="Hicon / Linear / Add">
            <div className="absolute inset-[16.67%]" data-node-id="I1:268;108:629" data-name="Add">
              <div className="absolute inset-[-9.37%]">
                <img alt="" className="block max-w-none size-full" src={imgAdd1} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[8px] items-center left-[720px] top-[81px]" data-node-id="1:269">
        <div className="bg-[#141417] border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:270" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap" data-node-id="I1:270;278:5299">
            General
          </p>
        </div>
        <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:271" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:271;278:5299">
            Subscription
          </p>
        </div>
        <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:272" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:272;278:5299">
            Personalization
          </p>
        </div>
        <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:273" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:273;278:5299">
            Delivery
          </p>
        </div>
      </div>
    </div>
  );
}
```

Notes from tool output: styles used — all 9 Neutral variables (#141417, #4A4A52, #1C1C1E, #FFFFFF, #B8B8C0, #FAFAFB, #E5E5EA, #D1D1D6, #6B6B73).
