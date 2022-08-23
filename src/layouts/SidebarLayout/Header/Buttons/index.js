import { Box , Tooltip, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import HeaderNotifications from './Notifications';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      {/* <HeaderSearch /> */}
      <Tooltip arrow placement="top" title="Instagram">
                    <IconButton color="primary">
                      <InstagramIcon onClick={event =>  window.open('https://www.instagram.com/rabbiteggsdefi')}/>
                    </IconButton>
                  </Tooltip>

      <Tooltip arrow placement="top" title="Twitter">
                  <IconButton color="primary">
                    <TwitterIcon onClick={event =>  window.open('https://twitter.com/DefiEggs')} />
                  </IconButton>
                </Tooltip>


      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
