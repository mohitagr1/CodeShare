import React, { Component, useState, useEffect } from 'react';
import AceEditor from "react-ace";
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


const io = socketClient.io('http://localhost:4000');

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            lang: 'javascript',
            theme: 'monokai',
            fontSize: 20
        }
    }

    componentDidMount() {
        io.on('code', this.handleCode);
    }

    handleCode = (data) => {
        this.setCode(data, false);
    }

    setCode = (val, emit) => {
        this.setState({ code: val });
        // console.log(this.state);
        if (!emit) return;
        io.emit('code', this.state.code);
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

    render() {
        const { code, lang, theme, fontSize } = this.state;
        // console.log('Values from states', code, lang, theme, fontSize);
        return (
            <div>
                <Setting handleFontSetting={this.handleFontSetting} handleLangSetting={this.handleLangSetting} handleThemeSetting={this.handleThemeSetting} />
                <AceEditor
                    placeholder="Write your code here"
                    width={window.innerWidth}
                    height={window.innerHeight}
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
            </div>
        )
    }
}

export default Editor;
