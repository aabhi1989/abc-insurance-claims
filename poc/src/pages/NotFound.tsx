import { Container, Paper, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#dc004e' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#666' }}>
            The requested URL could not be found on this server.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </Paper>
    </Container>
  )
}

export default NotFoundPage
