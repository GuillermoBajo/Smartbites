'use client';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { invocateEncuesta } from '@/lib/actions';


export default function Encuesta({ userId }: { userId: string }) {
  const survey = new Model(surveyJson);
  survey.applyTheme({
    "cssVariables" :{},
    "themeName": 'borderless-default',
    "colorPalette" : "light",
    "isPanelless" : true
  });

  survey.onComplete.add((survey) => {
    const resultData: any = {};
    for (const key in survey.data) {
      const question = survey.getQuestionByName(key);
      if (!!question) {
        Object.assign(resultData, { [key]: question.value });
      }
    }
    invocateEncuesta(userId, resultData)
  });

  return (
    <Survey model={survey} />
  );
}


const surveyJson = {
  locale: 'es',
  completedHtml: "<h4>¡Gracias por completar la encuesta!</h4>",
  pageNextText: "Siguiente",
  pagePrevText: "Anterior",
  completeText: "Confirmar",
  pages: [
    {
      elements: [
        {
          name: 'sex',
          type: 'radiogroup',
          title: 'Marque el sexo al que pertenece',
          isRequired: true,
          choices: [
            {
              value: "h",
              text: "Hombre",
            },
            {
              value: "m",
              text: "Mujer",
            },],
        },
      ],
    },
    {
      elements: [
        {
          name: 'age',
          title: 'Escriba su edad:',
          type: 'text',
          isRequired: true,
          min: 18,
          max: 120,
          inputType: 'number',
          placerHolder: 'Escriba su estatura...',
        },
      ],
    },
    {
      elements: [
        {
          name: 'height',
          title: 'Escriba su estatura en cm:',
          type: 'text',
          isRequired: true,
          min: 100,
          max: 250,
          inputType: 'number',
          placerHolder: 'Escriba su estatura...',
        },
      ],
    },
    {
      elements: [
        {
          name: 'weight',
          title: 'Escriba su peso en kg:',
          type: 'text',
          isRequired: true,
          min: 30,
          max: 350,
          inputType: 'number',
        },
      ],
    },
    {
      elements: [
        {
          name: 'activity',
          title: '¿Cuál es su actividad física diaria?',
          type: 'rating',
          isRequired: true, // Hace que la pregunta sea obligatoria
          rateValues: [
            { value: 'LIGHT', text: 'Ligera (ejercicio ligero 1-3 dias a la semana)' },
            { value: 'MODERATE', text: 'Moderada (ejercicio moderado 3-5 dias a la semana)' },
            { value: 'HIGH', text: 'Alta (ejercicio intenso 6-7 dias a la semana)' },
            { value: 'EXTREME', text: 'Intensa (Ejercicio muy intenso y trabajo físico diario)' },
          ],
        },
      ],
    },
    {
      elements: [
        {
          name: 'exclude',
          title: '¿Tiene alguna intolerancia o preferencia?',
          type: 'text',
          // isRequired: true, // Hace que la pregunta sea obligatoria
        },
      ],
    },
  ],
};