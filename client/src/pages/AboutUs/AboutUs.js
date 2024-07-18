import React from 'react';
import { Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './AboutUs.css';
import '../Intro/Intro.css'

import Section1 from './Section1/Section1';
import Section2 from './Section2/Section2';
import Section3 from './Section3/Section3';


const PageContainer = styled(Container)({ //Container for the entire page
    background: 'linear-gradient(90deg, #12100e, #2d3436, #434343)',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
});

const Section = styled(Box)({ //Container for each section of the page
    width: '100%', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  });


const theme = createTheme({
    typography: {
      fontFamily: 'Canva Sans, sans-serif', //Default font
      h1: { fontFamily: 'Archivo Black, sans-serif',},
      h2: {fontFamily: 'Canva Sans, sans-serif',},
      body1: {fontFamily: 'Canva Sans, sans-serif',},
      body2: {fontFamily: 'Poppins, sans-serif',},
    },
});

function AboutUs() {

    return (
    <ThemeProvider theme={theme}> {/*Elements wrapped will be able to use the predefined fonts*/}
    <PageContainer>
        {/*First Section: Quick intro*/}
        <Section>
            <Section1/>
        </Section>

        {/*Second Section: Benefits*/}
        <Section id="section2">
            <Section2/>
        </Section>

        {/*Third Section: Quick start*/}
        <Section id="section3">
            <Section3/>
        </Section>   
    </PageContainer>
    </ThemeProvider>
  );
}

export default AboutUs;
