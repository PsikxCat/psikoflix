import { Github, Twitter, Linkedin, BriefcaseBusiness } from 'lucide-react'

export default function Footer() {
  return (
    <section className="flex_center_col w-full gap-2 bg-black/40 p-2 py-8">
      <div className="w-full text-center text-xs">
        <span className="inline-block scale-x-[-1]">©</span>
        {new Date().getFullYear()} Psikocat. Ningún derecho reservado.
      </div>

      <div className="flex gap-3">
        <a
          href="https://github.com/psikxcat"
          target="_blank"
          rel="noreferrer noopener"
          className="transition-all duration-200 ease-in-out hover:text-accent"
        >
          <Github size={18} />
        </a>

        <a
          href="https://x.com/psiko_cat"
          target="_blank"
          rel="noreferrer noopener"
          className="transition-all duration-200 ease-in-out hover:text-accent"
        >
          <Twitter size={18} />
        </a>

        <a
          href="https://www.linkedin.com/in/arevalorichard/"
          target="_blank"
          rel="noreferrer noopener"
          className="transition-all duration-200 ease-in-out hover:text-accent"
        >
          <Linkedin size={18} />
        </a>

        <a
          href="https://richardarevalo.netlify.app/"
          target="_blank"
          rel="noreferrer noopener"
          className="transition-all duration-200 ease-in-out hover:text-accent"
        >
          <BriefcaseBusiness size={18} />
        </a>
      </div>
    </section>
  )
}
