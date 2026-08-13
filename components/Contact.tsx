import ContactForm from "./ContactForm";
import { SITE_EMAIL, SOCIAL } from "@/lib/seo";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 border-t border-line relative"
    >
      <h2 className="font-mono text-xs tracking-widest uppercase text-text-dim mb-8">
        // Got a build, a campaign, or both
      </h2>
      <a
        href={`mailto:${SITE_EMAIL}`}
        className="font-display font-black tracking-[-0.04em] text-[clamp(22px,6.4vw,96px)] leading-none lowercase break-words max-w-full py-3 hover:text-accent transition-colors"
      >
        {SITE_EMAIL}
      </a>
      <div className="mt-9 flex gap-x-7 font-mono text-xs uppercase tracking-wide text-text-dim flex-wrap justify-center">
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-11 px-1 border-b border-transparent hover:border-text hover:text-text transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-11 px-1 border-b border-transparent hover:border-text hover:text-text transition-colors"
        >
          GitHub
        </a>
      </div>
      <ContactForm />
    </section>
  );
}
