import React from "react";
import { Box, Container, Typography, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";

import SectionHeader from "../components/ui/SectionHeader";
import Glossary from "../components/tutorial/Glossary";
import { glossaryTerms } from "../data/glossaryData";
import Layout from "../components/layout/Layout";

const GlossaryPage = () => {
  const theme = useTheme();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader
          title="LGBTQAI+ Terminology Glossary"
          subtitle="Understanding the terminology used in discussions about gender, sexuality, and LGBTQAI+ issues"
        />

        <Paper
          elevation={1}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: theme.shape.borderRadius,
            background: theme.palette.background.paper,
          }}
        >
          <Typography variant="body1" paragraph>
            This glossary provides definitions for common terms used in LGBTQAI+
            discourse. Language is constantly evolving, and these definitions
            may change over time. It's always best to respect how individuals
            identify themselves and the terms they prefer.
          </Typography>

          <Typography variant="body1" paragraph>
            Use the search bar to find specific terms, filter by category, or
            browse alphabetically using the letter tabs below.
          </Typography>
        </Paper>

        <Glossary terms={glossaryTerms} />
      </motion.div>
    </Layout>
  );
};

export default GlossaryPage;
