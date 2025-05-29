"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import BottomTabBar from "../components/BottomTabBar"

export default function PracticeScreen({ navigation }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Dados das perguntas de prática
  const questions = [
    {
      id: "q1",
      question: "Qual tag HTML é usada para criar um título de nível 1?",
      options: [
        { id: "a", text: "<h1>" },
        { id: "b", text: "<title>" },
        { id: "c", text: "<header>" },
        { id: "d", text: "<heading>" },
      ],
      correctAnswer: "a",
      explanation: "A tag <h1> é usada para criar o título principal (nível 1) em uma página HTML.",
    },
    {
      id: "q2",
      question: "Qual propriedade CSS é usada para mudar a cor do texto?",
      options: [
        { id: "a", text: "text-color" },
        { id: "b", text: "font-color" },
        { id: "c", text: "color" },
        { id: "d", text: "text-style" },
      ],
      correctAnswer: "c",
      explanation: "A propriedade 'color' é usada para definir a cor do texto em CSS.",
    },
    {
      id: "q3",
      question: "Qual símbolo é usado para iniciar um comentário em JavaScript?",
      options: [
        { id: "a", text: "#" },
        { id: "b", text: "//" },
        { id: "c", text: "<!--" },
        { id: "d", text: "**" },
      ],
      correctAnswer: "b",
      explanation: "Em JavaScript, comentários de linha única começam com '//'.",
    },
  ]

  const handleAnswerSelect = (answerId) => {
    if (showFeedback) return // Impede seleção durante o feedback

    setSelectedAnswer(answerId)
  }

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 10)
    }

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        // Prática concluída
        Alert.alert("Prática Concluída!", `Você ganhou ${score + (isCorrect ? 10 : 0)} pontos de experiência!`, [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("Home"),
          },
        ])
      }
    }, 2000)
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Praticar</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestion + 1}/{questions.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestionData.question}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestionData.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedAnswer === option.id && styles.selectedOption,
                  showFeedback && option.id === currentQuestionData.correctAnswer && styles.correctOption,
                  showFeedback &&
                    selectedAnswer === option.id &&
                    option.id !== currentQuestionData.correctAnswer &&
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
                      showFeedback && option.id === currentQuestionData.correctAnswer && styles.correctIndicator,
                      showFeedback &&
                        selectedAnswer === option.id &&
                        option.id !== currentQuestionData.correctAnswer &&
                        styles.incorrectIndicator,
                    ]}
                  >
                    <Text style={styles.optionLetter}>{option.id.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.optionText}>{option.text}</Text>
                </View>

                {showFeedback && option.id === currentQuestionData.correctAnswer && (
                  <Ionicons name="checkmark-circle" size={24} color="#58CC02" />
                )}
                {showFeedback && selectedAnswer === option.id && option.id !== currentQuestionData.correctAnswer && (
                  <Ionicons name="close-circle" size={24} color="#FF3B30" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {showFeedback && (
            <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
              <Ionicons name={isCorrect ? "checkmark-circle" : "close-circle"} size={24} color="white" />
              <Text style={styles.feedbackText}>
                {isCorrect ? "Correto!" : "Incorreto!"} {currentQuestionData.explanation}
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

      <BottomTabBar navigation={navigation} activeScreen="Practice" />
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
