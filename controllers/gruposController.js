const Categorias = require('../models/Categorias');


exports.formNovoGrupo = async (req, res) => {
    const categorias = await Categorias.findAll();

    res.render('novo-grupo',{
        nomePagina : 'Cria um novo grupo',
        categorias
    })
}