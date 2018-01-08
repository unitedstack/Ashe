/**
 * Simditor
 * Default editor config
 */

module.exports = {
  placeholder: '请输入编辑内容...',
  imageButton: ['upload', 'external'],
  upload: {
    url: '/admin/api/media?editor=true',
    params: null,
    fileKey: 'media',
    connectionCount: 3,
    leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
  },
  // 允许复制粘贴图片并且上传
  pasteImage: true,
  // 在复制粘贴图片的时候清空所有样式
  cleanPaste: true,
  toolbar: [
    'title',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'fontScale',
    'color',
    'ol',
    'ul',
    'blockquote',
    'code',
    'table',
    'link',
    'image',
    'hr',
    'indent',
    'outdent',
    'alignment'
  ],
  codeLanguages: [
    { name: 'Bash', value: 'bash' },
    { name: 'C++', value: 'c++' },
    { name: 'C#', value: 'cs' },
    { name: 'CSS', value: 'css' },
    { name: 'Erlang', value: 'erlang' },
    { name: 'Less', value: 'less' },
    { name: 'Sass', value: 'sass' },
    { name: 'Diff', value: 'diff' },
    { name: 'CoffeeScript', value: 'coffeescript' },
    { name: 'HTML,XML', value: 'html' },
    { name: 'JSON', value: 'json' },
    { name: 'Java', value: 'java' },
    { name: 'JavaScript', value: 'js' },
    { name: 'Markdown', value: 'markdown' },
    { name: 'Objective C', value: 'oc' },
    { name: 'PHP', value: 'php' },
    { name: 'Perl', value: 'parl' },
    { name: 'Python', value: 'python' },
    { name: 'Ruby', value: 'ruby' },
    { name: 'SQL', value: 'sql'}
  ]
};
