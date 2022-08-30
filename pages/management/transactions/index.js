import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageHeader from 'src/content/Management/Transactions/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container , Box , Avatar } from '@mui/material';
import Footer from 'src/components/Footer';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import RecentOrders from 'src/content/Management/Transactions/RecentOrders';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>FastX Value Pack Details</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">

      <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Short Upline Distribution Model Illustration</Typography>
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
                      width: 443,
                      height: 310
                    }}
                   
                    src="https://rabbiteggsdefi.github.io/maticguide/images/FastXLevel2R.png"
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
                    <Typography>Long Upline Distribution Model Illustration</Typography>
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
                      width: 446,
                      height: 484
                    }}
                   
                    src="https://rabbiteggsdefi.github.io/maticguide/images/FastXLevel25R.png"
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

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
