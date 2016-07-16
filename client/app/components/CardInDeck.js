import Card from './Card';
import Draggable from '../wrappers/Draggable';
import ReactDom from 'react-dom';

export default class CardInDeck extends Component {    
    render() {
        return (
            <Draggable dragStop = {this.props.dragStop}>
                <Card {...this.props}/>
            </Draggable>)
    }
}