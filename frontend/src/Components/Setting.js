import React, { useState } from 'react';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Setting(props) {
    const classes = useStyles();
    const [lang, setLang] = useState('javascript');
    const [theme, setTheme] = useState('monokai');
    const [font, setFont] = useState(20);
    const { handleFontSetting, handleLangSetting, handleThemeSetting, saveOffline, handleOpen } = props;

    return (
        <div style={{ justifyContent: "space-around", display: "flex", backgroundColor: '#f2d8d5' }}>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="lang-label">Langauge</InputLabel>
                <Select
                    labelId="lang-label"
                    value={lang}
                    onChange={(e) => { setLang(e.target.value); handleLangSetting(e.target.value) }}
                >
                    <MenuItem value={'javascript'}>JavaScript</MenuItem>
                    <MenuItem value={'c_cpp'}>C++</MenuItem>
                    <MenuItem value={'java'}>JAVA</MenuItem>
                    <MenuItem value={'python'}>Python</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                    labelId="theme-label"
                    value={theme}
                    onChange={(e) => { setTheme(e.target.value); handleThemeSetting(e.target.value) }}
                >
                    <MenuItem value={'monokai'}>Dark</MenuItem>
                    <MenuItem value={'github'}>Light</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>

                <InputLabel id="font-label">Font Size</InputLabel>
                <Select
                    labelId="font-label"
                    value={font}
                    onChange={(e) => { setFont(e.target.value); handleFontSetting(e.target.value) }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={35}>35</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={() => handleOpen()}>Participants</Button>
            <IconButton onClick={() => saveOffline()}>
                <SaveAltIcon />
            </IconButton>
        </div>

    )
}

export default Setting;
