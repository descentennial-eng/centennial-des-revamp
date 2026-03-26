import { AnimateOnScroll } from "./animate-on-scroll"

const testimonials = [
  {
    name: "Yashita Atmaram",
    role: "Marketing - DES Graduate",
    quote:
      "During the Digital Engagement Strategy program, I was challenged and grew both personally and professionally. The program exceeded my expectations by combining practical, hands-on learning with strong professor support and networking opportunities.",
  },
  {
    name: "Natalie Baxter",
    role: "Digital Marketing Coordinator at RBC",
    quote:
      "Being a part of the Digital Engagement Strategy Co-op stream helped me gain a position at RBC as a Communications Analyst, where I strategize the best ways to launch communications. Thanks to the Post Graduate Certificate program, I am confident in my critical thinking skills as a marketer.",
  },
  {
    name: "Diego Ramos",
    role: "Sponsorship Manager at VolleyBallSource Canada",
    quote:
      "The Digital Engagement Strategy classes were focused on real scenarios, an excellent experience for an International student trying to learn about Canadian culture and the Canadian market. Digital Marketing is a continually changing, evolving field and Centennial College understands how to adapt.",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
            Alumni Voices
          </p>
          <h2 id="testimonials-heading" className="text-balance text-center text-3xl font-bold text-primary-foreground md:text-5xl">
            Their Words, Your Future
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-primary-foreground/80">
            Real stories from graduates who turned their digital marketing ambitions into thriving careers.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={t.name} animation="fade-in-up" delay={i * 150}>
              <div className="text-center">
                <blockquote className="text-base leading-relaxed text-primary-foreground/90 md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-primary-foreground">{t.name}</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">{t.role}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
