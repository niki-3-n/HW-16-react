import React, { useState } from 'react'

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
    {children}
  </section>
)

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
  const translations = {
    good: 'Добре',
    neutral: 'Нейтрально',
    bad: 'Погано',
  }
  const buttonColors = {
    good: 'bg-green-500 hover:bg-green-600',
    neutral: 'bg-yellow-500 hover:bg-yellow-600',
    bad: 'bg-red-500 hover:bg-red-600',
  }

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onLeaveFeedback(option)}
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColors[option]}`}
        >
          {translations[option] || capitalize(option)}
        </button>
      ))}
    </div>
  )
}

const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
    <p className="p-4 bg-gray-100 rounded-lg">🟢 Добре: <span className="font-bold">{good}</span></p>
    <p className="p-4 bg-gray-100 rounded-lg">🟡 Нейтрально: <span className="font-bold">{neutral}</span></p>
    <p className="p-4 bg-gray-100 rounded-lg">🔴 Погано: <span className="font-bold">{bad}</span></p>
    <p className="p-4 bg-blue-100 rounded-lg">📊 Всього відгуків: <span className="font-bold">{total}</span></p>
    <p className="p-4 bg-green-100 rounded-lg">📈 Позитивні відгуки: <span className="font-bold">{positivePercentage}%</span></p>
  </div>
)

const Notification = ({ message }) => (
  <p className="text-gray-500 text-lg">{message}</p>
)

export default function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const handleLeaveFeedback = (option) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }))
  }

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback()
    if (total === 0) {
      return 0
    }
    return Math.round((feedback.good / total) * 100)
  }

  const totalFeedback = countTotalFeedback()
  const positivePercentage = countPositiveFeedbackPercentage()
  const feedbackOptions = Object.keys(feedback)

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg">
        <Section title="Будь ласка, залиште відгук">
          <FeedbackOptions 
            options={feedbackOptions} 
            onLeaveFeedback={handleLeaveFeedback} 
          />
        </Section>

        <Section title="Статистика">
          {totalFeedback > 0 ? (
            <Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="Відгуків ще немає" />
          )}
        </Section>
      </div>
    </div>
  )
}
