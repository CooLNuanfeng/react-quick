var Todo = React.createClass({
    displayName: 'Todo',

    getInitialState: function () {
        return {
            'todos': []
        };
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'todo-box' },
            React.createElement(InputText, { todoInput: this.todoHander }),
            React.createElement(ListBox, { todos: this.state.todos })
        );
    },
    todoHander: function (todo) {
        this.state.todos.push(todo);
        this.setState({
            'todos': this.state.todos
        });
    }
});

var InputText = React.createClass({
    displayName: 'InputText',

    render: function () {
        return React.createElement(
            'div',
            { className: 'input-box' },
            React.createElement('input', { type: 'text', placeholder: '请输入', onKeyUp: this.inputHander })
        );
    },
    inputHander: function (ev) {
        if (ev.keyCode == 13) {
            var id = new Date().getTime();
            var text = $(ev.target).val();
            if (text) {
                var json = {};
                json.id = id;
                json.todo = text;
                //通过 props 的函数参数 实现反向数据传递
                this.props.todoInput(json);
                $(ev.target).val('');
            }
        }
    }
});

var ListBox = React.createClass({
    displayName: 'ListBox',

    getInitialState: function () {
        return {
            listTodo: this.props.todos
        };
    },
    render: function () {
        var _this = this;
        return React.createElement(
            'ul',
            { className: 'list-box' },
            this.state.listTodo.map(function (json, key) {
                return React.createElement(
                    'li',
                    { className: 'list-item', key: key },
                    React.createElement(
                        'span',
                        { className: 'list-txt' },
                        json.todo,
                        ' '
                    ),
                    React.createElement(
                        'a',
                        { href: 'javascript:;', 'data-id': json.id, onClick: _this.deleteItem },
                        '删除'
                    )
                );
            })
        );
    },
    deleteItem: function (ev) {
        var id = $(ev.target).attr('data-id');
        var arr = this.state.listTodo;
        $.each(arr, function (index, json) {
            if (json && json.id == id) {
                arr.splice(index, 1);
            }
        });
        this.setState({
            listTodo: arr
        });
    }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('example'));