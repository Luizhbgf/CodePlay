import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuizScreen({ navigation }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progressFilled} />
        <Text style={styles.progressText}>2/5</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.questionIcon}>
          <Text style={styles.questionMark}>?</Text>
        </View>
        
        <Text style={styles.question}>
          Qual tag cria um parágrafo em HTML?
        </Text>
        
        <View style={styles.options}>
          <TouchableOpacity 
            style={[
              styles.optionCard, 
              selectedAnswer === 0 && styles.selectedOption
            ]}
            onPress={() => handleAnswer(0)}
          >
            <Text style={styles.optionText}>&lt;body&gt;</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.optionCard, 
              selectedAnswer === 1 && styles.selectedOption
            ]}
            onPress={() => handleAnswer(1)}
          >
            <Text style={styles.optionText}>&lt;div&gt;</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.optionCard, 
              selectedAnswer === 2 && styles.selectedOption
            ]}
            onPress={() => handleAnswer(2)}
          >
            <Text style={styles.optionText}>&lt;p&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.nextButton,
          selectedAnswer === null && styles.disabledButton
        ]}
        disabled={selectedAnswer === null}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.nextButtonText}>Avançar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A5F7',
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressFilled: {
    height: '100%',
    width: '40%',
    backgroundColor: '#4CD964',
    borderRadius: 5,
  },
  progressText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  questionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  questionMark: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  options: {
    width: '100%',
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#4CD964',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#4CD964',
    borderRadius: 30,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});