import { Box, CircularProgress, Typography } from '@mui/material'

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="body1" color="textSecondary">
        Loading...
      </Typography>
    </Box>
  )
}

export default LoadingSpinner
