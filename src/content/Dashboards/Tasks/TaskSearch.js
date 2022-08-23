import { useRef, useState } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  FormControl,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Divider,
  Rating,
  OutlinedInput,
  Chip,
  Tooltip,
  AvatarGroup,
  CardActionArea,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  useTheme,
  Alert
} from '@mui/material';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PaidIcon from '@mui/icons-material/Paid';
import GroupIcon from '@mui/icons-material/Group';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TextField from '@mui/material/TextField';
import { formatDistance, subMonths, subDays } from 'date-fns';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import Link from 'src/components/Link';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);


const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function TaskSearch() {
  const theme = useTheme();

  const handleDelete = () => {};

  const handleClick = () => {};

  const periods = [
    {
      value: 'popular',
      text: 'Most popular'
    },
    {
      value: 'recent',
      text: 'Recent tasks'
    },
    {
      value: 'updated',
      text: 'Latest updated tasks'
    },
    {
      value: 'oldest',
      text: 'Oldest tasks first'
    }
  ];

  const amtRef = useRef(null);
  const addressRef = useRef(null);
  // const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[0].text);
  const [errormsgg, setErrormsgg] = useState(null);

  const sendValue = () => {
    setErrormsgg(amtRef.current.value);
}

  return (
    <>
      {/* <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder="Search terms here..."
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small">
                Search
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl> */}
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle2">
            User Dashboard
            <Text color="black">
              {/* <b>Panel</b> */}
            </Text>
          </Typography>
        </Box>
        {/* <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle2"
            sx={{
              pr: 1
            }}
          >
            Sort by:
          </Typography>
          <Button
            size="small"
            variant="outlined"
            ref={actionRef1}
            onClick={() => setOpenMenuPeriod(true)}
            endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
          >
            {period}
          </Button>
          <Menu
            disableScrollLock
            anchorEl={actionRef1.current}
            onClose={() => setOpenMenuPeriod(false)}
            open={openPeriod}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            {periods.map((_period) => (
              <MenuItem
                key={_period.value}
                onClick={() => {
                  setPeriod(_period.text);
                  setOpenMenuPeriod(false);
                }}
              >
                {_period.text}
              </MenuItem>
            ))}
          </Menu>
        </Box> */}
      </Box>
 {/* row -1 */}
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" pl={0.3}>
                <CardTravelIcon variant="outlined" fontSize="large" color="primary"/>
              </Box>
              <Typography variant="h5" noWrap>
                Bucket Value Price
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Matic
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  10 Matic
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  $1.25843
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
            <Box display="flex" alignItems="center" pl={0.3}>
                <PaidIcon variant="outlined" fontSize="large" color="primary"/>
              </Box>
              <Typography variant="h5" noWrap>
                Withdrawn Amount
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Matic
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  18 Matic
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  $20
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
            <Box display="flex" alignItems="center" pl={0.3}>
                <GroupIcon variant="outlined" fontSize="large" color="primary"/>
              </Box>
              <Typography variant="h5" noWrap>
                Subordinates
              </Typography>
              <Typography variant="subtitle1" noWrap>
                user count
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  10
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Direct Referral Income
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>

      {/* row -2 */}

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
            <Box display="flex" alignItems="center" pl={0.3}>
                <QueryStatsIcon variant="outlined" fontSize="large" color="primary"/>
              </Box>
              <Typography variant="h5" noWrap>
                Line Income
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Matic
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  3586.22 Matic
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  $1.200
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
            <Box display="flex" alignItems="center" pl={0.3}>
                <AccountBalanceWalletIcon variant="outlined" fontSize="large" color="primary"/>
              </Box>
              <Typography variant="h5" noWrap>
                Redeem Balance
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Matic
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  586.83 Matic
                </Typography>
                {/* <Typography variant="subtitle2" noWrap>
                  Redeem
                </Typography> */}
                <Button variant="outlined" size="small" color="primary" >Redeem</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <img
                  alt="Cardano"
                  src="/static/images/placeholders/logo/cardano.png"
                />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Cardano
              </Typography>
              <Typography variant="subtitle1" noWrap>
                ADA
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  $54,985.00
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  34,985 ADA
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Add Your Bucket Value Price">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>

                <TextField
                      required
                      id="outlined-required"
                      label="Matic Amount"
                      defaultValue="10"
                      inputRef={amtRef}
                      type="number"
                    />

                <Box
                sx={{
                  pt: 1.5
                }}
              ></Box>

                    <TextField
                      required
                      id="outlined-required"
                      label="Sponsor Address"
                      defaultValue="0x"
                      inputRef={addressRef}
                      inputProps={{ maxLength: 25 }}
                    />


                <Box
                sx={{
                  pt: 2
                }}
              >

                <Button variant="outlined" size="small" color="primary" onClick={sendValue} >Lock</Button> {' '}
                <Button variant="contained" size="small" color="primary" disabled>Add Price</Button>
                </Box>
                {errormsgg && (<Button  size="small"  variant="outlined" color="error" >{errormsgg}</Button>)}
                {/* <Button variant="outlined" color="error" >Error Msg</Button> */}
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>

        
      </Grid>


      {/* <Box
        sx={{
          pt: 4
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
          showFirstButton
          showLastButton
          count={15}
          defaultPage={6}
          siblingCount={0}
          size="large"
          shape="rounded"
          color="primary"
        />
      </Box> */}
    </>
  );
}

export default TaskSearch;
