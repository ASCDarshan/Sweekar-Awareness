import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  useMediaQuery, useTheme, Avatar, LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import GavelIcon from '@mui/icons-material/Gavel';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SupportIcon from '@mui/icons-material/Support';
import SchoolIcon from '@mui/icons-material/School';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: theme.rainbowTheme.gradients?.rainbow,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(2),
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 500,
  '&:hover': {
    backgroundColor: theme.palette.background.card,
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: '6px',
    left: '20%',
    width: '60%',
    height: '3px',
    background: theme.rainbowTheme.gradients?.rainbow,
    borderRadius: '4px',
  } : {},
}));

const ProgressIndicator = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  '& .MuiLinearProgress-bar': {
    background: theme.rainbowTheme.gradients?.rainbow,
  },
}));

// Main navigation items
const navigationItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'History', icon: <HistoryEduIcon />, path: '/history' },
  { text: 'Identities', icon: <VisibilityIcon />, path: '/identities' },
  { text: 'Legal', icon: <GavelIcon />, path: '/legal' },
  { text: 'Challenges', icon: <PsychologyIcon />, path: '/challenges' },
  { text: 'Progress', icon: <SchoolIcon />, path: '/progress' },
  { text: 'Resources', icon: <SupportIcon />, path: '/resources' },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { getOverallProgress } = useProgress();

  const progress = getOverallProgress();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Mobile drawer content
  const drawerContent = (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo variant="h6">LGBTQAI+ Awareness</Logo>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              bgcolor: isActive(item.path) ? 'background.card' : 'transparent',
              borderLeft: isActive(item.path) ? `4px solid ${theme.palette.primary.main}` : 'none',
              pl: isActive(item.path) ? 2 : 3,
            }}
          >
            <ListItemIcon sx={{
              color: isActive(item.path) ? 'primary.main' : 'text.secondary',
              minWidth: 40,
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '& .MuiListItemText-primary': {
                  fontWeight: isActive(item.path) ? 600 : 400,
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          {/* Logo */}
          <Logo variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
            LGBTQAI+ Awareness
          </Logo>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {navigationItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  active={isActive(item.path) ? 1 : 0}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              ))}
            </Box>
          )}

          {/* Right side content - progress indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {Math.round(progress)}% Complete
            </Typography>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: progress >= 100 ? theme.rainbowTheme.gradients?.rainbow : theme.palette.background.card,
                color: theme.palette.text.primary,
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: theme.shadows[1],
              }}
            >
              {Math.round(progress)}%
            </Avatar>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
        <ProgressIndicator variant="determinate" value={progress} />
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;