// 运行命令  babel -w --presets react src --out-dir dist

// one
var HelloMessage = React.createClass({
    render : function(){
        return (
            <h1>Hello world, hello React!</h1>
        )
    }
});


//two
var Parent = React.createClass({
    getDefaultProps : function(){ //设置 props 默认值
        return {
            context : 'default'
        }
    },
    propTypes : {  //设置 props 的 类型和是否必须
        context : React.PropTypes.string.isRequired
    },
    getInitialState : function(){
        return {
            context : this.props.context
        }
    },
    render : function(){
        console.log('Parent');
        return (
            <div>
                <h1>This is Parent Title</h1>
                <Child  content={this.state.context} />
            </div>
        )
    }
});

var Child = React.createClass({
    getInitialState : function(){
        return {
            content : this.props.content
        }
    },
    render : function(){
        console.log('Child');
        return (
            <div>
                <h2>This is a Child Title</h2>
                <p>{this.state.content}</p>
                <button onClick={this.change}>Change</button>
            </div>
        )
    },
    change : function(){
        this.setState({
            content : 'OK'
        })
    }
});


//three
var NotesList = React.createClass({
    render : function(){
        return (
            <ol>
                {
                    React.Children.map(this.props.children,function(child,index){
                        console.log(child,index);
                        return <li>{child}</li>
                    })
                }
            </ol>
        )
    }
});

//four

var InputText = React.createClass({
    getInitialState : function(){
        return {
            value : 'aa'
        }
    },
    render : function(){
        return (
            <div>
                <input type="text" ref='myInput' onChange={this.change}/>
                <button onClick={this.focus} >focus</button>
                <p>{this.state.value}</p>
            </div>
        )
    },
    change : function(ev){
        this.setState({
            value : this.refs.myInput.value
        });
        // or
        // this.setState({
        //     value : $(ev.target).val()
        // });
    },
    focus : function(ev){
        console.log(ev.target);
        // 可以通过 event 对象 或 ref 来获取 DOM
        $(ev.target).prev().val('aa')
        $(this.refs.myInput).focus();
    }
})


ReactDOM.render(
    <InputText />
,document.getElementById('test'));
