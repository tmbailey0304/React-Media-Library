import { useState, useEffect } from 'react'
import './App.css'

import { TextField, Container, Grid, Card, CardMedia, CardContent, Typography, Pagination, Link } from '@mui/material';

function App() {
  const [searchTerm, setSearchTerm] = useState('Coding');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.pexels.com/v1/search?query=${searchTerm || 'Coding'}&page=${page}&orientation=portrait`, {
      method: "GET",
      headers: {
        "Authorization": import.meta.env.VITE_REACT_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTotalResults(data.total_results)
        setImages(data.photos)
      })
      .catch((error) => console.log(error));
  }, [searchTerm, page]);

  return (
    <>
      <Container>
        <Typography variant='h5' sx={{paddingBottom:'20px'}}>A simple media gallery with paginiation and search capability using React.js, MaterialUI and Pexels API</Typography>
        <TextField id="outlined-basic" label="Search For An Image" variant="outlined" onChange={(e) => setSearchTerm(e.target.value)} />
        <Grid container spacing={2} sx={{paddingTop:'20px'}}>
          {images.length === 0 ? (<Typography>{loading ? 'Loading...' : 'No Images Found'}</Typography>) : images.map((image) => {
            return(
              <Grid item key={image.id} xs={12} md={4}>
              <Card>
                <CardMedia component="img" image={image.src.medium} alt={image.alt} sx={{objectFit: 'cover', height: '600px'}}></CardMedia>
                <CardContent>
                  <Typography>Shot By: {image.photographer}</Typography>
                  <Link href={image.url} target="_blank">View Source</Link>
                </CardContent>
              </Card>
            </Grid>
            )
          })}
        </Grid>
        <Pagination count={Math.floor(totalResults / 15)} color="primary" sx={{justifyContent:'center', display:'flex', paddingTop:'20px'}} onChange={(e,value) => setPage(value)}/>
      </Container>
    </>
  )
}

export default App