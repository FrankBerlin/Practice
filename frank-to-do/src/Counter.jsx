import PropTypes from 'prop-types';

const Counter = ({ todos }) => {

    return (
        <div className="flex items-center">
            Total: {todos.length} | Open: {todos.filter((todo) => !todo.done).length}
        </div>
    );
};

Counter.propTypes = {
    todos: PropTypes.array.isRequired,
};

export default Counter;