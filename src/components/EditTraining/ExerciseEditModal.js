import React, {useEffect, useRef, useState} from "react";
import './ExerciseEditModal.scss';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import logger from "../../common/logger";
import {ThemeProvider} from "@material-ui/core/styles";
import ModalOkCancel from "../_Tools/ModalOkCancel";
import TextInput from "../_Tools/TextInput";
import IconButton from "../_Tools/IconButton";
import {deleteExercise, getTranslate, saveExercise} from '../../redux/actions'
import {ErrorOutline, HelpOutline} from "@material-ui/icons";

const themeModal = {
    width: '80%',
    height: 235,
};
const themeQA = {
    fontSize: '1.5rem',
    fontWeight: 600,
};

const ExerciseEditModal = ({ modalRef, exercise, disable }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const refQ = useRef();
    const refA = useRef();

    const translatedWord = useSelector(state => state.editTraining.translatedWord);
    const [currentQ, setCurrentQ] = useState(exercise.q);
    const [currentA, setCurrentA] = useState(exercise.a);

    const questionChange = (q) => {
        setCurrentQ(q);
    };
    const answerChange = (a) => {
        setCurrentA(a);
    };
    const translate = () => {
        const word = refQ.current.value();
        const answer = refA.current.value();
        if (word && word.trim().length >= 2 && !answer) {
            logger.trace('Translate: ', word);
            dispatch(getTranslate(word));
        }
    };
    const switchQA = () => {
        const temp = refQ.current.value();
        setCurrentQ(refA.current.value());
        setCurrentA(temp);
        refQ.current.setValue(refA.current.value());
        refA.current.setValue(temp);

    };

    const cancel = () => {
        !disable && modalRef.current.close(); // causes the Modal not to be openned
        setCurrentQ(exercise.q);
        setCurrentA(exercise.a);
    };
    const save = () => {
        // logger.warn('SAVE Exercise - ', refQ.current.value(), refA.current.value());
        const updatedExercise = {
            q: refQ.current.value(),
            a: refA.current.value(),
        };
        dispatch(saveExercise(exercise.trainingId, exercise.id, updatedExercise));
        setCurrentQ(updatedExercise.q);
        setCurrentA(updatedExercise.a);
        modalRef.current.close(); // causes the Modal not to be openned
    };
    const del = () => {
        dispatch(deleteExercise(exercise.trainingId, exercise.id));
        modalRef.current.close();
    };


    useEffect(() => {
        if (refA.current && !refA.current.value() && refQ.current && refQ.current.value() && translatedWord && translatedWord.length < 20) {
            logger.trace('Put Translated:', translatedWord);
            refA.current.setValue(translatedWord);
            setCurrentA(translatedWord);
        }
    }, [translatedWord, setCurrentA]);

    useEffect(() => {
        logger.trace('A modal created for a new Exercise');
        setCurrentQ(exercise.q);
        setCurrentA(exercise.a)
    }, [exercise, setCurrentQ, setCurrentA]);

    return (
        <ThemeProvider theme={themeModal}>
            <ModalOkCancel ref={modalRef} title={t("edit exercise")}
                           okMsg={t('save')} cancelMsg={t('cancel')}
                           onOk={() => save} onCancel={() => cancel}
            >
                <div className="edit-modal-container">
                    <div className="delete-btn">
                        <IconButton size={2} faName="trash-alt" onClick={del}/>
                    </div>
                    <div className="switch-btns">
                        <div className="switch-qa">
                            <IconButton size={1.5} faName="random" onClick={switchQA}/>
                        </div>
                        <div className="paste-translate" style={{ display: !currentQ || currentA ? 'none' : 'flex' }} onClick={translate}>
                            <div className="arrow">
                                <IconButton size={1.5} faName="long-arrow-alt-down" />
                            </div>
                            <IconButton size={1.5} faName="language" />
                        </div>
                    </div>
                    <ThemeProvider theme={themeQA}>
                        <div className="field question">
                            <TextInput ref={refQ} defaultValue={exercise.q} autoFocus={true}
                                       clearTextIcon={true} startInputAdornment={<HelpOutline/>}
                                       onChange={questionChange} onEnter={() => refA.current.focus()} />
                        </div>
                        <div className="field answer">
                            <TextInput ref={refA} defaultValue={exercise.a}
                                       clearTextIcon={true} startInputAdornment={<ErrorOutline/>}
                                       onChange={answerChange} onEnter={() => modalRef.current.setOkFocused()}/>
                        </div>
                    </ThemeProvider>
                </div>
            </ModalOkCancel>
        </ThemeProvider>);
};
export default ExerciseEditModal;
