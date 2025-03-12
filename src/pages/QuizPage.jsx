import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SectionTemplate from '../components/sections/SectionTemplate';
import Quiz from '../components/tutorial/Quiz';
import { useProgress } from '../contexts/ProgressContext';

// Import quizzes
import { historicalQuiz } from '../data/quizzes/historicalQuiz';

// Map of section IDs to quiz data
const quizzes = {
  historical: historicalQuiz,
  // Add more quizzes as they are created
};

// Map of sections to their next and previous links
const navigationMap = {
  historical: {
    prev: { path: '/history/timeline', label: 'Timeline' },
    next: { path: '/identities', label: 'Identities & Terminologies' },
  },
  // Add more navigation mapping as sections are created
};

const QuizPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { markAsCompleted } = useProgress();
  
  const quiz = quizzes[sectionId];
  
  useEffect(() => {
    // Add any side effects needed when the component mounts
  }, [sectionId]);
  
  if (!quiz) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Quiz Not Found
        </Typography>
        <Typography variant="body1">
          The quiz for this section is not available yet.
        </Typography>
      </Box>
    );
  }
  
  const handleQuizComplete = (score) => {
    // Mark the quiz as completed
    markAsCompleted(sectionId, 'quiz');
    
    // You could save the score in the progress context if needed
    
    // Auto-navigate after a delay if needed
    setTimeout(() => {
      if (navigationMap[sectionId]?.next) {
        navigate(navigationMap[sectionId].next.path);
      }
    }, 5000); // 5 second delay
  };
  
  return (
    <SectionTemplate
      sectionId={sectionId}
      title={`${quiz.title}`}
      subtitle="Test your knowledge and understanding"
      introduction={{
        title: "Knowledge Check",
        description: quiz.description || "Answer the following questions to test your understanding of this section."
      }}
      subsections={[]} // Quiz doesn't have subsections
      activeSubsection="quiz"
      prevLink={navigationMap[sectionId]?.prev}
      nextLink={navigationMap[sectionId]?.next}
    >
      <Quiz 
        questions={quiz.questions} 
        onComplete={handleQuizComplete}
        sectionId={sectionId}
      />
    </SectionTemplate>
  );
};

export default QuizPage;