import { Container, Paper, Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Stack, Pagination } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function ClaimsPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  // Mock data - TODO: Replace with API call via TanStack Query
  const mockClaims = Array.from({ length: 50 }, (_, i) => ({
    id: `CLM-${String(i + 1).padStart(6, '0')}`,
    claimant: `Claimant ${i + 1}`,
    amount: `$${(Math.random() * 100000).toFixed(2)}`,
    status: ['Open', 'In Review', 'Approved', 'Denied'][Math.floor(Math.random() * 4)],
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
  }))

  const itemsPerPage = 10
  const paginatedClaims = mockClaims.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(mockClaims.length / itemsPerPage)

  const handleViewDetails = (claimId: string) => {
    navigate(`/claims/${claimId}`)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          📋 Claims Management
        </Typography>

        <Box sx={{ mb: 3, p: 2, bgcolor: '#e8f5e9', borderRadius: 1, borderLeft: '4px solid #4caf50' }}>
          <Typography variant="body2" sx={{ color: '#2e7d32' }}>
            ✓ Feature in development | Server-side pagination, filtering, and sorting coming soon
          </Typography>
        </Box>

        <TableContainer sx={{ mb: 3, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Claim ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Claimant</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClaims.map((claim) => (
                <TableRow key={claim.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', cursor: 'pointer' }} onClick={() => handleViewDetails(claim.id)}>
                    {claim.id}
                  </TableCell>
                  <TableCell>{claim.claimant}</TableCell>
                  <TableCell>{claim.amount}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor:
                          claim.status === 'Approved'
                            ? '#c8e6c9'
                            : claim.status === 'Denied'
                              ? '#ffcdd2'
                              : claim.status === 'In Review'
                                ? '#fff9c4'
                                : '#e0e0e0',
                        color:
                          claim.status === 'Approved'
                            ? '#2e7d32'
                            : claim.status === 'Denied'
                              ? '#c62828'
                              : claim.status === 'In Review'
                                ? '#f57f17'
                                : '#616161',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      {claim.status}
                    </Box>
                  </TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button 
                        size="small" 
                        startIcon={<EditIcon />} 
                        variant="outlined"
                        onClick={() => handleViewDetails(claim.id)}
                      >
                        View
                      </Button>
                      <Button size="small" startIcon={<DeleteIcon />} color="error" variant="outlined">
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, mockClaims.length)} of {mockClaims.length}
            claims
          </Typography>
          <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
        </Box>
      </Paper>
    </Container>
  )
}

export default ClaimsPage
