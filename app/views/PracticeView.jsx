"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const PracticeView = ({ navigation }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [challenges, setChallenges] = useState([])
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    // Simulando desafios de prática
    const practiceData = [
      {
        id: 1,
        type: "code",
        title: "Completar o código",
        description: "Complete o código para somar dois números:",
        codeTemplate: "function soma(a, b) {\n  // Seu código aqui\n}",
        expectedOutput: "function soma(a, b) {\n  return a + b;\n}",
        hint: "Use o operador + para somar os valores.",
      },
      {
        id: 2,
        type: "debug",
        title: "Encontrar o erro",
        description: "Encontre e corrija o erro no código:",
        codeTemplate: "function multiplicar(a, b) {\n  return a * b\n  console.log('Resultado calculado');\n}",
        expectedOutput: "function multiplicar(a, b) {\n  console.log('Resultado calculado');\n  return a * b;\n}",
        hint: "O código após o return nunca é executado.",
      },
      {
        id: 3,
        type: "code",
        title: "Implementar função",
        description: "Implemente uma função que verifica se um número é par:",
        codeTemplate: "function ehPar(numero) {\n  // Seu código aqui\n}",
        expectedOutput: "function ehPar(numero) {\n  return numero % 2 === 0;\n}",
        hint: "Use o operador módulo (%) para verificar o resto da divisão por 2.",
      },
      {
        id: 4,
        type: "debug",
        title: "Corrigir o loop",
        description: "Corrija o loop infinito:",
        codeTemplate: "for (let i = 0; i < 10; i--) {\n  console.log(i);\n}",
        expectedOutput: "for (let i = 0; i < 10; i++) {\n  console.log(i);\n}",
        hint: "Verifique a direção do incremento/decremento.",
      },
      {
        id: 5,
        type: "code",
        title: "Manipular array",
        description: "Escreva uma função que retorne o maior número de um array:",
        codeTemplate: "function maiorNumero(array) {\n  // Seu código aqui\n}",
        expectedOutput: "function maiorNumero(array) {\n  return Math.max(...array);\n}",
        hint: "Você pode usar Math.max() com o operador spread (...).",
      },
    ]

    setChallenges(practiceData)
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !result) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult && !result) {
      handleSubmit()
    }
  }, [timeLeft, showResult, result])

  const handleSubmit = () => {
    const currentChallengeData = challenges[currentChallenge]

    // Comparação simplificada (na vida real, você faria uma análise mais sofisticada)
    const isCorrect = userAnswer.replace(/\s+/g, "") === currentChallengeData.expectedOutput.replace(/\s+/g, "")

    setResult({
      correct: isCorrect,
      message: isCorrect ? "Correto! Sua solução está perfeita." : "Não está correto. Tente novamente.",
      expectedOutput: currentChallengeData.expectedOutput,
    })

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1)
      setUserAnswer("")
      setResult(null)
      setTimeLeft(60)
    } else {
      setShowResult(true)
    }
  }

  const handleTryAgain = () => {
    setCurrentChallenge(0)
    setUserAnswer("")
    setResult(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(60)
  }

  const handleFinish = () => {
    Alert.alert("Prática Concluída", `Você acertou ${score} de ${challenges.length} desafios!`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

  if (challenges.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando desafios...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {!showResult ? (
        <>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${((currentChallenge + 1) / challenges.length) * 100}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentChallenge + 1}/{challenges.length}
            </Text>
          </View>

          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={20} color={timeLeft < 20 ? "#FF6B35" : "#4CAF50"} />
            <Text style={[styles.timerText, timeLeft < 20 && styles.timerWarning]}>{timeLeft}s</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeTypeTag}>
                <Text style={styles.challengeTypeText}>
                  {challenges[currentChallenge].type === "code" ? "CÓDIGO" : "DEBUG"}
                </Text>
              </View>
              <Text style={styles.challengeTitle}>{challenges[currentChallenge].title}</Text>
            </View>

            <Text style={styles.challengeDescription}>{challenges[currentChallenge].description}</Text>

            <View style={styles.codeEditorContainer}>
              <TextInput
                style={styles.codeEditor}
                multiline
                value={userAnswer || challenges[currentChallenge].codeTemplate}
                onChangeText={setUserAnswer}
                placeholder="Escreva seu código aqui..."
                placeholderTextColor="#999"
              />
            </View>

            {result && (
              <View style={[styles.resultBox, result.correct ? styles.correctResult : styles.incorrectResult]}>
                <Ionicons
                  name={result.correct ? "checkmark-circle" : "close-circle"}
                  size={24}
                  color={result.correct ? "#4CAF50" : "#FF6B35"}
                />
                <Text style={styles.resultMessage}>{result.message}</Text>

                {!result.correct && (
                  <View style={styles.expectedOutputContainer}>
                    <Text style={styles.expectedOutputLabel}>Solução esperada:</Text>
                    <Text style={styles.expectedOutputCode}>{result.expectedOutput}</Text>
                  </View>
                )}
              </View>
            )}

            <View style={styles.hintContainer}>
              <TouchableOpacity style={styles.hintButton}>
                <Ionicons name="bulb-outline" size={20} color="#FFD700" />
                <Text style={styles.hintButtonText}>Ver Dica</Text>
              </TouchableOpacity>
              <Text style={styles.hintText}>{challenges[currentChallenge].hint}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              {!result ? (
                <TouchableOpacity
                  style={[styles.submitButton, !userAnswer && styles.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={!userAnswer}
                >
                  <LinearGradient
                    colors={["#4CAF50", "#45a049"]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.submitButtonText}>Verificar</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <LinearGradient
                    colors={["#FF6B35", "#F7931E"]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.nextButtonText}>
                      {currentChallenge < challenges.length - 1 ? "Próximo Desafio" : "Ver Resultado"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.resultContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{score}</Text>
              <Text style={styles.scoreDivider}>/</Text>
              <Text style={styles.scoreTotal}>{challenges.length}</Text>
            </View>

            <Text style={styles.resultTitle}>
              {score === challenges.length
                ? "Excelente!"
                : score >= challenges.length / 2
                  ? "Bom trabalho!"
                  : "Continue praticando!"}
            </Text>

            <Text style={styles.resultDescription}>
              {score === challenges.length
                ? "Você completou todos os desafios corretamente!"
                : score >= challenges.length / 2
                  ? "Você está no caminho certo. Continue praticando para melhorar."
                  : "A prática leva à perfeição. Não desista!"}
            </Text>

            <View style={styles.resultButtons}>
              <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
                <Text style={styles.tryAgainButtonText}>Tentar Novamente</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <LinearGradient
                  colors={["#4CAF50", "#45a049"]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.finishButtonText}>Concluir</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Text style={styles.summaryTitle}>Resumo dos Desafios:</Text>

            {challenges.map((challenge, index) => (
              <View
                key={index}
                style={[
                  styles.challengeSummaryCard,
                  index < score ? styles.challengeCorrect : styles.challengeIncorrect,
                ]}
              >
                <View style={styles.challengeSummaryHeader}>
                  <Text style={styles.challengeSummaryTitle}>{challenge.title}</Text>
                  <Ionicons
                    name={index < score ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={index < score ? "#4CAF50" : "#FF6B35"}
                  />
                </View>
                <Text style={styles.challengeSummaryDescription}>{challenge.description}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 5,
  },
  timerWarning: {
    color: "#FF6B35",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  challengeHeader: {
    marginBottom: 15,
  },
  challengeTypeTag: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  challengeTypeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  challengeDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 24,
  },
  codeEditorContainer: {
    backgroundColor: "#2B2B2B",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  codeEditor: {
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontSize: 14,
    minHeight: 150,
  },
  resultBox: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    flexDirection: "column",
  },
  correctResult: {
    backgroundColor: "#E8F5E9",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  incorrectResult: {
    backgroundColor: "#FFF3E0",
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
  },
  resultMessage: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  expectedOutputContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  expectedOutputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  expectedOutputCode: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#333",
  },
  hintContainer: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  hintButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFB300",
    marginLeft: 5,
  },
  hintText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  submitButton: {
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
  },
  nextButton: {
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  resultContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scoreDivider: {
    fontSize: 36,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 5,
  },
  scoreTotal: {
    fontSize: 36,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  resultDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  resultButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  tryAgainButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  tryAgainButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  finishButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
    marginLeft: 10,
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  challengeSummaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    width: "100%",
    borderLeftWidth: 4,
  },
  challengeCorrect: {
    borderLeftColor: "#4CAF50",
  },
  challengeIncorrect: {
    borderLeftColor: "#FF6B35",
  },
  challengeSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  challengeSummaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  challengeSummaryDescription: {
    fontSize: 14,
    color: "#666",
  },
})

export default PracticeView
