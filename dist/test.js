// 运行命令  babel -w --presets react src --out-dir dist

// one
var HelloMessage = React.createClass({
    displayName: 'HelloMessage',

    render: function () {
        return React.createElement(
            'h1',
            null,
            'Hello world, hello React!'
        );
    }
});

//two
var Parent = React.createClass({
    displayName: 'Parent',

    getDefaultProps: function () {
        //设置 props 默认值
        return {
            context: 'default'
        };
    },
    propTypes: { //设置 props 的 类型和是否必须
        context: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            context: this.props.context
        };
    },
    render: function () {
        console.log('Parent');
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'This is Parent Title'
            ),
            React.createElement(Child, { content: this.state.context })
        );
    }
});

var Child = React.createClass({
    displayName: 'Child',

    getInitialState: function () {
        return {
            content: this.props.content
        };
    },
    render: function () {
        console.log('Child');
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                'This is a Child Title'
            ),
            React.createElement(
                'p',
                null,
                this.state.content
            ),
            React.createElement(
                'button',
                { onClick: this.change },
                'Change'
            )
        );
    },
    change: function () {
        this.setState({
            content: 'OK'
        });
    }
});

//three
var NotesList = React.createClass({
    displayName: 'NotesList',

    render: function () {
        return React.createElement(
            'ol',
            null,
            React.Children.map(this.props.children, function (child, index) {
                console.log(child, index);
                return React.createElement(
                    'li',
                    null,
                    child
                );
            })
        );
    }
});

//four

var InputText = React.createClass({
    displayName: 'InputText',

    getInitialState: function () {
        return {
            value: 'aa'
        };
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'text', ref: 'myInput', onChange: this.change }),
            React.createElement(
                'button',
                { onClick: this.focus },
                'focus'
            ),
            React.createElement(
                'p',
                null,
                this.state.value
            )
        );
    },
    change: function (ev) {
        this.setState({
            value: this.refs.myInput.value
        });
        // or
        // this.setState({
        //     value : $(ev.target).val()
        // });
    },
    focus: function (ev) {
        console.log(ev.target);
        // 可以通过 event 对象 或 ref 来获取 DOM
        $(ev.target).prev().val('aa');
        $(this.refs.myInput).focus();
    }
});

ReactDOM.render(React.createElement(InputText, null), document.getElementById('test'));