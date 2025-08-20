import Header from "../components/shared/Header"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-5xl font-bold text-green-700 mb-6">
          Football Statistics
        </h1>

        <div className="prose prose-green">
          <p className="text-xl mb-4">
            <span className="font-bold">Football Statistics</span> — это
            платформа для отслеживания и анализа статистики игроков.
          </p>

          <h2 className="text-3xl font-semibold mt-6 mb-3 text-green-700">
            Функционал
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xl">
            <li>Добавление и удаление игроков</li>
            <li>Сортировка списка игроков</li>
            <li>Просмотр статистики и информации об игроке</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
