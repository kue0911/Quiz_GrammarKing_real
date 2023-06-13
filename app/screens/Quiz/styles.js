import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Colors } from 'react-native-paper';

const App = () => {
  const questionBank = [
    {
      questionId: 'question_1',
      options: ['question1_A', 'question1_B', 'question1_C', 'question1_D'],
      answer: 'answer_1',
    },
    // 나머지 질문들도 동일하게 추가해주세요
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const progress = Math.ceil((100 / questionBank.length) * questionNumber);

  const checkAnswer = (userSelection) => {
    const correctAnswer = questionBank[currentIndex].answer;

    if (userSelection === correctAnswer) {
      setScore(score + 1);
    }

    updateQuestion();
  };

  const updateQuestion = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex === questionBank.length) {
      // Handle end quiz
    } else {
      setCurrentIndex(nextIndex);
      setQuestionNumber(questionNumber + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>{questionNumber}</Text>

      <Text style={styles.questionText}>{questionBank[currentIndex].questionId}</Text>

      {questionBank[currentIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => checkAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.score}>Score: {score}/{questionBank.length}</Text>

      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress / 100}
        color={Colors.red800}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CCCFF',
    padding: 20,
  },
  questionNumber: {
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'myungjo',
  },
  questionText: {
    flex: 1,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 25,
    fontFamily: 'myungjo',
    paddingHorizontal: 50,
    paddingVertical: 60,
  },
  optionButton: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 50,
    alignItems: 'center',
  },
  optionText: {
    color: Colors.black,
    fontFamily: 'myungjo',
  },
  score: {
    alignSelf: 'flex-end',
    padding: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontFamily: 'myungjo',
  },
});

export default App;
