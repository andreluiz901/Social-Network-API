const agendaRepository = require('./repository.agenda')


function createNewAgendaPost({messagePost, dataAtual}){
    console.log('services', messagePost, dataAtual)
    return agendaRepository.createNewPost({messagePost, dataAtual})
}

module.exports = createNewAgendaPost