import * as React from 'react';
import Box from '@mui/material/Box';
import Button from "../button/Button"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import {done_icon} from "../../images/index";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 530,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    borderRadius: 10,
    padding: "50px 43px"
};
const title = {
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "26px",
    textAlign: "center",
}

export default function SuccessModal({title, open, handleClose}) {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={title} variant="h6" component="h2">
                        {title}
                    </Typography>
                    {/* <img style={{marginTop: 63}} src={done_icon} alt="wrong"/> */}
                </Box>
            </Modal>
        </div>
    );
}
