import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 border-t border-line relative"
      >
        <div className="font-mono text-xs tracking-widest uppercase text-text-dim mb-8">
          // Got a build, a campaign, or both
        </div>
        <a
          href="mailto:hello@sharjeel.cc"
          className="font-display font-black tracking-[-0.04em] text-[clamp(22px,6.4vw,96px)] leading-none lowercase break-words max-w-full py-3 hover:text-accent transition-colors"
        >
          hello@sharjeel.cc
        </a>
        <div className="mt-9 flex gap-x-7 font-mono text-xs uppercase tracking-wide text-text-dim flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/iamsharjeeel/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-11 px-1 border-b border-transparent hover:border-text hover:text-text transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/iamsharjeeel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-11 px-1 border-b border-transparent hover:border-text hover:text-text transition-colors"
          >
            GitHub
          </a>
        </div>
        <ContactForm />
      </section>
      <footer className="flex justify-between px-5 sm:px-8 lg:px-14 py-6 font-mono text-[11px] text-text-faint border-t border-line flex-wrap gap-2.5">
        <span>© 2026 Sharjeel</span>
        <span>Open for select projects</span>
      </footer>
    </>
  );
}
