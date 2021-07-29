const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');

exports.formNovoGrupo = async (req, res) => {
    const categorias = await Categorias.findAll();

    res.render('novo-grupo',{
        nomePagina : 'Cria um novo grupo',
        categorias
    })
}

//Salvar os grupos no db
exports.criarGrupo = async (req, res) => {
    const grupo = req.body;
    //Ver as informacoes dos grupos
    //console.log(grupo);

    try {
        //Salvar na db
        await Grupos.create(grupo);
        req.flash('exito', 'O grupo foi criado com sucesso');
        res.redirect('/administracao');
    } catch (error) {
        console.log(error);
        req.flash('error', error);
        res.redirect('/novo-grupo');
        
    }
}