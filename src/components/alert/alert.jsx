import React, {memo} from 'react';
import {Alert, Collapse, IconButton} from "@mui/material";

const AlertAll = ({openAlert,setOpenAlert}) => {
    return (
        <>
            <Collapse in={openAlert.open}
                      sx={{position: 'fixed', top: '200px', left: '100px', right: '100px', zIndex: 999}}>
                <Alert severity={openAlert?.severityStr}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpenAlert({open: false, text: '', severityStr: ''})
                               }}
                           >
                               {/*<CloseIcon fontSize="inherit" />*/}
                           </IconButton>
                       }
                       sx={{mb: 2}}
                >
                    {openAlert?.text}
                </Alert>
            </Collapse>
        </>
    );
};

export default memo(AlertAll);