import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const products = [
  {
    id: 1,
    title: "Товарный бетон",
    category: "Тяжёлый бетон",
    location: "Марки М100–М500, класс B7.5–B40",
    year: "ГОСТ 7473",
    image: "https://cdn.poehali.dev/projects/f88d1e7d-973f-4221-bb2e-99a669323bfc/bucket/1334e38a-bfd7-4d10-bec3-9a4d485a46a7.png",
  },
  {
    id: 2,
    title: "Железобетонные изделия",
    category: "ЖБИ",
    location: "Плиты перекрытия, фундаментные блоки, кольца",
    year: "ГОСТ 13015",
    image: "https://cdn.poehali.dev/projects/f88d1e7d-973f-4221-bb2e-99a669323bfc/bucket/1334e38a-bfd7-4d10-bec3-9a4d485a46a7.png",
  },
  {
    id: 3,
    title: "Строительные растворы",
    category: "Растворы кладочные и штукатурные",
    location: "Марки М50–М200, подвижность П2–П4",
    year: "ГОСТ 28013",
    image: "https://cdn.poehali.dev/projects/f88d1e7d-973f-4221-bb2e-99a669323bfc/bucket/1334e38a-bfd7-4d10-bec3-9a4d485a46a7.png",
  },
  {
    id: 4,
    title: "Дорожный бетон",
    category: "Специальные смеси",
    location: "Морозостойкость F200–F300, водонепроницаемость W8",
    year: "ГОСТ 26633",
    image: "https://cdn.poehali.dev/projects/f88d1e7d-973f-4221-bb2e-99a669323bfc/bucket/1334e38a-bfd7-4d10-bec3-9a4d485a46a7.png",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(products[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Ассортимент</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наша продукция</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Запросить прайс-лист
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === product.id ? "scale-105" : "scale-100"
                  }`}
                />
                {/* Синий оверлей при наведении */}
                <div
                  className={`absolute inset-0 bg-primary/40 transition-opacity duration-300 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(product.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
                {/* Бейдж стандарта */}
                <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 font-medium">
                  {product.year}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{product.title}</h3>
                  <p className="text-muted-foreground text-sm font-medium">{product.category}</p>
                  <p className="text-muted-foreground text-sm mt-1">{product.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}