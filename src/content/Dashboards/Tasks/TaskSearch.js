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
  useTheme
} from '@mui/material';
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

  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[0].text);

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
            Add Bucket Value Panel
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
              <AvatarWrapper>
                <img
                  alt="BTC"
                  src="/static/images/placeholders/logo/bitcoin.png"
                />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Bucket Value
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
              <AvatarWrapper>
                <img
                  alt="Ripple"
                  src="/static/images/placeholders/logo/ripple.png"
                />
              </AvatarWrapper>
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
              <AvatarWrapper>
                <img
                  alt="Cardano"
                  src="/static/images/placeholders/logo/cardano.png"
                />
              </AvatarWrapper>
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
        {/* <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Click to add a new wallet">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid> */}
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
              <AvatarWrapper>
                <img
                  alt="BTC"
                  src="/static/images/placeholders/logo/bitcoin.png"
                />
              </AvatarWrapper>
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
              <AvatarWrapper>
                <img
                  alt="Ripple"
                  src="/static/images/placeholders/logo/ripple.png"
                />
              </AvatarWrapper>
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
                <Typography variant="subtitle2" noWrap>
                  Redeem
                </Typography>
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
          <Tooltip arrow title="Click to add 10 MATIC">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
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
