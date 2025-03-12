import React from 'react';
import { Box, Container, styled } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Main = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
}));

const Layout = ({ children, maxWidth = 'lg' }) => {
  return (
    <Main>
      <Header />
      <ContentWrapper>
        <Container maxWidth={maxWidth}>
          {children}
        </Container>
      </ContentWrapper>
      <Footer />
    </Main>
  );
};

export default Layout;