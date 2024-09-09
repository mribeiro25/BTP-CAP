const { entity } = require('@sap/cds');
const cds = require('@sap/cds');
const { data } = require('@sap/cds/lib/dbs/cds-deploy');



//Service impementation

module.exports = cds.service.impl(function() {
        this.before(['CREATE','UPDATE'], 'Estudantes', function(req) {
                console.log("Estudantes called");

                if(req.data && !req.data.Nome){
                    //req.info(200, 'Info - Nome precisa ser preenchido'); //-- Processamento continua
                    req.error(400, 'Erro - Nome precisa ser preenchido'); // Processamento para
                    //req.warn(412, 'Warning - Nome precisa ser preenchido');  //-- Processamento continua
                    //req.notify(412, 'Obejto Criado');  //-- Processamento continua
                }
        })
        this.before(['CREATE','UPDATE'], 'Cursos', function(req) {
                console.log("Estudantes called");

                if(req.data && !req.data.Nome){
                    //req.info(200, 'Info - Nome precisa ser preenchido'); //-- Processamento continua
                    req.error(400, 'Erro - Nome precisa ser preenchido'); // Processamento para
                    //req.warn(412, 'Warning - Nome precisa ser preenchido');  //-- Processamento continua
                    //req.notify(412, 'Obejto Criado');  //-- Processamento continua
                }

                if(req.data && req.data.MaxEstudantes > 30){
                        //req.info(200, 'Info - Nome precisa ser preenchido'); //-- Processamento continua
                        req.error(400, 'Erro - Numero máximo de estudantes (30) foi excedido'); // Processamento para
                        //req.warn(412, 'Warning - Nome precisa ser preenchido');  //-- Processamento continua
                        //req.notify(412, 'Obejto Criado');  //-- Processamento continua
                    }
        })
        this.on('inativaAluno', async function(req){

                console.log("Inativa aluno");

                const { Estudantes } = this.entities;

                const params = req.params;
                if (params != null){

                        for(let i = 0; i < params.length;i++) {
                                if (params[i].ID != null){

                                        await UPDATE.entity(Estudantes, params[i].ID)
                                                    .set({status:'I', observação: req.data.text});

                                        console.log('ID: ' + params[i].ID + '- Status' + params[i].status);

                                        req.info(400, 'Aluno: ' + params[i].ID + ' ' + req.data.text + 'status atualziado.');
                                }
                        }
                }

                req.reply();
        })

        this.on('notificaAluno', async function(req) {
                console.log("Notifica Aluno");
                let id;
                let alunos;
                let query;
                let Nome;
                let curso_ID;
                let cursos;
                let curso_nome;


                //Recupera o ID do aluno pelos parametros
                const params = req.params;
                if(params != null){
                 
                 let adms = await cds.connect.to('AdminService');

                 for (let i = 0; i < params.length; i++){
                    if(params[i].ID != null){


                        id = params[i].ID;
                        console.log(`ID: ` + id);

                        query = SELECT `ID,Nome,DtAniversario,curso,status` .from `Estudantes` .where `ID = ${id}`;
                        alunos = await adms.run (query);
                        if (alunos){
                           Nome = alunos[0].Nome;
                           curso_ID = alunos[0].curso_ID;
                           status = alunos[0].status;
                        }


                        console.log(`Nome: ` + Nome + ` - ID Curso: ` + curso_ID );

                        query = SELECT `ID,Nome` .from `Cursos` .where `ID = ${curso_ID}`;
                        cursos = await adms.run (query);
                        if (cursos){
                           curso_nome = cursos[0].Nome;
                        }
                    }
                 }
                }
                console.log(`Nome Curso ` + curso_nome);

                req.info(200, 'Aluno: ' + id + ' ' + Nome + ' cursando: ' + curso_nome + ' notificado com sucesso!');
        })
        this.after('READ', 'Estudantes', function(data) {

                const alunos = Array.isArray(data) ? data : [data];

                alunos.forEach((aluno) => {

                        switch (aluno.status) {
                                case 'A':
                                        aluno.critico = 1;
                                case 'I':
                                        aluno.critico = 2;
                                case 'P':
                                        aluno.critico = 3;
                                default:
                                        break;
                        }                        
                })
        })
})
