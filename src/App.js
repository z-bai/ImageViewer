import './App.css';
import React from 'react';
import ContentEditable from 'react-contenteditable';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            html: ``
        };
    }

    withTagsStriped = (str) => str.replace(/(<([^>]+)>)/gi, "");
    wrapWithTags = (str) => str.replace(/(\$.+?\$)/g, '<span class="highlighted">$1</span>');

    handleChange = (evt) => {
        const value = evt.target.value;
        const pureText = this.withTagsStriped(value);
        console.log('pureText', pureText);
        this.setState({
            html: this.wrapWithTags(pureText)
        });
    };

    componentDidMount() {
        document.onselectionchange = function() {
            console.log('selection change');
        }
    }

    render = () => {
        return (
            <div className="App">
                <ContentEditable
                    html={this.state.html}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default App;
