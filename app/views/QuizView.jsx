"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const QuizView = ({ route, navigation }) => {
  const { course } = route.params
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // Simulando perguntas baseadas no curso
    const quizQuestions = generateQuestions(course)
    setQuestions(quizQuestions)
  }, [course])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleNext()
    }
  }, [timeLeft, showResult])

  const generateQuestions = (course) => {
    // Simulando perguntas baseadas no curso
    if (course.title.includes("JavaScript")) {
      return [
        {
          id: 1,
          question: "Qual é a saída do código: console.log(typeof [])?",
          options: ["array", "object", "undefined", "null"],
          correctAnswer: 1,
          explanation: "Em JavaScript, arrays são do tipo 'object'.",
        },
        {
          id: 2,
          question: "Como declarar uma variável constante em JavaScript?",
          options: ["var x = 5", "let x = 5", "const x = 5", "variable x = 5"],
          correctAnswer: 2,
          explanation: "A palavra-chave 'const' é usada para declarar constantes em JavaScript.",
        },
        {
          id: 3,
          question: "O que é hoisting em JavaScript?",
          options: [
            "Um erro de sintaxe",
            "Um método de array",
            "O comportamento de mover declarações para o topo",
            "Uma função nativa",
          ],
          correctAnswer: 2,
          explanation: "Hoisting é o comportamento do JavaScript de mover declarações para o topo do escopo atual.",
        },
        {
          id: 4,
          question: "Qual método é usado para adicionar um elemento ao final de um array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: 0,
          explanation: "O método push() adiciona um ou mais elementos ao final de um array.",
        },
        {
          id: 5,
          question: "Como verificar se uma variável é um array em JavaScript?",
          options: [
            "typeof variable === 'array'",
            "variable instanceof Array",
            "Array.isArray(variable)",
            "variable.isArray()",
          ],
          correctAnswer: 2,
          explanation: "Array.isArray() é o método recomendado para verificar se um valor é um array.",
        },
      ]
    } else if (course.title.includes("HTML")) {
      return [
        {
          id: 1,
          question: "Qual tag HTML é usada para criar um link?",
          options: ["<link>", "<a>", "<href>", "<url>"],
          correctAnswer: 1,
          explanation: "A tag <a> (anchor) é usada para criar links em HTML.",
        },
        {
          id: 2,
          question: "Qual atributo HTML especifica um caminho alternativo para uma imagem?",
          options: ["src", "alt", "title", "href"],
          correctAnswer: 1,
          explanation: "O atributo 'alt' fornece um texto alternativo para uma imagem se ela não puder ser exibida.",
        },
        {
          id: 3,
          question: "Qual tag HTML cria uma lista não ordenada?",
          options: ["<ol>", "<li>", "<ul>", "<list>"],
          correctAnswer: 2,
          explanation: "A tag <ul> (unordered list) cria uma lista não ordenada com marcadores.",
        },
        {
          id: 4,
          question: "Qual propriedade CSS é usada para mudar a cor do texto?",
          options: ["text-color", "font-color", "color", "text-style"],
          correctAnswer: 2,
          explanation: "A propriedade 'color' é usada para definir a cor do texto em CSS.",
        },
        {
          id: 5,
          question: "Como centralizar um elemento horizontalmente em CSS?",
          options: ["text-align: center", "margin: auto", "align: center", "position: center"],
          correctAnswer: 1,
          explanation: "Para centralizar um elemento de bloco horizontalmente, use 'margin: auto'.",
        },
      ]
    } else if (course.title.includes("React")) {
      return [
        {
          id: 1,
          question: "Qual hook é usado para gerenciar estado em componentes funcionais?",
          options: ["useEffect", "useState", "useContext", "useReducer"],
          correctAnswer: 1,
          explanation: "O hook useState é usado para adicionar estado a componentes funcionais.",
        },
        {
          id: 2,
          question: "Como passar props para um componente em React Native?",
          options: [
            "<Component props={props}>",
            "<Component {props}>",
            "<Component ...props>",
            "<Component name='value'>",
          ],
          correctAnswer: 3,
          explanation: "Props são passados como atributos: <Component name='value'>.",
        },
        {
          id: 3,
          question: "Qual componente é usado para criar uma lista em React Native?",
          options: ["<List>", "<ScrollView>", "<FlatList>", "<ListView>"],
          correctAnswer: 2,
          explanation: "O componente <FlatList> é otimizado para renderizar listas longas em React Native.",
        },
        {
          id: 4,
          question: "Como estilizar componentes em React Native?",
          options: ["CSS externo", "Inline styles", "StyleSheet.create()", "className"],
          correctAnswer: 2,
          explanation: "StyleSheet.create() é o método recomendado para criar estilos em React Native.",
        },
        {
          id: 5,
          question: "Qual é o ciclo de vida equivalente a componentDidMount em hooks?",
          options: ["useMount", "useEffect com array vazio", "useDidMount", "useLifecycle"],
          correctAnswer: 1,
          explanation: "useEffect(() => {}, []) com array de dependências vazio é equivalente a componentDidMount.",
        },
      ]
    } else {
      // Perguntas genéricas para outros cursos
      return [
        {
          id: 1,
          question: "Qual é a principal vantagem da programação orientada a objetos?",
          options: ["Execução mais rápida", "Menos código", "Reutilização de código", "Sintaxe mais simples"],
          correctAnswer: 2,
          explanation: "A POO permite reutilização de código através de herança e composição.",
        },
        {
          id: 2,
          question: "O que é um algoritmo?",
          options: [
            "Um tipo de linguagem de programação",
            "Um conjunto de instruções para resolver um problema",
            "Um erro de compilação",
            "Um tipo de variável",
          ],
          correctAnswer: 1,
          explanation: "Um algoritmo é um conjunto de instruções passo a passo para resolver um problema específico.",
        },
        {
          id: 3,
          question: "O que significa a sigla API?",
          options: [
            "Application Programming Interface",
            "Advanced Programming Integration",
            "Automated Program Installation",
            "Application Process Integration",
          ],
          correctAnswer: 0,
          explanation: "API significa Application Programming Interface (Interface de Programação de Aplicações).",
        },
        {
          id: 4,
          question: "O que é um banco de dados relacional?",
          options: [
            "Um banco de dados que armazena apenas números",
            "Um banco de dados que usa documentos JSON",
            "Um banco de dados que organiza dados em tabelas relacionadas",
            "Um banco de dados que só funciona online",
          ],
          correctAnswer: 2,
          explanation: "Um banco de dados relacional organiza dados em tabelas que podem se relacionar entre si.",
        },
        {
          id: 5,
          question: "O que é Git?",
          options: [
            "Uma linguagem de programação",
            "Um sistema de controle de versão",
            "Um banco de dados",
            "Um framework web",
          ],
          correctAnswer: 1,
          explanation: "Git é um sistema de controle de versão distribuído para rastrear mudanças no código-fonte.",
        },
      ]
    }
  }

  const handleOptionSelect = (index) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    // Verificar resposta e atualizar pontuação
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    // Resetar seleção e tempo
    setSelectedOption(null)
    setTimeLeft(30)

    // Avançar para próxima pergunta ou mostrar resultado
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleTryAgain = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(30)
  }

  const handleFinish = () => {
    // Aqui você pode salvar o resultado no Supabase
    Alert.alert("Quiz Concluído", `Você acertou ${score} de ${questions.length} questões!`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando quiz...</Text>
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
              <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentQuestion + 1}/{questions.length}
            </Text>
          </View>

          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={20} color={timeLeft < 10 ? "#FF6B35" : "#4CAF50"} />
            <Text style={[styles.timerText, timeLeft < 10 && styles.timerWarning]}>{timeLeft}s</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>

            <View style={styles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionCard, selectedOption === index && styles.selectedOption]}
                  onPress={() => handleOptionSelect(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {selectedOption === index && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !selectedOption && styles.buttonDisabled]}
              onPress={handleNext}
              disabled={selectedOption === null}
            >
              <LinearGradient
                colors={["#4CAF50", "#45a049"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextButtonText}>Próxima</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.resultContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{score}</Text>
              <Text style={styles.scoreDivider}>/</Text>
              <Text style={styles.scoreTotal}>{questions.length}</Text>
            </View>

            <Text style={styles.resultTitle}>
              {score === questions.length
                ? "Perfeito!"
                : score >= questions.length / 2
                  ? "Bom trabalho!"
                  : "Continue praticando!"}
            </Text>

            <Text style={styles.resultDescription}>
              {score === questions.length
                ? "Você acertou todas as perguntas! Incrível!"
                : score >= questions.length / 2
                  ? "Você está indo bem! Continue estudando."
                  : "Não desista! A prática leva à perfeição."}
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

            <Text style={styles.reviewTitle}>Revisão das Perguntas:</Text>

            {questions.map((q, index) => (
              <View key={index} style={styles.reviewCard}>
                <Text style={styles.reviewQuestion}>
                  {index + 1}. {q.question}
                </Text>
                <Text style={styles.reviewAnswer}>Resposta correta: {q.options[q.correctAnswer]}</Text>
                <Text style={styles.reviewExplanation}>{q.explanation}</Text>
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
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  selectedOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#F0FFF0",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  nextButton: {
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  reviewAnswer: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 5,
  },
  reviewExplanation: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
})

export default QuizView
