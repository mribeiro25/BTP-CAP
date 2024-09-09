using AdminService as service from '../../srv/service';
annotate service.Estudantes with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Nome',
                Value : Nome,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DtAniversario',
                Value : DtAniversario,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Curso',
                Value : curso_ID,
            },
            {
                $Type : 'UI.DataField',
                Value : email,
                Label : 'E-mail',
            },
            {
                $Type : 'UI.DataField',
                Value : Telefone,
                Label : 'Telefone',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
                Criticality : critico,
            },
            {
                $Type : 'UI.DataField',
                Value : critico,
                Label : 'critico',
            },
            {
                $Type : 'UI.DataField',
                Value : observacao,
                Label : 'observacao',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Detalhes do Aluno',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Nome',
            Value : Nome,
        },
        {
            $Type : 'UI.DataField',
            Label : 'DtAniversario',
            Value : DtAniversario,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Curso',
            Value : curso_ID,            
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.notificaAluno',
            Label : 'Notificar Aluno',
            Criticality: #Positive
        },
    ],
    UI.TextArrangement : [
        {
            $value: #TextOnly,
            @DataField : 'curso_ID'
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Nome,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.inativaAluno',
            Label : 'Inativar',
            ![@UI.Hidden] : {$edmJson: {$If: [
                {$Eq: [
                    {$Path: 'IsActiveEntity'},
                    false
                ]},
                true,
                false
            ]}}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.notificaAluno',
            Label : 'Notificar',
        },
    ],
);

annotate service.Estudantes with {
    curso @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Cursos',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : curso_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Nome',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'MaxEstudantes',
                },
            ],
            Label : 'Cursos',
        },
        Common.Text : {
            $value : curso.Nome,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Estudantes with {
    Nome @Common.Text : createdBy
};

annotate service.Cursos with {
    ID @Common.Text : {
        $value : Nome,
        ![@UI.TextArrangement] : #TextOnly,
    }
};

annotate service.Estudantes with {
    observacao @Common.FieldControl : #ReadOnly
};

