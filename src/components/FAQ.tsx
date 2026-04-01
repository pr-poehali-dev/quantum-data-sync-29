import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Какие марки бетона вы производите?",
    answer:
      "Мы производим товарный бетон марок М100–М500 (классы B7.5–B40), кладочные и штукатурные растворы М50–М200, а также специальные смеси с повышенной морозостойкостью (F200–F300) и водонепроницаемостью (W6–W12). Возможна разработка индивидуального состава под требования вашего проекта.",
  },
  {
    question: "Как быстро вы доставляете бетон?",
    answer:
      "Стандартный срок доставки — от 60 до 90 минут в зависимости от расстояния до объекта. Мы работаем круглосуточно, включая праздничные дни. Принимаем заявки по телефону и электронной почте с оперативным подтверждением.",
  },
  {
    question: "Предоставляете ли вы документы о качестве?",
    answer:
      "Да. На каждую партию бетона выдаётся паспорт качества с результатами лабораторных испытаний. Наша лаборатория аккредитована и проводит испытания по прочности, подвижности (осадке конуса), морозостойкости и водонепроницаемости согласно действующим ГОСТ.",
  },
  {
    question: "Какой минимальный объём заказа?",
    answer:
      "Минимальный объём заказа — 1 м³. Мы работаем как с частными застройщиками на небольших объёмах, так и с крупными строительными компаниями, которым требуются сотни кубометров в день.",
  },
  {
    question: "Есть ли у вас насос для подачи бетона?",
    answer:
      "Да, мы предоставляем услугу автобетононасоса в аренду. Доступны стационарные и автомобильные насосы с горизонтальной подачей до 100 м и вертикальной — до 80 м. Расчёт стоимости производится индивидуально.",
  },
  {
    question: "Как заключить договор на постоянные поставки?",
    answer:
      "Свяжитесь с нашим менеджером по телефону или через форму обратной связи. Мы предложим рамочный договор с фиксированными ценами, приоритетным бронированием объёмов и отсрочкой платежа для проверенных партнёров.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
