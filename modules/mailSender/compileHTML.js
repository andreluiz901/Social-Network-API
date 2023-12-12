const fs = require('fs/promises')
const handlebars = require('handlebars')

const compilerHtml = async (arquivo, contexto) => {
    const html = await fs.readFile(arquivo)
    const compiler = handlebars.compile(html.toString())
    const htmlString = compiler(contexto)
    return htmlString
}

module.exports = compilerHtml