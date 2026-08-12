import { Container, Paper, Typography, Box, Grid, Button, Stack, Card, CardContent, Chip } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import DescriptionIcon from '@mui/icons-material/Description'

function ClaimDetailsPage() {
  const { claimId } = useParams<{ claimId: string }>()
  const navigate = useNavigate()

  // Mock claim data - TODO: Fetch from API using useParams claimId
  const mockClaim = {
    id: claimId || 'CLM-000001',
    claimant: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    amount: '$45,250.00',
    status: 'In Review',
    dateSubmitted: '2024-01-15',
    lastUpdated: '2024-08-12',
    type: 'Auto Insurance',
    description: 'Vehicle collision claim for 2020 Honda Civic',
    documents: 5,
    notes: 'Claim is under review. Waiting for adjuster assessment.',
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/claims')}
          variant="outlined"
          color="primary"
        >
          Back to Claims
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* Main Claim Info */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Claim {mockClaim.id}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Chip
                label={mockClaim.status}
                color={mockClaim.status === 'In Review' ? 'warning' : 'success'}
                sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2.5, px: 1.5 }}
              />
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Claimant Name
                </Typography>
                <Typography variant="h6">{mockClaim.claimant}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Claim Type
                </Typography>
                <Typography variant="h6">{mockClaim.type}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Claim Amount
                </Typography>
                <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                  {mockClaim.amount}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Date Submitted
                </Typography>
                <Typography variant="h6">{mockClaim.dateSubmitted}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Email
                </Typography>
                <Typography variant="body1">{mockClaim.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Phone
                </Typography>
                <Typography variant="body1">{mockClaim.phone}</Typography>
              </Grid>
            </Grid>

            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Description
              </Typography>
              <Typography variant="body2">{mockClaim.description}</Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Notes
              </Typography>
              <Typography variant="body2">{mockClaim.notes}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button variant="contained" color="primary" startIcon={<EditIcon />} fullWidth>
                  Edit Claim
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<DescriptionIcon />}
                  fullWidth
                  onClick={() => navigate(`/claim/${mockClaim.id}/documents`)}
                >
                  View Documents ({mockClaim.documents})
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Timeline
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Submitted:</strong> {mockClaim.dateSubmitted}
              </Typography>
              <Typography variant="body2">
                <strong>Last Updated:</strong> {mockClaim.lastUpdated}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ClaimDetailsPage
