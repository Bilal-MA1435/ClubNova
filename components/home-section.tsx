import type { ReactNode } from "react";

type HomeSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function HomeSection({ id, eyebrow, title, description, children }: HomeSectionProps) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="shell">
        <div className="section-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
