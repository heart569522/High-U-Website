import * as React from 'react';
import { Typography, Grid, Card, CardMedia, CardActionArea, CardContent, Button, ButtonProps } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme();

const CustomButtom = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#FFCF76'),
  backgroundColor: '#FFCF76',
  '&:hover': {
    backgroundColor: '#f7c25e',
  },
  fontFamily: 'Prompt, sans-serif',
  fontWeight: 'bold',
  fontSize: 22,
  fontColor: '#303030',
}));

export default function HomeContent() {

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="space-around" alignItems="center" sx={{ bgcolor: '#303030', height: '50vh', margin: 0 }}>
        <Grid item sm={12} md={4.7} sx={{ margin: 2, }}>
          <Card sx={{ maxWidth: 600, float: 'right', }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://t4.ftcdn.net/jpg/04/27/41/05/360_F_427410504_H6zGuHXoNdaH7Ghwpou1dXgbODusZeAg.jpg"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item sm={12} md={6.7} sx={{ margin: 2, }}>
          <Typography
            variant="h4"
            color="white"
            textAlign="center"
            sx={{
              fontWeight: 'none',
              fontFamily: 'Prompt, sans-serif',
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row-reverse" justifyContent="space-around" alignItems="center" sx={{ bgcolor: '#787878', height: '50vh', margin: 0 }}>
        <Grid item sm={12} md={4.7} sx={{ margin: 2, }}>
          <Card sx={{ maxWidth: 600, float: 'left', }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://t4.ftcdn.net/jpg/04/27/41/49/360_F_427414979_2GhGAcGPFFUwfANjcpurjis6lVrU45Bx.jpg"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item sm={12} md={6.7} sx={{ margin: 2, }}>
          <Typography
            variant="h4"
            color="white"
            textAlign="center"
            sx={{
              fontWeight: 'none',
              fontFamily: 'Prompt, sans-serif',
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          </Typography>
        </Grid>
      </Grid>

      {/* CARD 3 IMAGE */}
      <Grid container className='colorBackgroundContentGold' justifyContent="center" alignItems="center" sx={{ height: '80vh', margin: 0 }}>
        <Grid item sm={12} md={3} sx={{ margin: 2, marginBottom: 0 }}>
          <Card sx={{ maxWidth: 400, }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://cdn.shopify.com/s/files/1/1410/9094/products/rwupstage_01_lg_1_600x600.jpg?v=1668795994"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bob
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item sm={12} md={3} sx={{ margin: 2, marginBottom: 0 }}>
          <Card sx={{ maxWidth: 400, }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://cdn.shopify.com/s/files/1/1410/9094/products/resized__0001_ew_perucci2020_Tab_6_600x600.jpg?v=1648244990"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bob
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ margin: 2, marginBottom: 0 }}>
          <Card sx={{ maxWidth: 400, }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://cdn.shopify.com/s/files/1/1410/9094/products/0004_Always_-_2_600x600.jpg?v=1619614043"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bob
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item sm={12} md={12} sx={{ margin: 0, textAlign: 'center', }}>
          <CustomButtom
            href="#"
            variant="contained"
            size="large"
          >
            เพิ่มเติม...
          </CustomButtom>
        </Grid>
      </Grid>

    </ThemeProvider>
  )
}