/**
 * This is a snackbar component and it is imported in the App.js
 * This function can be called from any component using Event Emitter
 * Event Emitter name should be "OpenSnackbar" in order to listen
 * evebtData should be an object with message as property, {message: 'demo'}
 */

import React, { useEffect, useState } from 'react';
import {Snackbar, SnackbarContent} from '@material-ui/core';
import EventEmitter from '../../../../utils/EventEmitter';
import helperFunctions from '../../../../utils/Helper';

function PositionedSnackbar() {
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setMessage] = useState('');
    const [snackbarColor, setColor] = useState('#578a4c');

    useEffect(() => {
        const openSnackbar = async (eventData) => {
            const message = eventData.message;
            const color = await helperFunctions.GetColorFromMessage(eventData.message);
            setColor(color);
            setMessage(message);

            /**
             * Open snackbar
             */
            setOpen(true);

            /**
             * Close snackbar after 2 seconds
             */
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }

        const snackbarListener = EventEmitter.addListener('OpenSnackbar', openSnackbar);

        return () => {
            snackbarListener.remove();
        }
    })
  
    return (
      <>
        <Snackbar
          open={open}
        >
        <SnackbarContent style={{ backgroundColor: snackbarColor, color: 'white' , display: 'block', textAllign: 'center' }}
        message={<span id="client-snackbar">{ snackbarMessage }</span>}
      />
  </Snackbar>
      </>
    );
  }


  export default PositionedSnackbar;