import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const questionBank = [
  {
    question: 'Question 1',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  },
  // ... Add other questions here
];

const MainActivity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questionBank[currentIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
      Alert.alert('Correct Answer!', 'Congratulations!');
    } else {
      Alert.alert('Wrong Answer!', 'Try again!');
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentIndex < questionBank.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      showResult();
    }
  };

  const showResult = () => {
    Alert.alert(
      'Quiz Completed',
      `Your score is ${score}/${questionBank.length}`,
      [
        { text: 'Finish Quiz', onPress: () => resetQuiz() },
        { text: 'Try Again', onPress: () => restartQuiz() },
      ]
    );
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
  };

  const restartQuiz = () => {
    resetQuiz();
    nextQuestion();
  };

  const currentQuestion = questionBank[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswer(option)}
        />
      ))}
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default MainActivity;
