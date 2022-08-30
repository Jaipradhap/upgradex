import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';
import PageHeader from 'src/content/Dashboards/Tasks/PageHeader';
import Footer from 'src/components/Footer';
import {
  Grid,
  Avatar,
  Box,
  Container,
  Card,
  useTheme,
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import IncomeCalc from 'src/content/Dashboards/Tasks/IncomeCalc';



function DashboardTasks() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>
      <PageTitleWrapper>
         <PageHeader /> 
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
              <Grid item xs={12}>
                <Box p={4}>
                  <IncomeCalc />
                </Box>
              </Grid>
          </Grid>
        </Card>

        <Box
                          sx={{
                            pt: 2
                          }}
                        ></Box>

        <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Short Upline Distribution Illustration</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      
                      
                    </Typography>


                    <Box
                          sx={{
                            pt: 1
                          }}
                        ></Box>

                    <Avatar
                    variant={"rounded"}
                    sx={{
                      width: 885,
                      height: 619
                    }}
                   
                    src="https://rabbiteggsdefi.github.io/maticguide/images/FastXLevel2.png"
                  />
                    {/* <CardMedia
                     sx={{ minHeight: 580 }}
                      image=""
                      title="Card Cover"
                    /> */}
                  </AccordionDetails>
       </Accordion>

       <Box
                          sx={{
                            pt: 4
                          }}
                        ></Box>
       <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Long Upline Distribution Illustration</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      
                      
                    </Typography>


                    <Box
                          sx={{
                            pt: 1
                          }}
                        ></Box>

                    <Avatar
                    variant={"rounded"}
                    sx={{
                      width: 892,
                      height: 967
                    }}
                   
                    src="https://rabbiteggsdefi.github.io/maticguide/images/FastXLevel25.png"
                  />
                    {/* <CardMedia
                     sx={{ minHeight: 580 }}
                      image=""
                      title="Card Cover"
                    /> */}
                  </AccordionDetails>
       </Accordion>


      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
