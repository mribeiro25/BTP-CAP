sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'treinamento/btpcaptreinamento/test/integration/FirstJourney',
		'treinamento/btpcaptreinamento/test/integration/pages/EstudantesList',
		'treinamento/btpcaptreinamento/test/integration/pages/EstudantesObjectPage'
    ],
    function(JourneyRunner, opaJourney, EstudantesList, EstudantesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('treinamento/btpcaptreinamento') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEstudantesList: EstudantesList,
					onTheEstudantesObjectPage: EstudantesObjectPage
                }
            },
            opaJourney.run
        );
    }
);