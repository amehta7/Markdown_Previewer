// marked.setOptions({
//   breaks: true,
// })

// const renderer = new marked.Renderer()

const initialMd = `# Greetings Earthlings! 
## Welcome to my markdown previewer
[freeCodeCamp](https://www.freecodecamp.org/)
Front End Libraries Projects
- Random Quote Machine
- Markdown Previewer
- Drum Machine
- Javascript Calculator
- Pomodoro Clock
this is a **bold** text, an _emphasis_ , a _**combined emphasis**_ , and a ~~strikethrough~~
Head 1 | Head 2 | Head 3
------ |--------| ------
item1 | item2 | item3
item4 | item5 | item6
item7 | item8 | item9
> example of blockquote
Inline \`code\`
\`\`\`
// code block
function sum (x, y) {
  return x + y;
}
\`\`\`
![Random Animals](https://loremflickr.com/320/240)
`

class App extends React.Component {
  state = {
    markdownValue: initialMd,
  }

  handleChange = (e) => {
    this.setState({
      markdownValue: e.target.value,
    })
  }

  render() {
    const { markdownValue } = this.state

    return (
      <div className='App'>
        <h1 className='App-title'> Markdown Previewer</h1>
        <main className='App-content'>
          <Card title='Editor'>
            <Editor
              onChange={this.handleChange}
              markdownValue={markdownValue}
            />
          </Card>
          <Card title='Preview'>
            <Preview markdownValue={markdownValue} />
          </Card>
        </main>
      </div>
    )
  }
}

const Preview = ({ markdownValue }) => {
  const renderer = new marked.Renderer()
  renderer.link = function (href, title, text) {
    return `<a target="_blank" href=${href}>${text}</a>`
  }

  marked.setOptions({
    breaks: true,
  })

  return (
    <div
      id='preview'
      dangerouslySetInnerHTML={{ __html: marked(markdownValue, { renderer }) }}
    />
  )
}

const Editor = ({ onChange, markdownValue }) => (
  <textarea id='editor' value={markdownValue} onChange={onChange} />
)

const Card = ({ children, title }) => (
  <div className='Card'>
    <div className='Card-header'>
      <span className='Card-header-title'>{title}</span>
      <div className='Card-header-circles'>
        <span className='circle-1' />
        <span className='circle-2' />
        <span className='circle-3' />
      </div>
    </div>
    <div className='Card-content'>{children}</div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

// const container = document.getElementById('root')
// const root = React.createRoot(container)
// root.render(<App />)
