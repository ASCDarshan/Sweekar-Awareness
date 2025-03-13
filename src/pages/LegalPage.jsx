import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Container,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
    Divider,
    Chip,
    useTheme,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    IconButton,
    Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import GavelIcon from "@mui/icons-material/Gavel";
import ArticleIcon from "@mui/icons-material/Article";
import BalanceIcon from "@mui/icons-material/Balance";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import SectionHeader from "../components/ui/SectionHeader";
import { legalData } from "../data/legalData";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";

const GradientCard = styled(Card)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "5px",
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
}));

const CaseCard = styled(Card)(({ theme }) => ({
    height: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[8],
    },
}));

const ChallengeCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: "4px",
        background: theme.palette.error.main,
    },
}));

const StyledTimelineDot = styled(TimelineDot)(({ theme }) => ({
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const LegalPage = () => {
    const theme = useTheme();
    const [expandedCase, setExpandedCase] = useState(null);
    const [expandedChallenges, setExpandedChallenges] = useState({});

    const handleExpandCase = (id) => {
        setExpandedCase(expandedCase === id ? null : id);
    };

    const handleExpandChallenge = (issue) => {
        setExpandedChallenges((prev) => ({
            ...prev,
            [issue]: !prev[issue],
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title={legalData?.introduction?.title}
                        subtitle={legalData?.introduction?.description}
                    />

                    <Timeline position="alternate">
                        {legalData.landmark_cases.map((caseData, index) => (
                            <TimelineItem key={caseData.id}>
                                <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.7 }}
                                    >
                                        <Typography variant="h6" component="span">
                                            {caseData.title.split("(")[0]}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            ({caseData.title.split("(")[1]}
                                        </Typography>
                                    </motion.div>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <StyledTimelineDot>
                                        <GavelIcon />
                                    </StyledTimelineDot>
                                    {index < legalData.landmark_cases.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: 2, px: 2 }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.7 }}
                                    >
                                        <GradientCard>
                                            <CardContent>
                                                <Typography variant="body1" sx={{ mb: 2 }}>
                                                    {caseData.description}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontStyle: 'italic', mb: 2 }}
                                                >
                                                    {caseData.significance}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end'
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => handleExpandCase(caseData.id)}
                                                        aria-expanded={expandedCase === caseData.id}
                                                        aria-label="show more"
                                                    >
                                                        {expandedCase === caseData.id ? (
                                                            <KeyboardArrowUpIcon />
                                                        ) : (
                                                            <KeyboardArrowDownIcon />
                                                        )}
                                                    </IconButton>
                                                </Box>

                                                <Collapse in={expandedCase === caseData.id}>
                                                    <Divider sx={{ mb: 2 }} />
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Key Findings
                                                    </Typography>
                                                    <List dense>
                                                        {caseData.key_findings.map((finding, idx) => (
                                                            <ListItem key={idx}>
                                                                <ListItemIcon sx={{ minWidth: '32px' }}>
                                                                    <BalanceIcon color="primary" fontSize="small" />
                                                                </ListItemIcon>
                                                                <ListItemText primary={finding} />
                                                            </ListItem>
                                                        ))}
                                                    </List>

                                                    <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                                                        Bench of Justices
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {caseData.justices.map((justice, idx) => (
                                                            <Chip
                                                                key={idx}
                                                                label={justice}
                                                                size="small"
                                                                avatar={<Avatar>{justice.charAt(0)}</Avatar>}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Collapse>
                                            </CardContent>
                                        </GradientCard>
                                    </motion.div>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title="Current Legal Challenges"
                        subtitle="Ongoing issues and advocacy efforts in the fight for equal rights"
                    />

                    <Grid container spacing={3}>
                        {legalData.current_challenges.map((challenge) => (
                            <Grid item xs={12} key={challenge.issue}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ChallengeCard>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <WarningIcon color="error" sx={{ mr: 2 }} />
                                                    <Typography variant="h6">
                                                        {challenge.issue}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label="Ongoing Issue"
                                                    color="error"
                                                    variant="outlined"
                                                />
                                            </Box>

                                            <Typography variant="body1" sx={{ mt: 2, mb: 2, pl: 5 }}>
                                                {challenge.description}
                                            </Typography>

                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <IconButton
                                                    onClick={() => handleExpandChallenge(challenge.issue)}
                                                    aria-expanded={expandedChallenges[challenge.issue] || false}
                                                    aria-label="show more"
                                                >
                                                    {expandedChallenges[challenge.issue] ? (
                                                        <KeyboardArrowUpIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                                </IconButton>
                                            </Box>

                                            <Collapse in={expandedChallenges[challenge.issue] || false}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        bgcolor: 'background.default',
                                                        p: 2,
                                                        mt: 2,
                                                        borderRadius: 1
                                                    }}
                                                >
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        Current Status
                                                    </Typography>
                                                    <Typography variant="body2" paragraph>
                                                        {challenge.status}
                                                    </Typography>

                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        Advocacy Efforts
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {challenge.advocacy_efforts}
                                                    </Typography>
                                                </Paper>
                                            </Collapse>
                                        </CardContent>
                                    </ChallengeCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title="Transgender Rights Act"
                        subtitle="Analysis of the Transgender Persons (Protection of Rights) Act, 2019"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ height: '100%' }}>
                                    <CardHeader
                                        title="Key Provisions"
                                        avatar={
                                            <ArticleIcon color="primary" />
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body1" paragraph>
                                            {legalData.transgender_rights.description}
                                        </Typography>
                                        <List>
                                            {legalData.transgender_rights.key_provisions.map((provision, index) => (
                                                <ListItem key={index}>
                                                    <ListItemIcon>
                                                        <PeopleIcon color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={provision} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        bgcolor: 'error.light',
                                        color: 'error.contrastText'
                                    }}
                                >
                                    <CardHeader
                                        title="Criticisms"
                                        avatar={
                                            <WarningIcon />
                                        }
                                    />
                                    <CardContent>
                                        <List>
                                            {legalData.transgender_rights.criticisms.map((criticism, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText
                                                        primary={criticism}
                                                        primaryTypographyProps={{
                                                            variant: 'body1',
                                                            color: 'inherit'
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Box>

                <Box
                    sx={{
                        py: 6,
                        px: 4,
                        textAlign: "center",
                        background: theme.palette.background.gradient || 'rgba(0,0,0,0.03)',
                        borderRadius: theme.shape.borderRadius,
                        mb: 4,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography variant="h4" component="h2" gutterBottom>
                            Legal Rights are Human Rights
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
                        >
                            While India has made significant progress in recognizing LGBTQAI+ rights,
                            there is still work to be done to ensure full equality and protection under the law.
                            Understanding the legal landscape is crucial for advocacy and creating positive change.
                        </Typography>
                    </Container>
                </Box>
            </Container>
        </motion.div>
    );
};

export default LegalPage;