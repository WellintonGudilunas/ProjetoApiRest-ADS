const produtoModel = require('../models/produtoModel');


class produtoController {

    async getAll(req, res) {
        try { 
            const produto = await produtoModel.find({});

            if (!produto || produto.length === 0) {
                res.status(200).json({ msg: "Não há nenhum produto cadastrado!." });
                return;
            }

            res.json(produto);

        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async get(req, res) {
        try {
            const id = req.params.id;
            const produto = await produtoModel.findById(id);

            if (!produto || produto.length === 0) {
                res.status(400).json({ msg: `Produto com o id ${id} não encontrado.` });
                return;
            }

            produto.img = undefined;
            res.json(produto);
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async create(req, res) {
        try {
            const produto = req.body;
            /*if (req.file === undefined) {
                console.log(req);
                res.status(400).send({ msg: "Erro no upload do arquivo" });
                return;
            }

            produto.img = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };*/

            const resultado = await produtoModel.create(produto);
            res.json(resultado);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const produto = req.body;

            if (!(req.file === undefined)) {
                produto.img = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
            }

            await produtoModel.findByIdAndUpdate(id, produto);
            res.send("Conteúdo atualizado!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const retorno = await produtoModel.findByIdAndDelete(id);

            if (retorno == null) {
                res.status(400).json({ msg: `Produto com id ${id} não encontrado.` });
                return;
            }

            res.send("Conteúdo excluído!");
        } catch (err) {
            res.status(500).json({ msg: "Erro interno" });
        }
    }
}

module.exports = new produtoController();