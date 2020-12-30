import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        padding: '36px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        textAlign: 'center',
    },
    root: {
        position: 'fixed',
        top: '40%',
        left: '50%',
        width: '30em',
        height: '15em',
        marginTop: '-9em', /*set to a negative number 1/2 of your height*/
        marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
    }
}));

const Landing = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [error, setError] = useState('');
    const nextPath = (name, roomId) => {
        if (!name || !roomId || name.length < 1 || roomId.length < 1) {
            // setError('')
            return;
        }
        const path = `/${name}/${roomId}`;
        props.history.push(path);
    }
    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <CardHeader
                    title="Welcome To CodeShare"
                    subheader="Now code pair with your firends freely"
                />
                <CardContent>
                    <form autoComplete="on" style={{ marginBottom: '20px', flex: 'display' }}>
                        <TextField id="standard-basic" label="Your Name" onChange={(val) => { setName(val.target.value); }} required />
                        <br /><br />
                        <TextField id="standard-basic" label="Room Name" onChange={(val) => { setRoomId(val.target.value); }} required />
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={() => nextPath(name, roomId)}>Join</Button>
                    </form>
                </CardContent>

            </div>
        </div >
        // </div>
    )
}

export default Landing
