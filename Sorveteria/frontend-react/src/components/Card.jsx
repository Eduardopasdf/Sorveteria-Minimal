import React from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

export default function Card({ image, title, description, price, children }) {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      {image ? (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{ width: 345, height: 140, objectFit: 'cover' }}
        />
      ) : (
        <div style={{ width: 345, height: 140, backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Sem Imagem
        </div>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
          {description}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ marginTop: 1 }}>
          R$ {price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        {children}
      </CardActions>
    </MuiCard>
  );
}
