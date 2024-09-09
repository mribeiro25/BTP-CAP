sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'cursos/btpcursos/test/integration/FirstJourney',
		'cursos/btpcursos/test/integration/pages/CursosList',
		'cursos/btpcursos/test/integration/pages/CursosObjectPage',
		'cursos/btpcursos/test/integration/pages/EstudantesObjectPage'
    ],
    function(JourneyRunner, opaJourney, CursosList, CursosObjectPage, EstudantesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('cursos/btpcursos') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCursosList: CursosList,
					onTheCursosObjectPage: CursosObjectPage,
					onTheEstudantesObjectPage: EstudantesObjectPage
                }
            },
            opaJourney.run
        );
    }
);