import { AppBar, Toolbar, Typography, Container, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import GridViewIcon from '@mui/icons-material/GridView'
import DescriptionIcon from '@mui/icons-material/Description'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Claims', path: '/claims', icon: <GridViewIcon /> },
    { label: 'Documents', path: '/documents', icon: <DescriptionIcon /> },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setMobileOpen(false)
  }

  const drawerContent = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.path}
          onClick={() => handleNavigation(item.path)}
          sx={{
            bgcolor: location.pathname === item.path ? '#e3f2fd' : 'transparent',
            borderLeft: location.pathname === item.path ? '4px solid #1976d2' : 'none',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
        >
          <ListItemIcon sx={{ color: location.pathname === item.path ? '#1976d2' : 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              sx: { fontWeight: location.pathname === item.path ? 'bold' : 'normal' },
            }}
          />
        </ListItem>
      ))}
    </List>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* App Bar */}
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer', flex: 1 }}
            onClick={() => handleNavigation('/')}
          >
            🏢 ABC Claims POC
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    pb: 1,
                    borderBottom: location.pathname === item.path ? '2px solid #fff' : 'none',
                    transition: 'all 0.3s',
                    '&:hover': { opacity: 0.8 },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ABC Claims POC
            </Typography>
          </Box>
          {drawerContent}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2c3e50', color: '#ecf0f1', py: 3, mt: 4 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2">
              © 2024 ABC Insurance Claims Platform - POC
            </Typography>
            <Typography variant="body2">
              React 19 • Vite • Material-UI • TanStack Query
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
