// In your HistoricalPage.jsx
import React from 'react';
import {
  Typography, Box, Card, CardContent
} from '@mui/material';
import {
  Timeline, TimelineItem, TimelineSeparator,
  TimelineConnector, TimelineContent, TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { useParams, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import SectionTemplate from '../components/sections/SectionTemplate';
import { historicalData } from '../data';

const TimelinePaper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const PeriodCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  overflow: 'visible',
}));

const PeriodHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.gradients?.primary,
  color: theme.palette.primary.contrastText,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

const subsections = [
  { id: 'ancient', title: 'Ancient India', path: '/history/ancient', description: 'Gender and sexual diversity in ancient Indian history' },
  { id: 'colonial', title: 'Colonial Era', path: '/history/colonial', description: 'The impact of British colonialism on LGBTQAI+ rights' },
  { id: 'activism', title: 'Modern Activism', path: '/history/activism', description: 'The emergence and growth of LGBTQAI+ activism' },
  { id: 'timeline', title: 'Timeline', path: '/history/timeline', description: 'Key milestones in the journey for LGBTQAI+ rights' },
];

const HistoricalPage = () => {
  const { subsectionId } = useParams();



  // Find subsection data
  const activePeriod = historicalData.periods.find(period => period.id === subsectionId);

  // Render content based on subsection
  const renderContent = () => {
    if (subsectionId === 'timeline') {
      return (
        <TimelinePaper>
          <Typography variant="h5" gutterBottom>
            LGBTQAI+ Rights Timeline in India
          </Typography>
          <Timeline position="alternate">
            {historicalData.timeline.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary">
                  {event.year}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < historicalData.timeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="subtitle1">{event.event}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.significance}
                    </Typography>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelinePaper>
      );
    }

    if (activePeriod) {
      return (
        <PeriodCard>
          <PeriodHeader>
            <Typography variant="h5">{activePeriod.title}</Typography>
          </PeriodHeader>
          <CardContent>
            <Typography variant="body1" paragraph>
              {activePeriod.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Key Points
            </Typography>

            {activePeriod.keyPoints.map((point, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  {point.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Source: {point.source}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </PeriodCard>
      );
    }

    return (
      <Box>
        <Typography variant="h5" color="error">
          Content for this section is not available.
        </Typography>
      </Box>
    );
  };

  return (
    <SectionTemplate
      sectionId="historical"
      title="Historical Context of LGBTQAI+ Advocacy in India"
      subtitle="From ancient acceptance to modern struggles and victories"
      introduction={historicalData.introduction}
      subsections={subsections}
      activeSubsection={subsectionId}
      prevLink={{ path: '/introduction', label: 'Introduction' }}
      nextLink={{ path: '/identities', label: 'Identities & Terminologies' }}
    >
      {renderContent()}
    </SectionTemplate>
  );
};

export default HistoricalPage;