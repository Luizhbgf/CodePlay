import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  Animated,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function LessonScreen({ navigation, route }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const progressAnim = new Animated.Value(0)

  const { lesson, moduleTitle } = route.params || { lesson: { title: "Introdução ao HTML" }, moduleTitle: "HTML" }

  // Dados da lição
  const lessonSteps = [
    {
      id: "intro",
      title: "Introdução ao HTML",
      content:
        "HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Com HTML, você pode criar seu próprio site. HTML é fácil de aprender - você vai gostar!",
      icon: "document-text",
      hint: "HTML significa HyperText Markup Language",
    },
    {
      id: "structure",
      title: "Estrutura Básica",
      content:
        "Um documento HTML começa com <!DOCTYPE html> e contém elementos HTML entre <html> e </html>. A parte visível do documento está entre <body> e </body>.",
      icon: "construct",
      hint: "O DOCTYPE informa ao navegador que o documento é HTML5",
    },
    {
      id: "elements",
      title: "Elementos HTML",
      content:
        "Os elementos HTML são representados por tags. As tags HTML são nomes de elementos cercados por colchetes angulares: <tagname>conteúdo</tagname>",
      icon: "code-slash",
      hint: "A maioria das tags HTML vem em pares: tag de abertura e tag de fechamento",
    },
    {
      id: "example",
      title: "Exemplo Prático",
      content: `<!DOCTYPE html>
<html>
<head>
  <title>Minha Primeira Página</title>
</head>
<body>
  <h1>Meu Primeiro Título</h1>
  <p>Meu primeiro parágrafo.</p>
</body>
</html>`,
      icon: "laptop",
      isCode: true,
      hint: "Este é um exemplo completo de uma página HTML básica",
    },
    {
      id: "quiz",
      title: "Teste Rápido",
      isQuiz: true,
      question: "Qual tag é usada para criar um parágrafo em HTML?",
      options: [
        { id: "a", text: "<paragraph>" },
        { id: "b", text: "<p>" },
        { id: "c", text: "<para>" },
        { id: "d", text: "<pg>" },
      ],
      correctAnswer: "b",
      hint: "É uma tag de uma única letra",
    },
  ]

  useEffect(() => {
    // Atualizar a barra de progresso quando o passo atual mudar
    const newProgress = (currentStep + 1) / lessonSteps.length
    setProgress(newProgress)

    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [currentStep])

  // Função para avançar para a próxima etapa
  const nextStep = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowHint(false)
    } else {
      // Lição completa
      Alert.alert("Lição Concluída!", "Você ganhou 20 pontos de experiência!", [
        {
          text: "Continuar",
          onPress: () => navigation.navigate("Home"),
        },
      ])
    }
  }

  // Função para voltar para a etapa anterior
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowHint(false)
    } else {
      navigation.goBack()
    }
  }

  // Função para verificar resposta do quiz
  const checkAnswer = (optionId) => {
    const currentQuiz = lessonSteps[currentStep]
    if (currentQuiz.correctAnswer === optionId) {
      Alert.alert("Correto!", "Muito bem! Vamos continuar.", [{ text: "Próximo", onPress: nextStep }])
    } else {
      Alert.alert("Incorreto", "Tente novamente ou use uma dica.", [{ text: "OK" }])
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const renderContent = () => {
    const currentLesson = lessonSteps[currentStep]

    if (currentLesson.isQuiz) {
      return (
        <View style={styles.quizContainer}>
          <Text style={styles.quizQuestion}>{currentLesson.question}</Text>

          {currentLesson.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.quizOption}
              onPress={() => checkAnswer(option.id)}
            >
              <View style={styles.quizOptionCircle}>
                <Text style={styles.quizOptionLetter}>{option.id.toUpperCase()}</Text>
              </View>
              <Text style={styles.quizOptionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    }

    if (currentLesson.isCode) {
      return (
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{currentLesson.content}</Text>
        </View>
      )
    }

    return <Text style={styles.contentText}>{currentLesson.content}</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{moduleTitle}</Text>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFilled, 
                { width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                }) }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1}/{lessonSteps.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.lessonTitle}>
            <View style={styles.iconContainer}>
              <Ionicons name={lessonSteps[currentStep].icon || "document-text"} size={30} color="white" />
            </View>
            <Text style={styles.titleText}>{lessonSteps[currentStep].title}</Text>
          </View>

          {renderContent()}

          {showHint && (
            <View style={styles.hintContainer}>
              <Ionicons name="bulb" size={20} color="#FFCC00" />
              <Text style={styles.hintText}>{lessonSteps[currentStep].hint}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.hintButton} onPress={toggleHint}>
          <Ionicons name="bulb" size={24} color="#FFCC00" />
          <Text style={styles.hintButtonText}>Dica</Text>
        </TouchableOpacity>

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={[styles.navButton, styles.prevButton]} onPress={prevStep}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={nextStep}>
            <Text style={styles.nextButtonText}>
              {currentStep < lessonSteps.length - 1 ? "Continuar" : "Concluir"}
            </Text>
            <Ionicons
              name={currentStep < lessonSteps.length - 1 ? "arrow-forward" : "checkmark"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
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
    paddingTop: 40,
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
    marginBottom: 15,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    marginBottom: 5,
  },
  progressFilled: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  progressText: {
    color: "white",
    fontSize: 12,
    textAlign: "right",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  lessonTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#58CC02",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  contentText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
  },
  codeBlock: {
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginVertical: 10,
  },
  codeText: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  quizContainer: {
    marginTop: 20,
  },
  quizQuestion: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  quizOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  quizOptionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#58CC02",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  quizOptionLetter: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  quizOptionText: {
    fontSize: 16,
    color: "#333",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E5",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  hintText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  hintButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  hintButtonText: {
    color: "#FFCC00",
    fontWeight: "bold",
    marginLeft: 5,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  nextButton: {
    backgroundColor: "#58CC02",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
})

