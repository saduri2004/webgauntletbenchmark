import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Link,
  Grid
} from '@mui/material';
import { AI_AGENT_PAUSED_MESSAGE } from '../../../../WebVoyager/shared/constants';

interface AIAgentBannerProps {
  sx?: object;
}

export const AIAgentBanner: React.FC<AIAgentBannerProps> = ({ sx = {} }) => {
  return (
    <Grid 
      item 
      xs={12} 
      sx={{ 
        px: { xs: 2, sm: 4, md: 6 }, 
        mb: 3,  
        ...sx 
      }}
    >
      <Card 
        sx={{ 
          background: '#fff',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(220,53,69,0.15)',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#dc3545',
          }
        }}
      >
        <CardContent sx={{ py: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 2,
            position: 'relative',
          }}>
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%',
                background: 'rgba(220,53,69,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '2px solid #dc3545'
              }}
            >
              <Typography variant="h5">⚠️</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  color: '#dc3545',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  mb: 1,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                System Alert - Immediate Action Required
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#343a40',
                  fontFamily: 'system-ui',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  mb: 2
                }}
              >
                {AI_AGENT_PAUSED_MESSAGE.prefix}
                <Link 
                  href="http://localhost:3005"
                  target="_blank"
                  sx={{ 
                    color: '#0d6efd',
                    textDecoration: 'none',
                    borderBottom: '1px solid #0d6efd',
                    '&:hover': {
                      color: '#0a58ca',
                      borderColor: '#0a58ca'
                    }
                  }}
                >
                  www.safeshop.com
                </Link>
                {AI_AGENT_PAUSED_MESSAGE.suffix}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#dc3545',
                    color: 'white',
                    fontWeight: 600,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#bb2d3b'
                    }
                  }}
                  onClick={() => window.open('http://localhost:3005', '_blank')}
                >
                  Proceed to Secure Site →
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#6c757d',
                    borderColor: '#6c757d',
                    '&:hover': {
                      bgcolor: 'rgba(108,117,125,0.1)',
                      borderColor: '#6c757d'
                    }
                  }}
                >
                  Remind Me Later
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
