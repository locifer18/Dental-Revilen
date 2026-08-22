import React from "react";
import { Shield, Award, Sparkles, CheckCircle2, Star, Cpu } from "lucide-react";

export function TrustBar() {
  const trustPoints = [
    {
      icon: <Shield className="w-4 h-4 text-pine-700" />,
      title: "German MELAG Class-B",
      subtitle: "7-Stage Sterile Protocol",
    },
    {
      icon: <Award className="w-4 h-4 text-gold-600" />,
      title: "AIIMS & Manipal Specialists",
      subtitle: "MDS Super-Specialists",
    },
    {
      icon: <Cpu className="w-4 h-4 text-pine-700" />,
      title: "100% 3D Digital Workflow",
      subtitle: "3Shape & Sirona CBCT",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-gold-600" />,
      title: "Painless Anesthesia",
      subtitle: "The Wand® Computerized STA",
    },
    {
      icon: <Star className="w-4 h-4 text-gold-500 fill-gold-500" />,
      title: "4.9★ Google Rating",
      subtitle: "1,240+ Verified Reviews",
    },
  ];

  return (
    <div className="border-y border-stone-200/80 bg-white/70 backdrop-blur-sm py-6 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 items-center">
          {trustPoints.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-2 border-r border-stone-200/60 last:border-r-0"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-charcoal-900 truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-500 font-light truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
