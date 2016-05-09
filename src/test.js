// 运行命令  babel -w --presets react src --out-dir dist
var LikeButton = React.createClass({
    getInitialState : function(){
        return {
            like : false
        }
    },
    handleClick : function(){
        this.setState({
            like : !this.state.like
        });
    },
    render : function(){
        var text = this.state.like ? 'Like' : "don't like";
        return (
            <p onClick={this.handleClick}>{this.props.name} hello welcome,You {text} this. Click toggle.</p>
        );
    }
});

ReactDOM.render(
    <LikeButton name="blue"/>,
    document.getElementById('example')
)
