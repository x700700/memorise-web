import React, { useEffect /*, useState*/} from 'react';
import { useDispatch } from "react-redux";
import * as types from "../redux/actionsTypes";
import './Exam.scss';
import consts from "../common/consts";
// import CardsDeck from '../components/Practice/cardsDeck';
// import mockTraining from '../mock/training-multiply';

const Exam = (props) => {
    const dispatch = useDispatch();
    // const [cardsDeck, setCardsDeck] = useState(null);
    // const [gameEnded, setGameEnded] = useState(false);
    // const [, setTopCard] = useState(null);

    useEffect(() => {
        // console.warn('Exam mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.exam });
        dispatch({type: types.APP_SHOW_MENU, show: false})

        // const newDeck = new CardsDeck(mockTraining);
        // setCardsDeck(newDeck);
    }, [dispatch]);

    // const id = props.match.params.id;

    // const top = cardsDeck && cardsDeck.top();
    return (
        <div className="exam-desktop-container">
            <div className="exam-container">
                <h1>Exam</h1>
            </div>
        </div>
    );
};

export default Exam;
