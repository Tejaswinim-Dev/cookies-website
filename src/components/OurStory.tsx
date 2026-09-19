"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, CheckCircle2, Award } from "lucide-react";

export default function OurStory() {
  return (
    <section id="story" className="py-16 md:py-24 bg-cream-100 border-t border-charcoal/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        {/* Short & Sweet Story Card */}
        <div className="bg-cream-50 rounded-3xl p-6 sm:p-10 md:p-12 border border-charcoal/10 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left: Playful Baker Portrait (Flour on face, chef hat, whisker & spoon) */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated border-4 border-cream-100 bg-beige/40 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/story/female-baker.jpg"
                  alt="Sweety smiling cheerfully in her cooking cap and apron with wooden spoon, wire whisk, and wheat flour on her cheek"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />

                {/* Sweet & Funny Baker Polaroid Caption */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-cream-100/95 backdrop-blur-md border border-charcoal/10 shadow-soft text-center">
                  <span className="text-[11px] font-handwriting text-olive text-lg font-bold block leading-tight">
                    &ldquo;Whisk in hand, flour on cheek! 👩‍🍳 ♡&rdquo;
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-charcoal-muted font-bold block mt-0.5">
                    Sweety • Head Baker & Founder
                  </span>
                </div>
              </div>

              {/* Playful Floating Stamp */}
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-sage text-white text-[10px] font-bold uppercase tracking-wider shadow-soft rotate-6 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-terracotta-light" />
                <span>100% Home Oven</span>
              </div>
            </div>

            {/* Right: Short & Sweet Narrative */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige/60 border border-charcoal/5 mb-3.5 text-[10px] font-bold tracking-widest uppercase text-terracotta w-fit">
                <Heart className="w-3 h-3 text-terracotta fill-terracotta" />
                <span>OUR SHORT & SWEET STORY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal tracking-tight leading-tight mb-4">
                Home Baked. <br />
                <span className="italic text-olive font-serif">Heart Made.</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-charcoal-light/90 leading-relaxed">
                <p>
                  <strong>Hi, I&apos;m Sweety!</strong> HealthyMakes started right in my home kitchen in Banjara Hills, Hyderabad with one simple dream: to bake treats my own family could enjoy every single day without guilt.
                </p>
                <p>
                  We grew tired of store-bought biscuits disguised as healthy food, loaded with hidden palm oil, refined white flour (maida), and synthetic preservatives.
                </p>
                <p>
                  So every morning at dawn, we stone-mill regional Telangana millets, fold rolled oats with pure organic country jaggery, and slow-bake tiny batches in our home oven with lots of love.
                </p>
              </div>

              {/* 3 Quick Wholesome Checks */}
              <div className="grid grid-cols-3 gap-2 pt-4 pb-4 border-y border-charcoal/10 my-4 text-center">
                <div>
                  <span className="text-base font-bold text-olive font-serif block">0%</span>
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider font-semibold">Maida</span>
                </div>
                <div>
                  <span className="text-base font-bold text-olive font-serif block">100%</span>
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider font-semibold">Jaggery</span>
                </div>
                <div>
                  <span className="text-base font-bold text-olive font-serif block">Daily</span>
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider font-semibold">Fresh Bake</span>
                </div>
              </div>

              {/* Personal Handwritten Sign-off */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="font-handwriting text-xl text-olive font-bold">
                    From our oven to your tea table ♡
                  </p>
                  <p className="text-[11px] text-charcoal-muted">
                    Banjara Hills, Hyderabad • India
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-sage/20 text-olive flex items-center justify-center font-bold text-xs">
                  🍪
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
