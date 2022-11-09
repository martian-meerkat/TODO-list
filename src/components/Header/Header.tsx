import * as React from 'react';
import { useContext, useState } from 'react';
import { AdStringContext } from '../../context/ad-string-context';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Check } from '@mui/icons-material';

import './Header.css';

export default function AppHeader() {
    const { showAd, toggleShowAd } = useContext(AdStringContext);
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleToggleTicker = () => {
        toggleShowAd(!showAd);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    
    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
            <h1 className='header'>To Do</h1>
            <IconButton
                className={"settings-button"}
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={handleOpenMenu}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleToggleTicker}>
                    <ListItemIcon>
                        {showAd ? <Check /> : null}
                    </ListItemIcon>
                    Show ticker
                </MenuItem>
            </Menu>
        </Box>
    );
}
