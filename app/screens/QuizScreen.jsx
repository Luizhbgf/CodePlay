import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function QuizScreen({ navigation, route }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Dados do quiz
  const quizQuestions = [
    {
      question: "Qual tag HTML é usada para criar um link?",
      options: [
        { id: "a", text: "<link>" },
        { id: "b", text: "<a>" },
        { id: "c", text: "<href>" },
        { id: "d", text: "<url>" },
      ],
      correctAnswer: "b",
      explanation: "A tag <a> (anchor) é usada para criar links em HTML.",
    },
    {
      question: "Qual propriedade CSS define a cor de fundo de um elemento?",
      options: [
        { id: "a", text: "color" },
        { id: "b", text: "background" },
        { id: "c", text: "background-color" },
        { id: "d", text: "bgcolor" },
      ],
      correctAnswer: "c",
      explanation: "A propriedade background-color define a cor de fundo de um elemento em CSS.",
    },
    {
      question: "Como você declara uma variável em JavaScript?",
      options: [
        { id: "a", text: "var nomeVariavel" },
        { id: "b", text: "variable nomeVariavel" },
        { id: "c", text: "v nomeVariavel" },
        { id: "d", text: "let nomeVariavel" },
      ],
      correctAnswer: "d",
      explanation: "Em JavaScript moderno, usamos 'let' ou 'const' para declarar variáveis.",
    },
  ]

  const handleAnswerSelect = (answerId) => {
    if (showFeedback) return // Impede seleção durante o feedback
    setSelectedAnswer(answerId)
  }

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const correct = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 10)
    }

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        // Quiz concluído
        Alert.alert("Quiz Concluído!", `Sua pontuação: ${score + (correct ? 10 : 0)} pontos`, [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("Home"),
          },
        ])
      }
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz HTML</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestion + 1}/{quizQuestions.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{quizQuestions[currentQuestion].question}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {quizQuestions[currentQuestion].options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedAnswer === option.id && styles.selectedOption,
                  showFeedback && option.id === quizQuestions[currentQuestion].correctAnswer && styles.correctOption,
                  showFeedback &&
                    selectedAnswer === option.id &&
                    option.id !== quizQuestions[currentQuestion].correctAnswer &&
                    styles.incorrectOption,
                ]}
                onPress={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
              >
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.optionIndicator,
                      selectedAnswer === option.id && styles.selectedIndicator,
                      showFeedback &&
                        option.id === quizQuestions[currentQuestion].correctAnswer &&
                        styles.correctIndicator,
                      showFeedback &&
                        selectedAnswer === option.id &&
                        option.id !== quizQuestions[currentQuestion].correctAnswer &&
                        styles.incorrectIndicator,
                    ]}
                  >
                    <Text style={styles.optionLetter}>{option.id.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.optionText}>{option.text}</Text>
                </View>

                {showFeedback && option.id === quizQuestions[currentQuestion].correctAnswer && (
                  <Ionicons name="checkmark-circle" size={24} color="#58CC02" />
                )}
                {showFeedback &&
                  selectedAnswer === option.id &&
                  option.id !== quizQuestions[currentQuestion].correctAnswer && (
                    <Ionicons name="close-circle" size={24} color="#FF3B30" />
                  )}
              </TouchableOpacity>
            ))}
          </View>

          {showFeedback && (
            <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
              <Ionicons name={isCorrect ? "checkmark-circle" : "close-circle"} size={24} color="white" />
              <Text style={styles.feedbackText}>
                {isCorrect ? "Correto!" : "Incorreto!"} {quizQuestions[currentQuestion].explanation}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.checkButton, !selectedAnswer && styles.disabledButton]}
          onPress={checkAnswer}
          disabled={!selectedAnswer || showFeedback}
        >
          <Text style={styles.checkButtonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 15,
    paddingTop: 50,
    backgroundColor: "#58CC02",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  progressContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  progressText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 30,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
  },
  selectedOption: {
    borderColor: "#58CC02",
    backgroundColor: "#F2FBF4",
  },
  correctOption: {
    borderColor: "#58CC02",
    backgroundColor: "#F2FBF4",
  },
  incorrectOption: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF2F2",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  selectedIndicator: {
    backgroundColor: "#58CC02",
  },
  correctIndicator: {
    backgroundColor: "#58CC02",
  },
  incorrectIndicator: {
    backgroundColor: "#FF3B30",
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  correctFeedback: {
    backgroundColor: "#58CC02",
  },
  incorrectFeedback: {
    backgroundColor: "#FF3B30",
  },
  feedbackText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  checkButton: {
    backgroundColor: "#58CC02",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  checkButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
