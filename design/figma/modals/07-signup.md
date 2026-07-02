# Create an account — auth drawer — overlay node 1:5308 "Frame 180" (564x1196), body node 1:5309 (337x480)

Shown on Newsletter variant frame 1:4935. Same auth drawer chrome as 05-login.md (bg #F4F4F6, DailyMattr'. wordmark header); body centered at w=337, x=114, y=196.

Structure: title "Create an account", 3 pill inputs (email / name / mobile number), terms line with underlined links, dark "Create account" CTA, "Already have an account? Login" line, and blue "Continue with Google" (#5673E5) at the bottom.

## Figma design context — body only (node 1:5309, verbatim)

```jsx
export default function Frame189() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative size-full" data-node-id="1:5309">
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-node-id="1:5310">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#1c1c1e] text-[18px] text-center w-[min-content]" data-node-id="1:5311">
          Create an account
        </p>
        <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0" data-node-id="1:5312">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:5313">
            <div className="bg-white border border-[#e5e5ea] border-solid content-stretch flex items-center px-[24px] py-[14.5px] relative rounded-[60px] shrink-0 w-full" data-node-id="1:5314">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[15px] whitespace-nowrap" data-node-id="1:5315">
                Enter your email address...
              </p>
            </div>
            <div className="bg-white border border-[#e5e5ea] border-solid content-stretch flex items-center px-[24px] py-[14.5px] relative rounded-[60px] shrink-0 w-full" data-node-id="1:5316">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[15px] whitespace-nowrap" data-node-id="1:5317">
                Enter your name
              </p>
            </div>
            <div className="bg-white border border-[#e5e5ea] border-solid content-stretch flex items-center px-[24px] py-[14.5px] relative rounded-[60px] shrink-0 w-full" data-node-id="1:5318">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[15px] whitespace-nowrap" data-node-id="1:5319">
                Enter your mobile number
              </p>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[0] not-italic relative shrink-0 text-[#4a4a52] text-[15px] text-center w-[337px]" data-node-id="1:5320">
            <span className="leading-[normal]">{`By creating an account, you agree to our `}</span>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] underline">{`terms & Conditions`}</span>
            <span className="leading-[normal]">{` and `}</span>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] underline">Privacy Policy</span>
          </p>
          <div className="bg-[#1c1c1e] content-stretch flex items-center justify-center px-[10px] py-[14.5px] relative rounded-[60px] shrink-0 w-full" data-node-id="1:5321">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:5322">
              Create account
            </p>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[0] min-w-full not-italic relative shrink-0 text-[15px] text-black text-center w-[min-content]" data-node-id="1:5323">
        <span className="leading-[normal] text-[#4a4a52]">Already have an account?</span>
        <span className="leading-[normal]">{` `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] underline">Login</span>
      </p>
      <div className="bg-[#5673e5] content-stretch flex items-center justify-center px-[10px] py-[14.5px] relative rounded-[60px] shrink-0 w-full" data-node-id="1:5324">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:5325">
          Continue with Google
        </p>
      </div>
    </div>
  );
}
```

Design styles: Neutral 700 #1C1C1E, Neutral 500 #6B6B73, Neutral 0 #FFFFFF, Neutral 200 #E5E5EA, Neutral 600 #4A4A52.
