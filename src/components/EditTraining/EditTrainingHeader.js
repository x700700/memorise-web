import React, {useEffect, useRef, useState} from "react";
import './EditTrainingHeader.scss';
import {useDispatch, useSelector} from "react-redux";
import logger from "../../common/logger";
import * as types from '../../redux/actionsTypes';
import TextInput from "../_Tools/TextInput";
import {ThemeProvider} from '@material-ui/core/styles';
import IconButton from "../_Tools/IconButton";
import {renameTraining} from "../../redux/actions";


const themeName = {
    margin: '0px',
    marginTop: '.5rem',
};
/*
const muiThemeName = createMuiTheme({
        palette: {
            primary: orange,
        },
    },
);
 */

const EditTrainingHeader = ({ id, play, exam, onNameEdit }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.app.userName) && true;
    const isLoaded = useSelector(state => state.editTraining.isLoaded);
    const name = useSelector(state => state.editTraining.name);
    const [nameInputDisabled, setNameInputDisabled] = useState(false);
    const [nameInputOnEdit, setNameInputOnEdit] = useState(false);
    const [shouldAutoFocus, setShouldAutoFocus] = useState(false);

    const rename = () => {
        const newName = refName.current.value();
        // logger.warn('rename - ', newName);
        setNameInputDisabled(true);
        setTimeout(() => setNameInputDisabled(false), 100);
        dispatch(renameTraining(id, newName));
    };

    const _play = () => {
        !nameInputOnEdit && play();
    };
    const _exam = () => {
        !nameInputOnEdit && exam();
    };
    const onNameFocus = () => {
        // logger.warn('On name focus');
        setNameInputOnEdit(true);
        onNameEdit(true);
        dispatch({ type: types.APP_SET_TRAINING_NAME_IS_ON_EDIT, edit: true });
    };
    const onNameBlur = (val, enterPressed) => {
        // logger.warn('On name blur - Cancel');
        setNameInputOnEdit(false);
        onNameEdit(false);
        dispatch({ type: types.APP_SET_TRAINING_NAME_IS_ON_EDIT, edit: false });

        !enterPressed && refName.current.setValue(name);
    };

    useEffect(() => {
        logger.trace('Training Edit Header update');
        if (isLoaded && !name) {
            logger.trace('focus auto focus');
            setShouldAutoFocus(true);
        }
    }, [name, isLoaded]);

    const styleOnEdit = {
        pointerEvents: !isLoggedIn || nameInputOnEdit ? 'none' : 'auto',
        opacity: !isLoggedIn ? 0.5 : 1,
    };

    const refName = useRef();
    return (
        <div className="edit-training-header-container">
            {isLoaded && (name || shouldAutoFocus) &&
            <div className="header-row">
                <div className="field name">
                    <ThemeProvider theme={themeName}>
                        <TextInput ref={refName}
                                   // muiTheme={muiThemeName}
                                   type="training" defaultValue={name} autoFocus={shouldAutoFocus}
                                   onEnter={rename} onFocus={onNameFocus} onBlur={onNameBlur}
                                   disabled={!isLoggedIn || nameInputDisabled}
                        />
                    </ThemeProvider>
                </div>
                <div className="edit-training-buttons" style={styleOnEdit}>
                    <IconButton size={2} faName="copy" onClick={_play}/>
                    <IconButton size={2} faName="grin-beam-sweat" onClick={_exam}/>
                </div>
            </div>
            }
        </div>);
};
export default EditTrainingHeader;
