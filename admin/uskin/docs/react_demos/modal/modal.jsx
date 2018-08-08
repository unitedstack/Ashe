const {Button, Modal} = uskin;

function listener2(v) {
  let props = {
    title: v.toUpperCase(),
    content: 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language. Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.',
    okText: 'OK'
  };

  Modal[v](props);
}

ReactDOM.render(
  <div>
    <Button value="Info Caller" btnKey="info" onClick={listener2.bind(this, 'info')} />
    <Button value="Success Caller" type="create" btnKey="success" onClick={listener2.bind(this, 'success')} />
    <Button value="Warning Caller" type="warning" btnKey="warning" onClick={listener2.bind(this, 'warning')} />
    <Button value="Danger Caller" type="delete" btnKey="danger" onClick={listener2.bind(this, 'danger')} />
  </div>,
  document.getElementById('example')
);
