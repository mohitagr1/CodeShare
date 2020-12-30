import React, { Component } from 'react';
import AceEditor from "react-ace";
import Modal from '@material-ui/core/Modal';
// import {} from "ace-builds"
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/java";
// import "ace-builds/src-noconflict/snippets";

import "ace-builds/src-min-noconflict/ext-language_tools";

import socketClient from 'socket.io-client';
import Setting from './Setting';
import db from '../firebase.js';
import { Avatar, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';

let io;

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            lang: 'javascript',
            theme: 'monokai',
            fontSize: 20,
            open: false,
            participants: [],
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    componentWillMount() {
        console.log('cwm');
        io = socketClient.io('http://localhost:4000');
    }


    componentDidMount() {
        io.on('participants', (data) => {
            console.log('participants', data);
            this.setState({
                participants: [...data.users]
            })
        })
        io.on('code', this.handleCode);
        const { name, roomId } = this.props.match.params;
        io.on('connect', () => {
            console.log(`signaling Peer "connect" event`);
            io.emit('join', { userName: name, roomId });
        });
        db.ref(`/${roomId}`).once('value').then((snapshot) => {
            // console.log(snapshot.val());
            const data = snapshot.val();
            this.setCode(data, true);
        });
    }

    handleCode = (data) => {
        console.log(data);
        this.setCode(data, false);
    }

    setCode = (val, emit) => {
        this.setState({
            code: val
        }, () => {
            const roomId = this.props.match.params.roomId;
            console.log('setCode', roomId);
            if (!emit) return;
            io.emit('code', { roomId, code: this.state.code });
            db.ref(`/${roomId}`).set(this.state.code);
        });
        // console.log(this.state);
    }

    handleLangSetting = (val) => {
        // console.log(val, this.state);
        this.setState({
            lang: val
        });
    }

    handleThemeSetting = (val) => {
        // console.log(val);
        this.setState({
            theme: val
        });
    }

    handleFontSetting = (val) => {
        // console.log(val);
        this.setState({
            fontSize: val
        });
    }

    saveOffline = () => {
        const element = document.getElementById('saveNotepad');
        const file = new Blob([this.state.code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "CodeShareCode.txt";
        element.click();
    }

    render() {
        const { code, lang, theme, fontSize, open, participants } = this.state;
        // console.log('Values from states', code, lang, theme, fontSize);
        return (
            <div>
                <Setting handleFontSetting={this.handleFontSetting} handleLangSetting={this.handleLangSetting} handleThemeSetting={this.handleThemeSetting} saveOffline={this.saveOffline} handleOpen={this.handleOpen} />
                <AceEditor
                    placeholder="Write your code here"
                    width={`100vw`}
                    height={`100vh`}
                    mode={lang}
                    theme={theme}
                    name="blah2"
                    onChange={(e) => { this.setCode(e, true) }}
                    fontSize={fontSize}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    enableSnippets={true}
                />
                <a id='saveNotepad' />
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='xs' fullWidth={true}>
                    <DialogTitle id="simple-dialog-title" style={{ backgroundColor: '#f2d8d5' }} onClose={this.handleClose} >
                        Participants
                        <IconButton aria-label="close" onClick={this.handleClose} style={{
                            position: 'absolute',
                            right: '1px',
                            top: '2px',
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <List>
                        {participants.map((user) => (
                            <ListItem key={user.id}>
                                <ListItemAvatar>
                                    <Avatar style={{ color: '#f2d8d5' }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default Editor;
