sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        's/estudantesbycurso/test/integration/FirstJourney',
		's/estudantesbycurso/test/integration/pages/EstudantesByCursosList',
		's/estudantesbycurso/test/integration/pages/EstudantesByCursosObjectPage'
    ],
    function(JourneyRunner, opaJourney, EstudantesByCursosList, EstudantesByCursosObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('s/estudantesbycurso') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEstudantesByCursosList: EstudantesByCursosList,
					onTheEstudantesByCursosObjectPage: EstudantesByCursosObjectPage
                }
            },
            opaJourney.run
        );
    }
);