import { useRef, useState } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  Link,
  IconButton,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Rating,
  OutlinedInput,
  Chip,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import Text from 'src/components/Text';
import Web3 from "web3";

import SimpleStorageContract from "config/BasicContractFXMflat.json";
import { CONTADDRESS,TXNURL,TOKENADDRESS,REFURL,FXSPONSOR,DSTATECT } from 'config/configct';

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
  const [errormsgsp, setErrormsgsp] = useState(null);
  const [errormsgfi, setErrormsgfi] = useState(null);
  const [warnmsgg, setWarnmsgg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingw, setLoadingw] = useState(false);
  const [loadingr, setLoadingr] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [loadingsch, setLoadingsch] = useState(true);
  const [loadingfind, setLoadingfind] = useState(false);
  
  
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
  const [copyShRef, setCopyShRef] = useState('Copy and Share Ref Link');
  const [tokenamt, setTokenamt] = useState(10);
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWithdraws, setTotalWithdraws] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const [subordinatesp, setSubordinatesp] = useState(0);
  const [levelnumberp, setLevelnumberp] = useState(0);
  const breadcrumbs = [
    <Typography key="1" color="primary">
     <b> Connect Wallet</b>
    </Typography>,
    <Typography key="2" color="primary">
    <b> Refresh Board</b>
  </Typography>,
    <Typography key="3" color="primary">
    <b> Enter Sponsor</b>
  </Typography>,
      <Typography key="4" color="primary">
      <b> Check Sponsor Health</b>
    </Typography>,
        <Typography key="5" color="primary">
        <b> Buy Token</b>
      </Typography>,
          <Typography key="6" color="primary">
           <b> Refresh Board</b>
        </Typography>,
  ];

  const copyRefLink = async () => {
    if(isConnected) {
    navigator.clipboard.writeText(REFURL.concat(accounts));
    setCopyRef('Copied!');
    setCopyShRef('Copied!');
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
 
    // if (!(amt >= 10 && amt <= 500)) {
    if (!(amt >= 1 && amt <= 500)) {
      errflag =1;
      setErrormsgg("Each Buy,Min Amount: 10 & Max Amount: 500");
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
 

    if (errflag > 0) { setLoading(false); return; }
 
    
    
    await callBuy(ads,amt);

    setLoading(false);

  } catch (error) {
    setLoading(false);

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
        // console.log(isNewUser);
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
    // console.log(error);
    setLoadingr(false);
  }
}; 

// 2.GetSponsorDetails

// 3.GetTotals


// 4.callBuy

const callBuy = async (sponaddress,buyprice) => {
  try {

    if(accounts) {

    let totalamt = buyprice.toString();


    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
      }
      else {

      
        let isNewUser = await instance.methods.checkUser(sponaddress).call();

        if (!isNewUser) { setErrormsgg("Sponsor Not Found! Please check sponsor finder tool"); return; }
    

    await instance.methods.BuyPack(sponaddress).send({ from: accounts , value: Web3.utils.toWei(totalamt, 'ether')}, 
    function(error, transactionHash){
      if (error) {
      } else {
        setTrnrecepitb(transactionHash);
      }
  });
}
} else
{
  
}
  } catch (error) {
    setErrormsgg("Please try again later!");
  }
}; 

// callSponsor


const callSponsor = async () => {
  try {
    if(accounts) {
      setLoadingfind(true);
    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      ContractAddress
    );

      if(!instance) {
      }
      else {

        let isNewUser = await instance.methods.checkUser(accounts.trim()).call();
        if (isNewUser) { setErrormsgfi("Sponsor already exists"); setLoadingfind(false); return; }
    

        await instance.methods.getSponsor().call(
          function (err, res) {
            if (err) {
              setLoadingfind(false);
            } else {

              for(let i=0;i < 5;i++) {
                
                if(/^0x0+$/.test(res[i])) {}
                // if(parseInt(res[i], 16) === 0) {}
                else {  cartItems.push({id: i+1,value:res[i]}); }
                
              }
              // setWarnmsgg("Please check below section");
              // console.log(cartItems);
              setLoadingsch(false);
            }
          }
        );
      }
      }
      setLoadingfind(false);
      
  } catch (error) {
    setLoadingfind(false);

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
              // setLoadingd(false);
              setTrnrecepitw(transactionHash);
            }
        });      }

      }
      setLoadingd(false);
  } catch (error) {
    setLoading(false);

  }
}; 

// getChild

const getChild = async () => {
  try {
    if (subordinatesp <= 0) {  return;} // setWarnmsgg("Downline token holders");
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

        let isNewUser = await instance.methods.checkUser(sponaddress.trim()).call();
        if (!isNewUser) { setLoadings(false); return; }
    

        await instance.methods.getChildAddress(sponaddress.trim()).call(
          function (err, res) {
            if (err) {
              setLoadings(false);
            } else {
              // let tempArr = [];
              for(let i=0;i < subordinatesp;i++) {
                
                cartItems.push({id: i+1,value:res[i]});
                
              }
              setWarnmsgg("Please check below section");
              //  console.log(tempArr);
              // setCartItems([...cartItems, tempArr]);
              //  setLoadingsch(false);
            }
          }
        );
      }
      }
      setLoadings(false);
      setLoadingsch(false);
  } catch (error) {
    setLoadings(false);
setLoadingsch(false);
  }
}; 

// Admin

const callAdmin = async (sponaddress) => {
  try {
    // console.log(sponaddress);
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

        // let isNewUser = await instance.methods.checkUser(sponaddress.trim()).call();
        // if (!isNewUser) { setLoadings(false); return; }
    

        await instance.methods.getDashBoard(sponaddress.trim()).call(
          function (err, res) {
            if (err) {
              setLoadings(false);
            } else {
              setSubordinatesp(res[2]);
              setLevelnumberp(res[3]);

              if(res[2] >=0 && res[2] <=19){
                setErrormsgsp("Health Check Pass");
              }

              if(res[2] >=20){
                setWarnmsgg("Already 20 Downline token holders exists! It is recommended for influencers only to choose this sponsor");
              }

              if(res[2] > 0){
              // setLoadingsch(true);
              }
              // setCartItems([]);

              // setLoadings(false);
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
      
        {isConnected && (<Button variant="outlined" color="success" onClick={getUserDetails} disabled={loadingr}>Refresh Board</Button>)} {' '}

      {errormsgw && (<Button variant="outlined" color="error" startIcon={<ErrorOutlineIcon fontSize="small" />} >{errormsgw}</Button>)} {' '}
      
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

      <Box
        py={1}
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
                    <Typography variant="h5">Sponsor Finder Tool</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                <Box
                sx={{
                  pt: 1
                }}
              > </Box>


              {loadingsch && (
                <Button variant="outlined" size="small" color="primary" onClick={callSponsor} 
                disabled={loadingfind}  endIcon={<SearchTwoToneIcon fontSize="small" />}
                >Find Sponsor Address</Button>
              )}

              {isConnected && loadingfind && ( 
                <CircularProgress color="primary" size={20} />
              )}
              { ' ' }
              {errormsgfi && (<Button  size="small" startIcon={<ErrorOutlineIcon fontSize="small" />}  variant="outlined" color="warning" style={{textAlign: 'left'}}
                  onClick={() => setErrormsgfi(null)} >{errormsgfi}</Button>)}

              <Box
                sx={{
                  pt: 1
                }}
              > </Box>


      {cartItems.length > 0 && (
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
        <CardAddAction>
            <CardContent>
            <Typography variant="subtitle1">
                Click to copy address into Sponsor Address Box.
              </Typography>

            {cartItems.map((item) => (
          
          <Box
          key={item.id} 
          sx={{
            pt: 1
          }}
        >
          <Button variant="outlined" size="small" onClick={(e) => { setSponaddress(item.value); addressRef.current.focus(); callAdmin(item.value); } }>
          {item.value.substr(0, 10)} 
          </Button> 

          </Box>
          ))}

            </CardContent>
            </CardAddAction>
            </Grid>
            </Grid> )}

            <Box
                sx={{
                  pt: 3
                }}
              > </Box>

            <Typography>Simple Usage Steps:  </Typography>
            <Breadcrumbs separator="???" aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>

                <Box
                sx={{
                  pt: 2
                }}
              > </Box>

                <Typography>Copy the fastx
                {' '}
                     <Chip
                          sx={{
                            mr: 0.5
                          }}
                          variant="outlined"
                          size="small"
                          label="sponsor"
                          color="primary"
                          onClick={(e) => { setSponaddress(FXSPONSOR); addressRef.current.focus(); callAdmin(FXSPONSOR); } }
                        /> 
                       and check health.Then proceed to buy token.
                  
                   </Typography>

                   <Box
                sx={{
                  pt: 2
                }}
              > </Box>
                <Typography>For Deep Dive on sponsor finding, please check the { ' '}
                <Link
            href={DSTATECT}
            target="_blank"
            rel="noopener noreferrer"
          >Contract </Link> BuyPack Transactions </Typography>

                  </AccordionDetails>
                </Accordion>
                <Divider />
                <Box
        py={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>

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
                Token Holding Value
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
                token holders {subordinates}
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
                  Level 
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
                Auto Buy Token 20%
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
                  Buy Token  {((20 / 100) * balance).toFixed(2)}
                </Typography>

                <Box  
                sx={{
                  pt: 2
                  
                }}
              > 
              </Box>

              {isConnected && (
                <Tooltip arrow title="Auto Buy Token 20% on withdraw"><span>
                <Button variant="outlined" size="small" color="primary" onClick={callwithdraw} 
                disabled={loadingd}
                >Withdraw</Button> </span></Tooltip> 
              )}

              {isConnected && loadingd && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet"><span>
                <Button variant="outlined" size="small" color="primary" disabled>Withdraw</Button> 
                </span></Tooltip>              )}

              </Box>
              <Box
                sx={{
                  pt: 1
                }}
              ></Box>
                {trnrecepitw && (<Button  size="small" fullWidth variant="outlined" color="success" 
                startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                onClick={() => openScan(trnrecepitw)} >Withdraw Receipt</Button>)}
                
                <Box
                sx={{
                  pt: 1
                }}
              ></Box>

                {trnrecepitw && (<Button  size="small"  variant="outlined" color="success" fullWidth
                onClick={() => copyRefLink()} >{copyShRef}</Button>)}
                

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
                      value={tokenamt}
                      inputRef={amtRef}
                      type="number"
                      onChange={(e) => setTokenamt(e.target.value)}
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
                      onChange={(e) => { setSponaddress(e.target.value); }}
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
              Receive {tokenamt} FASTX Tokens.
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
                <Tooltip arrow title="Choose Sponsor with 0 - 20 downline"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} 
                disabled={loading}
                >Buy Token</Button> </span></Tooltip> 
              )}

              {isConnected && loading && ( 
                <CircularProgress color="primary" size={20} />
              )}

              {!isConnected && (
                <Tooltip arrow title="Please Connect Wallet"><span>
                <Button variant="outlined" size="small" color="primary" onClick={sendValue} disabled>Buy Token</Button> 
                </span></Tooltip>              )}
                </Box>
                
                <Box
                sx={{
                  pt: 1
                }}
              ></Box>
                {errormsgg && (<Button  size="small"  fullWidth variant="outlined" color="warning" 
                startIcon={<ErrorOutlineIcon fontSize="small" />} style={{textAlign: 'left'}}
                onClick={() => setErrormsgg(null)} >{errormsgg}</Button>)}

                {trnrecepitb && (<Button  size="small"  variant="outlined" color="success" fullWidth
                startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                onClick={() => openScan(trnrecepitb)} >Buy Receipt</Button>)}

                <Box
                sx={{
                  pt: 1
                }}
              ></Box>

                {trnrecepitb && (<Button  size="small"  variant="outlined" color="success" fullWidth
                onClick={() => copyRefLink()} >{copyShRef}</Button>)}
                
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
               <Box display="flex" alignItems="center" pl={0.3} justifyContent="space-between">

               <Typography variant="h5" noWrap>
                Sponsor Health Check
              </Typography>

            <Tooltip arrow title="Refresh Only If Level shown as 0">
            <IconButton size="small" color="primary" onClick={ () => callAdmin(sponaddress) }>
              <RefreshTwoToneIcon />
            </IconButton>
          </Tooltip> </Box>

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
                {levelnumberp}
              </Typography>

                <Box
                sx={{
                  pt: 2
                }}
              >
                </Box>


              <Typography variant="h5" noWrap>
                Downline Holders

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

    
              {isConnected && loadings && ( 
                <CircularProgress color="primary" size={20} />
              )}

    
                </Box>

                <Box
                sx={{
                  pt: 1
                }}
              ></Box>
              
                {warnmsgg && (<Button  size="small"  variant="outlined" color="warning" style={{textAlign: 'left'}}
                onClick={() => setWarnmsgg(null)} >{warnmsgg}</Button>)}
                
                
                {errormsgsp && (<Button  size="small"  variant="outlined" color="success" style={{textAlign: 'left'}}
                onClick={() => setErrormsgsp(null)} >{errormsgsp}</Button>)}


                </CardContent>
              
            </CardAddAction>
        
        </Grid>

</Grid>

<Box
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>

    </>
  );
}

export default TaskSearch;
