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
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PaidIcon from '@mui/icons-material/Paid';
import GroupIcon from '@mui/icons-material/Group';
import CircularProgress from '@mui/material/CircularProgress';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Text from 'src/components/Text';
import Web3 from "web3";

import SimpleStorageContract from "config/BasicContractFXMflat.json";
import { CONTADDRESS,TXNURL } from 'config/configct';

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

function TaskSearch(props) {
  const theme = useTheme();
  const { isConnected, accounts, web3, errormsgw , onConnect, onDisconnect, refid } = props;
  const ContractAddress = CONTADDRESS;
  const handleDelete = () => {};

  

  const AddressChk = (address) => {
     return Web3.utils.isAddress(address);
    }

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
  const [errormsgg, setErrormsgg] = useState(null);
  const [warnmsgg, setWarnmsgg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingw, setLoadingw] = useState(false);
  // DashBoard
  const [newUser, setNewUser] = useState(false);
  const [pkgvalue, setPkgvalue] = useState(0);
  const [withdrawnbal, setWithdrawnbal] = useState(null); // wei to ether
  const [subordinates, setSubordinates] = useState(0);
  const [levelnumber, setLevelnumber] = useState(0);
  const [balance, setBalance] = useState(null); // wei to ether
  const [xbalance, setXbalance] = useState(null); // wei to ether
  const [refbouns, setRefbouns] = useState(null); // wei to ether
  const [parent, setParent] = useState(' ');
  
  const [sponaddress, setSponaddress] = useState(' ');
  const [rate, setRate] = useState(4);
  

  const onConnectChild = async () => { 
    try {
    setLoadingw(true); 
    await props.onConnect(); 
    setLoadingw(false);
    if (refid != undefined && refid.length > 0) {   setSponaddress(refid); }
    }
    catch(err){
      setLoadingw(false);
    }
  };

  const sendValue = async () => {
    try {
    setLoading(true);
    let errflag =0;
    let amt = parseInt(amtRef.current.value); 
    let ads = addressRef.current.value;  // isAddress > accounts != ads > check childs > 20
    
    const isaddress = AddressChk(ads);
 
    if (!(amt >= 10 && amt <= 500)) {
      errflag =1;
      setErrormsgg("Each Buy,Min Price: 10 & Max Price: 500");
    }
    else if (!isaddress){
      errflag =1;
      setErrormsgg("Please enter valid sponsor address");
    }
    else if (!(ads != accounts)){
      errflag =1;
      setErrormsgg("Please verify sponsor address!Looks same.");
    }

    // Check Sponsor in the tree system
/*
    if(accounts) {
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        ContractAddress
      );

      if(!instance) {
        setErrormsgg("Network Busy! Please try after sometime");
      }
      else {
  
      await instance.methods.getUrSubOrdinates(ads).call(
        function (err, res) {
          if (err) {
          }else {
          console.log(res);
            if (res >=1) {
              setWarnmsgg("Sponsor has 20 downline users already.Please check Sponsor Finder");
            }
          
          }
        }
      );

      // next
      
      }
      }
      */
    if (errflag > 0) { setLoading(false); return; }
 
    
    // console.log(AddressChk(ads));
    
    await callBuy(ads,amt);

    // window.setTimeout(() => {
      // setSuccess(true);
      // setLoading(false);
    // }, 2000);

    setLoading(false);

  } catch (error) {
    setLoading(false);
    console.log(error);
    // notify("info","Please try again! To know the steps ", GUIDE);

  }
}

// buy 
// web 3 calls 
// 1.GetUserDetails
// 2.GetSponsorDetails
// 3.GetChildDetails
// 4.callBuy
// 5.callwithdraw

// 1.GetUserDetails

const getUserDetails = async () => {
  try {
    // console.log('In getUserDetails');
    if(accounts) {
      console.log(accounts);
    // let totalamt = buyprice.toString();

    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
      }
      else {

        let isNewUser = await instance.methods.checkUser(accounts).call();
        console.log(isNewUser);
        setNewUser(!isNewUser);

        if (!isNewUser) { return; }

        await instance.methods.getDashBoard(accounts).call(
          function (err, res) {
            if (err) {
            }else {
            // console.log(res);
            // let {pkgvalue, withdrawnbal,subordinates,levelnumber,balance,refbouns,parent}  = res;
             // setWarnmsgg("Sponsor has 20 downline users already.Please check Sponsor Finder");
             setPkgvalue(res[0]);
             let val = res[0];
              if (val >=10 && val <=50) { setRate(1); }
              else if (val >=51 && val <=100) { setRate(2); }
              else if (val >=101 && val <=200) { setRate(3); }
              else if (val >=201 && val <=400) { setRate(4); }
              else if (val >=401 ) { setRate(5); }
              else { setRate(1); }
            
             setWithdrawnbal(Number.parseFloat(Web3.utils.fromWei(res[1],'ether')).toFixed(1)); // Web3.utils.fromWei(res[1],'ether')
             
             setSubordinates(res[2]);
             setLevelnumber(res[3]);
             
             setXbalance(Web3.utils.fromWei(res[4],'ether'));
             setBalance(Number.parseFloat(Web3.utils.fromWei(res[4],'ether')).toFixed(1));
             setRefbouns(Number.parseFloat(Web3.utils.fromWei(res[5],'ether')).toFixed(1));
             
             setParent(res[6]);
            }
          }
        );
      }

      } else
      {
      }
  } catch (error) {
    console.log(error);
    // notify("info","Please try again! To know the steps ", GUIDE);

  }
}; 


// 4.callBuy

const callBuy = async (sponaddress,buyprice) => {
  try {

    if(accounts) {

      // let qty = itemsQty;
      // console.log('qty');
      // console.log(qty);
    let totalamt = buyprice.toString();


    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
        // notify("info","Please try again! To know about tips and tricks ", TIPS);
      }
      else {
    await instance.methods.BuyCart(sponaddress).send({ from: accounts , value: Web3.utils.toWei(totalamt, 'ether')}, 
    function(error, transactionHash){
      if (error) {
        console.log(error);
        // notify("info","Please try again! To know the steps ", GUIDE);
      } else {
        console.log(transactionHash);
        // notify("success", "Please find the receipt  " , TXNURL + transactionHash);
        // notify("info","Minting is the fuel,Please encourage others", TIPS);
      
      }
  });
}
} else
{
  
}
  } catch (error) {
    console.log(error);
    // notify("info","Please try again! To know the steps ", GUIDE);

  }
}; 

// 5.callwithdraw

const callwithdraw = async () => {
  try {
    if(accounts) {
      setLoading(true);
    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
      }
      else {

        await instance.methods.WithdrawToken().send({ from: accounts }, 
          function(error, transactionHash){
            if (error) {
              
            } else {
              setLoading(false);
              // notify("success", "Please find redeem receipt  " , TXNURL + transactionHash);
              console.log(transactionHash);
            }
        });      }

      }
      setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);

  }
}; 

// buy

  return (
    <>
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

        <Box mt={{ xs: 2, md: 0 }}>
      
        {isConnected && (<Button variant="outlined" color="primary" onClick={getUserDetails}>Refresh Board</Button>)} {' '}

      {errormsgw && (<Button variant="outlined" color="error" >{errormsgw}</Button>)} {' '}
        
      {loadingw && ( 
                <CircularProgress color="primary" size={25} />
              )}

        {!isConnected && (
        <Button variant="contained" startIcon={<AccountBalanceWalletOutlinedIcon />}
          onClick={onConnectChild}
          disabled={loadingw}
          >
          Connect Wallet
        </Button> )}

        {isConnected && (
        <Button variant="outlined" 
          onClick={onDisconnect}
          >
          {accounts.substr(0, 5)}...{accounts.substr(accounts.length - 4, accounts.length - 1)}
        </Button> )}

      </Box>
       

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
                Value Pack 
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
                  {pkgvalue} Matic
                </Typography>
                <Box>
                    <Rating value={rate} defaultValue={5} precision={1} size="small" readOnly />
                </Box>
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
                  {withdrawnbal} Matic
                </Typography>
                <Typography variant="subtitle2" noWrap>
                {withdrawnbal} as of now
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
                Downline
              </Typography>
              <Typography variant="subtitle1" noWrap>
                users count {subordinates}
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  {refbouns} Matic
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Referral Bouns Income
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
                <PersonOutlineIcon variant="outlined" fontSize="large" color="primary"/>
              </Box>
              <Typography variant="h5" noWrap>
                Sponsor Address
              </Typography>
              <Typography variant="subtitle1" noWrap>
              {parent.substr(0, 5)}...{parent.substr(parent.length - 4, parent.length - 1)}
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  {levelnumber}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Level Number
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
                Total Users
              </Typography>
              <Typography variant="subtitle1" noWrap>
                25000023
              </Typography>

              <Box
                sx={{
                  pt: 6
                }}
              >


                </Box>

                <Box
                sx={{
                  pt: 1
                }}
              >

            <Typography variant="h5" noWrap>
                Total Withdraw Amount
              </Typography>
              <Typography variant="subtitle1" noWrap>
                200000000
              </Typography>

                </Box>

              <Box
                sx={{
                  pt: 1
                }}
              >
                <Typography variant="h5" gutterBottom noWrap>
                Referral Link
                </Typography>

                <Chip
                sx={{
                  mr: 0.5
                }}
                variant="outlined"
                size="small"
                label="Copy Ref Link"
                color="primary"
                onClick={handleDelete}
                onDelete={handleDelete}
              />
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
                Total Line Income
              </Typography>
              <Typography variant="subtitle1" noWrap>
                20% re-invested
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  {balance} Matic
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  exact {xbalance} 
                </Typography>

                <Box  
                sx={{
                  pt: 4
                  
                }}
              > 
              </Box>

              {isConnected && (
                <Tooltip arrow title="Auto re-invest 20% on withdraw"><span>
                <Button variant="outlined" size="small" color="primary" onClick={callwithdraw} 
                disabled={loading}
                >Withdraw</Button> </span></Tooltip> 
              )}

              {isConnected && loading && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet to enable"><span>
                <Button variant="outlined" size="small" color="primary" disabled>Withdraw</Button> 
                </span></Tooltip>              )}


              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3} item>
          {/* <Tooltip arrow title="Buy Value Pack "> */}
            <CardAddAction>
              {/* <CardActionArea
                sx={{
                  px: 1
                }}
              > */}
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
                      value={sponaddress}
                      inputRef={addressRef}
                      inputProps={{ maxLength: 80 }}
                      onChange={(e) => setSponaddress(e.target.value)}
                    />

              {/* <Typography variant="subtitle2" noWrap>
                  check sponsor health and buy
                </Typography> */}

            {/* <Typography
              sx={{
                pb: 1
              }}
              color="text.secondary"
              size="small" 
            >
              If Sponsor has 20 downline users,then you miss downline income.
            </Typography> */}


                {/* <Box  
                sx={{
                  pt: 1
                  
                }}
              > 
                     
              </Box> */}
                <Box
                sx={{
                  pt: 2
                }}
              >

              {isConnected && (
                <Tooltip arrow title="Check Sponsor downline before buy"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} 
                disabled={loading}
                >Buy Pack</Button> </span></Tooltip> 
              )}

              {isConnected && loading && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet to enable"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} disabled>Buy Pack</Button> 
                </span></Tooltip>              )}
                {/* <Button variant="contained" size="small" color="primary" disabled>Buy Pack</Button> */}
                </Box>
                {errormsgg && (<Button  size="small"  variant="outlined" color="error" onClick={() => setErrormsgg(null)} >{errormsgg}</Button>)}
                {warnmsgg && (<Button  size="small"  variant="outlined" color="warning" onClick={() => setWarnmsgg(null)} >{warnmsgg}</Button>)}
                
                </CardContent>
              {/* </CardActionArea> */}
            </CardAddAction>
          {/* </Tooltip> */}
        </Grid>

        {/* Sponsor Health  */}

        <Grid xs={12} sm={6} md={3} item>
          {/* <Tooltip arrow title="Buy Value Pack "> */}
            <CardAddAction>
              {/* <CardActionArea
                sx={{
                  px: 1
                }}
              > */}
                <CardContent>

                <Box  
                sx={{
                  pt: 1
                  
                }}
              > 
              <Typography variant="h5" noWrap>
                Sponsor Status
              </Typography>
              <Typography variant="subtitle1" noWrap>
              {sponaddress.substr(0, 5)}...{sponaddress.substr(sponaddress.length - 4, sponaddress.length - 1)}
              </Typography>
              </Box>

              <Box
                sx={{
                  pt: 2
                }}
              >
                </Box>

              <Typography variant="h5" noWrap>
                Level
              </Typography>
              <Typography variant="subtitle1" noWrap>
                2
              </Typography>

                <Box
                sx={{
                  pt: 2
                }}
              >
                </Box>


              <Typography variant="h5" noWrap>
                Downline Users
              </Typography>
              <Typography variant="subtitle1" noWrap>
                12
              </Typography>

              <Box  
                sx={{
                  pt: 1
                  
                }}
              > 
                      
              </Box>

              <Box
                sx={{
                  pt: 2
                }}
              >

              {isConnected && (
                <Tooltip arrow title="Check Sponsor Level before buy"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} 
                disabled={loading}
                >Check Health</Button> </span></Tooltip> 
              )}

              {isConnected && loading && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet to enable"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} disabled>Check Health</Button> 
                </span></Tooltip>              )}
                </Box>
              
                {/* {errormsgg && (<Button  size="small"  variant="outlined" color="error" onClick={() => setErrormsgg(null)} >{errormsgg}</Button>)} */}
                {/* {warnmsgg && (<Button  size="small"  variant="outlined" color="warning" onClick={() => setWarnmsgg(null)} >{warnmsgg}</Button>)} */}
                
                </CardContent>
              {/* </CardActionArea> */}
            </CardAddAction>
          {/* </Tooltip> */}
        </Grid>

        
      </Grid>

      <Box
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>

      <Divider />
      <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Please read the tips before buying the value pack</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                      {/* {refad} */}
                    </Typography>
                  </AccordionDetails>
                </Accordion>



    </>
  );
}

export default TaskSearch;
