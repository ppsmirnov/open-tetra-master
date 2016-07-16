import './Draggable.scss';
import {block} from '../utils/bem';

export default class Draggable extends Component {

    /*
     *  -->x
     * |
     * vy
     *
     */

    constructor(props) {
        super(props);
        this.state = {
            initialX: null,
            initialY: null,
            dx: 0,
            dy: 0,
            isDragging: false
        }
    }


    dragStart = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        this.setState({isDragging: true, initialX: event.clientX, initialY: event.clientY})
    };

    dragMove = (event) => {
        this.setState({dx:  - this.state.initialX + event.clientX, dy: - this.state.initialY + event.clientY});
    };

    dragStop = (event) => {
        let result = {dx: 0, dy: 0, isDragging: false, initialX: null, initialY: null};
        const outerHandler = this.props.dragStop;
        //outer handler sould return final coordinates for component or false. If false - draggable moves to its
        //initial position

        if(outerHandler) {
            this.setState({...result, ...outerHandler(this.refs.dragSource)});
        }
        else {
            this.setState(result);
        }
    };

    createMouseMoveAction = () => {
        return this.state.isDragging ? {onMouseMove: this.dragMove} : {}
    };

    getTransform() {
        return ({
            transform: `translate(${this.state.dx}px, ${this.state.dy}px)`,
            cursor: this.state.isDragging ? 'pointer': 'default',
            zIndex: this.state.isDragging ? '100': 'initial'
    })}

    render() {
        return (
            <div className = {block('draggable')([{'dragging': this.state.isDragging}]) } ref="dragSource"
                 onMouseDown = {this.dragStart}
                 onMouseUp = {this.dragStop}
                {...this.createMouseMoveAction()}
                 style = {this.getTransform()}
            >
                {this.props.children}
            </div>
        )
    }
}