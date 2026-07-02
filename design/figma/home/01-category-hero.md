# Category hero — node 1:5342 (1440x508)

Dark hero for the category/article reading page ("Tech & AI").

Local asset map (downloaded to /public/figma/):
- imgImage1 → hero-tech-ai-bg.png (background photo, robot+human finger touch, rendered rotated -90deg, opacity 40%, over black)
- imgEllipse3 → button-glow-ellipse.png (soft glow strip inside the white pill buttons)
- imgVuesaxLinearDirectInbox → icon-direct-inbox.svg (18x18 inbox icon in the round icon button)

## Figma design context (verbatim)

```jsx
const imgImage1 = "https://www.figma.com/api/mcp/asset/f4f0237b-b2ee-4922-8c3d-f0fc809dd9ea";
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/06b86235-7268-4644-b39e-479d7769ae9b";
const imgVuesaxLinearDirectInbox = "https://www.figma.com/api/mcp/asset/be7c4546-3d9c-4497-bd2a-52628c755ad3";

export default function Frame124() {
  return (
    <div className="bg-black relative size-full" data-node-id="1:5342">
      <div className="absolute flex h-[840px] items-center justify-center left-[-27px] top-[-185px] w-[1493px]" data-node-id="1:5343">
        <div className="-rotate-90 flex-none">
          <div className="h-[1493px] opacity-40 relative w-[840px]" data-name="image 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex items-start justify-between left-[72px] top-[292px] w-[1294px]" data-node-id="1:5344">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-none not-italic relative shrink-0 text-[126px] text-white tracking-[-10.08px] whitespace-nowrap" data-node-id="1:5345">{`Tech & AI`}</p>
        <div className="content-stretch flex flex-col gap-[32px] items-end pl-[4px] relative shrink-0 w-[433px]" data-node-id="1:5346">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[1.46] min-w-full not-italic relative shrink-0 text-[18px] text-right text-white w-[min-content]" data-node-id="1:5347">
            From markets and technology to sports and culture, personalize your newsletter
          </p>
          <div className="content-stretch flex items-start relative shrink-0" data-node-id="1:5348">
            <div className="bg-white border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[24px] py-[16px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] shrink-0" data-node-id="1:5349">
              <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:5350">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
              </div>
              <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:5351" style={{ fontVariationSettings: '"wdth" 100' }}>
                Subscribe
              </p>
            </div>
            <div className="bg-white border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[16px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] shrink-0" data-node-id="1:5352">
              <div className="absolute h-[8px] left-[-71px] top-[62px] w-[251px]" data-node-id="1:5353">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
              </div>
              <div className="relative shrink-0 size-[18px]" data-node-id="1:5354" data-name="vuesax/linear/direct-inbox">
                <div className="absolute contents inset-0" data-node-id="1:5355" data-name="vuesax/linear/direct-inbox">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVuesaxLinearDirectInbox} />
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

Design styles noted by Figma: Neutral colors | Light Mode/Neutral 0: #FFFFFF, Neutral colors | Light Mode/Neutral 800: #141417.
