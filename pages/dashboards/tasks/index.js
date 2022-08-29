import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';
import PageHeader from 'src/content/Dashboards/Tasks/PageHeader';
import Footer from 'src/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';


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
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
