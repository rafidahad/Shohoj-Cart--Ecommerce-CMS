import React from "react";

function Stats() {
  const stats = [
    { value: "50K+", label: "Active Members" },
    { value: "1000+", label: "Projects Created" },
    { value: "75%", label: "Success Rate" },
    { value: "24/7", label: "Community Support" },
  ];

  return (
    <section id="community" className="container py-24">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center justify-center rounded-lg border bg-background p-8">
            <div className="text-4xl font-bold text-primary">{value}</div>
            <p className="mt-2 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
