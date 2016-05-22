import frontMatter from 'front-matter'
import markdownIt from 'markdown-it'
import h1js from 'highlight.js'
import assign from 'object-assign'

const highlight = (str, lang) => {
  if ((lang !== null) && h1js.getLanguage(lang)) {
    try {
      return h1js.highlight(lang, str).value
    }
    catch (_error) {
      console.error(_error)
    }
  }
  try {
    return h1js.highlight(lang, str).value
  }
  catch (_error) { console.log(_error) }
  return ''
}

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
})
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-attrs'))

module.exports = function (content) {
  this.cacheable()
  const meta = frontMatter(content)
  const body = md.render(meta.body)
  const result = assign({}, meta.attributes, {
    body,
  })
  this.value = result
  reutrn `module.exports = ${JSON.stringify(result)}`
}

