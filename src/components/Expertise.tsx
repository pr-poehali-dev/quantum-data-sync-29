import { useEffect, useRef, useState } from "react"
import { Truck, FlaskConical, ClipboardCheck, Headphones } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Производство и доставка",
    description: "Собственный парк автобетоносмесителей объёмом 6–10 м³. Доставка в течение 90 минут в радиусе 100 км от завода. Работаем 24/7.",
    icon: Truck,
  },
  {
    title: "Лабораторный контроль",
    description:
      "Аккредитованная лаборатория на площадке завода. Испытания каждой партии по прочности, подвижности, морозостойкости и водонепроницаемости.",
    icon: FlaskConical,
  },
  {
    title: "Подбор состава и проектирование",
    description:
      "Разработка индивидуальных рецептур под требования объекта. Технологическое сопровождение при укладке и уходе за бетонной смесью.",
    icon: ClipboardCheck,
  },
  {
    title: "Сервис и поддержка",
    description:
      "Персональный менеджер, оперативное согласование заявок, гибкие условия оплаты. Работаем с физическими и юридическими лицами.",
    icon: Headphones,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Сервис</HighlightedText>, который
            <br />
            работает
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            От оформления заявки до выгрузки на объекте — каждый шаг выстроен так, чтобы вы могли строить без остановок и задержек.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l-2 border-primary/30 transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0 border-primary" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-primary" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
