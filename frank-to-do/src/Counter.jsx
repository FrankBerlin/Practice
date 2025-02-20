import PropTypes from 'prop-types';
import React from 'react';

const Counter = ({ todos = [] }) => {
    const total = todos.length;
    const open = todos.filter((todo) => !todo.done).length;

    return (
        <div className="flex items-center">
            Total: {total} | Open: {open}
        </div>
    );
};

Counter.propTypes = {
    todos: PropTypes.array.isRequired,
};

export default Counter;