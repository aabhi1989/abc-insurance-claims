import { Container, Paper, Typography, Box, Grid, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView'
import DescriptionIcon from '@mui/icons-material/Description'

function HomePage() {
  const navigate = useNavigate()
  const versions = {
    react: React.version,
    typescript: '5.3.0',
    vite: '5.0.0',
    mui: '6.0.0',
    tanstackQuery: '5.0.0',
    vitest: '1.0.0',
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          🏢 ABC Insurance Claims Platform
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom sx={{ mb: 4 }}>
          Proof of Concept - Frontend Architecture
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            📦 Technology Stack Versions:
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(versions).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mt: 0.5 }}>
                    v{value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 1, borderLeft: '4px solid #1976d2', mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#1565c0', fontFamily: 'monospace', lineHeight: 1.8 }}>
            ✅ POC scaffold ready | Features: Claims Grid, Document Workspace | Testing: Vitest + Playwright
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<GridViewIcon />}
            onClick={() => navigate('/claims')}
          >
            View Claims Grid
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={() => navigate('/documents')}
          >
            Document Workspace
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              🚀 Ready to Start
            </Typography>
            <Typography variant="body2" color="textSecondary">
              The POC scaffold includes all necessary configurations and is ready for feature development.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              📁 Organized Structure
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Feature-based architecture with clear separation of concerns and path aliases.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              🧪 Testing Ready
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Vitest, React Testing Library, and Playwright configured and ready to use.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomePage
