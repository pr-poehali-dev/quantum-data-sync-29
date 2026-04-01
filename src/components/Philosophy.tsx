import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Контроль качества на каждом этапе",
    description:
      "Мы проводим обязательные лабораторные испытания каждой партии бетона. Сертификаты качества и паспорта соответствия выдаются на каждую поставку.",
  },
  {
    title: "Точное соблюдение рецептур",
    description:
      "Современное автоматизированное оборудование обеспечивает точное дозирование компонентов согласно ГОСТ. Никаких отклонений от проектных марок.",
  },
  {
    title: "Надёжная логистика",
    description:
      "Собственный парк автобетоносмесителей позволяет доставлять бетон в нужное время с соблюдением всех требований к транспортировке смеси.",
  },
  {
    title: "Долгосрочное партнёрство",
    description: "Мы строим отношения, а не разовые сделки. Постоянным клиентам — персональный менеджер, приоритетные заявки и гибкие условия оплаты.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
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
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш подход</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Бетон с
              <br />
              <HighlightedText>гарантией</HighlightedText>
            </h2>

            {/* Визуальный элемент вместо фото */}
            <div className="relative hidden lg:block mt-8">
              <div className="bg-primary rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "М100–М500", label: "Марки бетона" },
                    { value: "100 м³/ч", label: "Производительность" },
                    { value: "< 2 часов", label: "Время доставки" },
                    { value: "ISO 9001", label: "Сертификация" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-2 border-blue-400 pl-4">
                      <div className="text-xl font-bold text-blue-200">{item.value}</div>
                      <div className="text-sm text-white/70 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Регион Трейд — это завод полного цикла: от приёмки сырья до доставки готового бетона на объект. Более 15 лет мы обеспечиваем строительную отрасль материалами, которым доверяют.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}