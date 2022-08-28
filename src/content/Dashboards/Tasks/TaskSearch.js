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
import { CONTADDRESS,TXNURL,TOKENADDRESS,REFURL } from 'config/configct';

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
   
  const AddressChk = (address) => {
     return Web3.utils.isAddress(address);
    }

  const amtRef = useRef(null);
  const addressRef = useRef(null);
  const [errormsgg, setErrormsgg] = useState(null);
  const [warnmsgg, setWarnmsgg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingw, setLoadingw] = useState(false);
  const [loadingr, setLoadingr] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [trnrecepitb, setTrnrecepitb] = useState(null);
  const [trnrecepitw, setTrnrecepitw] = useState(null);
  // DashBoard
  const [newUser, setNewUser] = useState(false);
  const [pkgvalue, setPkgvalue] = useState(0);
  const [withdrawnbal, setWithdrawnbal] = useState(null); // wei to ether
  const [subordinates, setSubordinates] = useState(0);
  const [levelnumber, setLevelnumber] = useState(0);
  const [balance, setBalance] = useState(null); // wei to ether
  // const [xbalance, setXbalance] = useState(null); // wei to ether
  const [refbouns, setRefbouns] = useState(null); // wei to ether
  const [parent, setParent] = useState(' ');
  
  const [sponaddress, setSponaddress] = useState(' ');
  const [rate, setRate] = useState(4);
  const [copyTokens, setCopyTokens] = useState('Copy Token');
  const [copyRef, setCopyRef] = useState('Copy Ref Link');
 
  
  const [totalUsers, setTotalUsers] = useState(10);
  const [totalWithdraws, setTotalWithdraws] = useState(null);

  const [subordinatesp, setSubordinatesp] = useState(0);
  const [levelnumberp, setLevelnumberp] = useState(0);
 

  const copyRefLink = async () => {
    if(isConnected) {
    navigator.clipboard.writeText(REFURL.concat(accounts));
    setCopyRef('Copied!');
    }
   }


  const copyToken = async () => {
    navigator.clipboard.writeText(TOKENADDRESS);
    setCopyTokens('Copied!');
   }

  const openScan = async (val) => {
    window.open(TXNURL + val, '_blank').focus();
   }

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
    ads = ads.trim();
    
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
    if(accounts) {
      setLoadingr(true);

    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
      }
      else {

                // getTotals

        await instance.methods.getTotalVP().call(
          function (err, res) {
            if (err) {
              setLoadingr(false);
            } else {
              setTotalUsers(res[0]);
              setTotalWithdraws(Web3.utils.fromWei(res[1],'ether'));
            }
          }
        );

        let isNewUser = await instance.methods.checkUser(accounts).call();
        console.log(isNewUser);
        setNewUser(!isNewUser);

        if (!isNewUser) { setLoadingr(false); return; }

        await instance.methods.getDashBoard(accounts).call(
          function (err, res) {
            if (err) {
              setLoadingr(false);
            }else {
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
             
            //  setXbalance(Web3.utils.fromWei(res[4],'ether'));
             setBalance(Number.parseFloat(Web3.utils.fromWei(res[4],'ether')).toFixed(1));
             setRefbouns(Number.parseFloat(Web3.utils.fromWei(res[5],'ether')).toFixed(1));
             
             setParent(res[6]);
             setSponaddress(res[6]);
             setLoadingr(false);
            }
          }
        );
      }

      } else
      {   }

     setLoadingr(false);
  } catch (error) {
    console.log(error);
    setLoadingr(false);
  }
}; 

// 2.GetSponsorDetails

// 3.GetTotals


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
      }
      else {
    await instance.methods.BuyPack(sponaddress).send({ from: accounts , value: Web3.utils.toWei(totalamt, 'ether')}, 
    function(error, transactionHash){
      if (error) {
        // console.log(error);
        // notify("info","Please try again! To know the steps ", GUIDE);
      } else {
        setTrnrecepitb(transactionHash);
        // notify("success", "Please find the receipt  " , TXNURL + transactionHash);
        // notify("info","Minting is the fuel,Please encourage others", TIPS);
      
      }
  });
}
} else
{
  
}
  } catch (error) {
    setErrormsgg("Please try again later!");
    // notify("info","Please try again! To know the steps ", GUIDE);

  }
}; 

// 5.callwithdraw

const callwithdraw = async () => {
  try {
    if(accounts) {
      setLoadingd(true);
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
              setLoadingd(false);
            } else {
              setLoadingd(false);
              // notify("success", "Please find redeem receipt  " , TXNURL + transactionHash);
              setTrnrecepitw(transactionHash);
            }
        });      }

      }
      setLoadingd(false);
  } catch (error) {
    setLoading(false);

  }
}; 

// Admin

const callAdmin = async () => {
  try {
    const isaddress = AddressChk(sponaddress.trim());
    if(accounts && isaddress) {
      setLoadings(true);
    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
      }
      else {
        await instance.methods.getDashBoard(sponaddress.trim()).call(
          function (err, res) {
            if (err) {
              setLoadings(false);
            } else {
              setSubordinatesp(res[2]);
              setLevelnumberp(res[3]);
              setLoadings(false);
            }
          }
        );
      }
      }
      setLoadings(false);
  } catch (error) {
    setLoadings(false);

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
      
        {isConnected && (<Button variant="outlined" color="primary" onClick={getUserDetails} disabled={loadingr}>Refresh Board</Button>)} {' '}

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
              <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">
                <CardTravelIcon variant="outlined" fontSize="large" color="primary"/>
                {isConnected && loadingr && (  <CircularProgress color="primary" size={20} />   )}
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
            <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">
                <PaidIcon variant="outlined" fontSize="large" color="primary"/>
                {isConnected && loadingr && (  <CircularProgress color="primary" size={20} />   )}
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
            <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">
                <GroupIcon variant="outlined" fontSize="large" color="primary"/>
                {isConnected && loadingr && (  <CircularProgress color="primary" size={20} />   )}
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
            <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">
                <PersonOutlineIcon variant="outlined" fontSize="large" color="primary"/>
                {isConnected && loadingr && (  <CircularProgress color="primary" size={20} />   )}
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
                  Level (upline users)
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
            <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">
                <QueryStatsIcon variant="outlined" fontSize="large" color="primary"/>
                {isConnected && loadingr && (  <CircularProgress color="primary" size={20} />   )}
              </Box>
              <Typography variant="h5" noWrap>
                Total Users
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {totalUsers}
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
                Total Withdrawals 
              </Typography>
              {totalWithdraws == null && (

                <Typography variant="subtitle1" noWrap>
                 0
                </Typography>
              )}

              {totalWithdraws != null && (

              <Typography variant="subtitle1" noWrap>
              {totalWithdraws}
              </Typography>
              )}
   

                </Box>

              <Box
                sx={{
                  pt: 2
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
                label={copyRef}
                color="primary"
                onClick={copyRefLink}
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
            <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">
                <AccountBalanceWalletIcon variant="outlined" fontSize="large" color="primary"/>
                {isConnected && loadingr && (  <CircularProgress color="primary" size={20} />   )}
              </Box>
              <Typography variant="h5" noWrap>
                Total Line Income
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Auto Re-invest 20%
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
                  Receive  {((80 / 100) * balance).toFixed(2)}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Re-invest  {((20 / 100) * balance).toFixed(2)}
                </Typography>

                <Box  
                sx={{
                  pt: 2
                  
                }}
              > 
              </Box>

              {isConnected && (
                <Tooltip arrow title="Auto re-invest 20% on withdraw"><span>
                <Button variant="outlined" size="small" color="primary" onClick={callwithdraw} 
                disabled={loadingd}
                >Withdraw</Button> </span></Tooltip> 
              )}

              {isConnected && loadingd && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet to enable"><span>
                <Button variant="outlined" size="small" color="primary" disabled>Withdraw</Button> 
                </span></Tooltip>              )}

              </Box>
              <Box
                sx={{
                  pt: 1
                }}
              ></Box>
                {trnrecepitw && (<Button  size="small"  variant="outlined" color="success" onClick={() => openScan(trnrecepitw)} >Withdraw Receipt</Button>)}
                
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

              <Box
                sx={{
                  pt: 1
                }}
              ></Box>

            <Typography
              sx={{
                pb: 1
              }}
              color="text.secondary"
              size="small" 
            >
              Receive 10 FASTX Tokens on each buy.
              <Chip
                sx={{
                  mr: 0.5
                }}
                variant="outlined"
                size="small"
                label={copyTokens}
                color="primary"
                onClick={copyToken}
              />
            </Typography>

  

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
                <Tooltip arrow title="Choose Sponsor with 1 - 20 downline"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} 
                disabled={loading}
                >Buy Pack</Button> </span></Tooltip> 
              )}

              {isConnected && loading && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} disabled>Buy Pack</Button> 
                </span></Tooltip>              )}
                </Box>
                
                <Box
                sx={{
                  pt: 1
                }}
              ></Box>
                {errormsgg && (<Button  size="small"  variant="outlined" color="warning" onClick={() => setErrormsgg(null)} >{errormsgg}</Button>)}
                {trnrecepitb && (<Button  size="small"  variant="outlined" color="success" onClick={() => openScan(trnrecepitb)} >Buy Receipt</Button>)}
                
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
                Level (upline users)
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {levelnumberp}
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
                {subordinatesp}
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
                <Tooltip arrow title="Choose Sponsor with 1 - 20 downline"><span>
                <Button variant="outlined" size="small" color="primary" onClick={callAdmin} 
                disabled={loadings}
                >Check Health</Button> </span></Tooltip> 
              )}

              {isConnected && loadings && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet"><span>
                <Button variant="outlined" size="small" color="primary" onClick={callAdmin} disabled>Check Health</Button> 
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
