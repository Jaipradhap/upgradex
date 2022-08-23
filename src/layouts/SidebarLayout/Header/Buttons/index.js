import { Box , Tooltip, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import HeaderNotifications from './Notifications';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      {/* <HeaderSearch /> */}
      <Tooltip arrow placement="top" title="Instagram">
                    <IconButton color="primary" onClick={event =>  window.open('https://www.instagram.com/rabbiteggsdefi')}>
                      <InstagramIcon />
                    </IconButton>
                  </Tooltip>

      <Tooltip arrow placement="top" title="Twitter" >
                  <IconButton color="primary" onClick={event =>  window.open('https://twitter.com/DefiEggs')}>
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>


      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
