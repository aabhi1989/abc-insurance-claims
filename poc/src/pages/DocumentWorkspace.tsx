import { Container, Paper, Typography, Box, Grid, Button, List, ListItem, ListItemIcon, ListItemText, LinearProgress, Stack, Chip } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DescriptionIcon from '@mui/icons-material/Description'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'

function DocumentWorkspacePage() {
  const { claimId } = useParams<{ claimId: string }>()
  const navigate = useNavigate()

  // Mock documents - TODO: Replace with API call via TanStack Query
  const mockDocuments = [
    {
      id: 1,
      name: 'Claim Form.pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'processed',
      pages: 5,
    },
    {
      id: 2,
      name: 'Police Report.pdf',
      size: '1.8 MB',
      uploadDate: '2024-01-15',
      status: 'processed',
      pages: 3,
    },
    {
      id: 3,
      name: 'Vehicle Photos.pdf',
      size: '45.2 MB',
      uploadDate: '2024-01-16',
      status: 'processing',
      pages: 12,
    },
    {
      id: 4,
      name: 'Insurance Policy.pdf',
      size: '890 KB',
      uploadDate: '2024-01-16',
      status: 'processed',
      pages: 2,
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {claimId && (
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/claims/${claimId}`)}
            variant="outlined"
            color="primary"
          >
            Back to Claim
          </Button>
        </Stack>
      )}

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          📄 Document Workspace
        </Typography>
        {claimId && (
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 3 }}>
            Claim {claimId}
          </Typography>
        )}

        <Box sx={{ mb: 4, p: 2, bgcolor: '#e3f2fd', borderRadius: 1, borderLeft: '4px solid #1976d2' }}>
          <Typography variant="body2" sx={{ color: '#1565c0' }}>
            ✓ Progressive loading | Handles 150MB-1GB documents with lazy-loading strategy
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Upload Area */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                border: '2px dashed #1976d2',
                borderRadius: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: '#f0f4ff',
                  borderColor: '#1565c0',
                },
              }}
            >
              <UploadFileIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Upload Document
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Drag & drop or click to upload files
              </Typography>
            </Paper>
          </Grid>

          {/* Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {mockDocuments.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Documents
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    {mockDocuments.filter((d) => d.status === 'processed').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Processed
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                    {mockDocuments.filter((d) => d.status === 'processing').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Processing
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                    {mockDocuments.reduce((sum, d) => sum + d.pages, 0)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Pages
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Documents List */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
          Documents
        </Typography>
        <List sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}>
          {mockDocuments.map((doc) => (
            <ListItem
              key={doc.id}
              sx={{
                mb: 1,
                bgcolor: '#ffffff',
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                '&:hover': { bgcolor: '#fafafa' },
              }}
            >
              <ListItemIcon>
                <DescriptionIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>{doc.name}</Typography>
                    <Chip
                      label={doc.status}
                      size="small"
                      color={doc.status === 'processed' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={`${doc.size} • ${doc.pages} pages • Uploaded ${doc.uploadDate}`}
              />
              <Stack direction="row" spacing={1}>
                <Button size="small" startIcon={<DownloadIcon />} variant="outlined">
                  Download
                </Button>
                <Button size="small" startIcon={<DeleteIcon />} color="error" variant="outlined">
                  Delete
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>

        {mockDocuments.some((d) => d.status === 'processing') && (
          <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Processing Status
            </Typography>
            <LinearProgress
              variant="determinate"
              value={65}
              sx={{ mb: 1, height: 6, borderRadius: 3 }}
            />
            <Typography variant="body2" color="textSecondary">
              Processing documents... 65% complete
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default DocumentWorkspacePage
