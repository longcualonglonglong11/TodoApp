import Todo from '../component/Todo'
import {action} from '../reducer/reducer'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

const mapStateToProps = state =>{
    return (
    {
        todos : state.todos,
        detail: state.detail.item
    }
)
}
const mapDispatchToProps  = (dispatch) => ({
    action: bindActionCreators(action, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo);