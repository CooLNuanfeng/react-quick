// 运行命令  babel -w --presets react src --out-dir dist
var LikeButton = React.createClass({
    displayName: "LikeButton",

    getInitialState: function () {
        return {
            like: false
        };
    },
    handleClick: function () {
        this.setState({
            like: !this.state.like
        });
    },
    render: function () {
        var text = this.state.like ? 'Like' : "don't like";
        return React.createElement(
            "p",
            { onClick: this.handleClick },
            this.props.name,
            " hello welcome,You ",
            text,
            " this. Click toggle."
        );
    }
});

ReactDOM.render(React.createElement(LikeButton, { name: "blue" }), document.getElementById('example'));