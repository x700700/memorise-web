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

const themeModal = {
    width: '80%',
    height: 235,
};

const ExerciseEditModal = ({ modalRef, exercise, disable }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const refQ = useRef();
    const refA = useRef();

    const translatedWord = useSelector(state => state.editTraining.translatedWord);
    const [currentAnswer, setCurrentAnswer] = useState(exercise.a);

    const answerChange = (a) => {
        setCurrentAnswer(a);
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
        const foo = refQ.current.value();
        refQ.current.setValue(refA.current.value());
        refA.current.setValue(foo);
        setCurrentAnswer(foo);
    };

    const cancel = () => {
        !disable && modalRef.current.close(); // causes the Modal not to be openned
        setCurrentAnswer(exercise.a);
    };
    const save = () => {
        // logger.warn('SAVE Exercise - ', refQ.current.value(), refA.current.value());
        const updatedExercise = {
            q: refQ.current.value(),
            a: refA.current.value(),
        };
        dispatch(saveExercise(exercise.trainingId, exercise.id, updatedExercise));
        setCurrentAnswer(updatedExercise.a);
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
            setCurrentAnswer(translatedWord);
        }
    }, [translatedWord, setCurrentAnswer]);

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
                        <div className="paste-translate" style={{ display: currentAnswer ? 'none' : 'flex' }} onClick={translate}>
                            <div className="arrow">
                                <IconButton size={1.5} faName="long-arrow-alt-down" />
                            </div>
                            <IconButton size={1.5} faName="language" />
                        </div>
                    </div>
                    <div className="field question">
                        <TextInput ref={refQ} type="q" defaultValue={exercise.q} autoFocus={true} onEnter={() => refA.current.focus()} />
                    </div>
                    <div className="field answer">
                        <TextInput ref={refA} type="a" defaultValue={exercise.a} onChange={answerChange} onEnter={() => modalRef.current.setOkFocused()}/>
                    </div>
                </div>
            </ModalOkCancel>
        </ThemeProvider>);
};
export default ExerciseEditModal;
